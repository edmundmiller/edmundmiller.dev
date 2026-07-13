---
title: Rust Nextflow
description: What Is This, a Crossover Episode?
draft: true
publishDate: 'Nov 6 2023'
---

At the 2023 Nextflow Summit, a conversation about my RustConf shirt led to an experiment. Could a Nextflow process run a Rust source file directly?

I had already used Rust in Nextflow by placing a compiled binary in the pipeline's `bin/` directory. This experiment tested a different path. [`rust-script`](https://rust-script.org/) can compile and run one Rust file with an embedded Cargo manifest.

The full experiment remains in my [`rust-nf` repository](https://github.com/Emiller88/rust-nf).

## 1. Declare the script environment

I adapted a Rust script from Snakemake's tests. Its crate-level documentation contained this Cargo manifest:

````rust
//! ```cargo
//! [dependencies]
//! csv = "1.1"
//! serde = { version = "1.0", features = ["derive"] }
//! ```
````

The process environment installed `rust-script` and its build tools:

```yaml
channels:
  - conda-forge
  - bioconda
dependencies:
  - rust-script>=0.15.0
  - openssl
  - c-compiler
  - pkg-config
```

I then reduced the Nextflow process to one command. The script wrote `test.bed` directly instead of relying on Snakemake's injected objects.

```nextflow
process MANIFEST_RS {
    conda "./env.yaml"

    output:
    path "test.bed"

    script:
    """
    test-manifest.rs
    """
}
```

## 2. Run it and read the first failure

I ran the workflow with the command recorded in Nextflow's history:

```console
nextflow run main.nf
```

The first script had no shebang. The task shell tried to read Rust as shell code, so the crate documentation became a command:

```console
/home/emiller/src/personal/rust-nf/bin/test-manifest.rs: line 1: //!: No such file or directory
/home/emiller/src/personal/rust-nf/bin/test-manifest.rs: line 3: cargo: command not found
```

## 3. Add the interpreter

The important fix was the first line of the Rust file:

```rust
#!/usr/bin/env rust-script
```

This told the operating system to pass the file to `rust-script`. A later run exposed the other half of that contract:

```console
/usr/bin/env: ‘rust-script’: No such file or directory
```

A correct shebang is not enough. The task environment must also provide the named interpreter.

## 4. Separate the native and Wave results

With `rust-script` available on the host, the process completed and wrote `test.bed`. The saved task output was:

```console
Loaded
Reading BED file...
Output written to test.bed
```

I also enabled Wave with the Conda environment. The task logs show Wave creating and pulling an image named from `rust-script` and the build dependencies. However, the preserved Wave attempts ended with exit code 130. They do not prove that the container run completed.

The container lesson still holds: Wave can turn the declared package environment into the task image, but the image must contain the shebang interpreter. The verified success here was the native run, not the Wave run.

## Takeaway

Nextflow can launch a Rust source file from `bin/` like any other executable. The file needs execute permission, a `rust-script` shebang, and a task environment that contains `rust-script` plus its build tools.

For a stable pipeline tool, I would still favor a compiled binary. For a small experiment, `rust-script` makes the source file itself executable and keeps its Rust dependencies beside the code. The next step is to repeat the successful task inside a pinned Wave image before treating this as a portable pattern.

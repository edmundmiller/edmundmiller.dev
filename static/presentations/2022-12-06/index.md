---
title: nf-core/bytesize nf-test
tags: bytesize, nf-core, open-source, talk
type: slide
slideOptions:
  transition: 'fade'
---

<!-- .slide: data-background="https://raw.githubusercontent.com/maxulysse/maxulysse.github.io/main/assets/img/svg/green_white_bg.svg" -->

<a href="https://www.nf-co.re"><img src="https://raw.githubusercontent.com/nf-core/logos/master/byte-size-logos/bytesize-darkbg.svg" width="65%"><img></a>

# nf-test

Edmund Miller / <img src="https://openmoji.org/data/color/svg/E045.svg" width=50> @emiller88 / <a href="https://mstdn.science/@nf_core"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Mastodon_Logotype_%28Simple%29.svg/216px-Mastodon_Logotype_%28Simple%29.svg.png" width=40></a> @emiller@genomic.social

<a href="https://utdallas.edu"><img src="https://gist.githubusercontent.com/Emiller88/b2247c2883c3209950bebb89d5cb9a5f/raw/5455a28a6b27ffe90f32a947986eb80ebe63c6fa/utdmonogram.svg" width="80%"><img></a>

---

# What's nf-test?

- "Ability to write unit tests for Nextflow workflows"[^1]

- pytest but for Nextflow

[^1]: The second most requested feature in this years nextflow and nf-core community survey

----

# Hello nf-test

```nextflow
#!/usr/bin/env nextflow
nextflow.enable.dsl=2

process sayHello {
  input:
    val x
  output:
    stdout
  script:
    """
    echo '$x world!'
    """
}

workflow {
  Channel.of('Bonjour', 'Ciao', 'Hello', 'Hola') | sayHello | view
}
```

----

# Hello nf-test

```nextflow
nextflow_pipeline {

  name "Test Hello World"
  script "nextflow-io/hello"

  test("hello world example should start 4 processes") {

    expect {
      with(workflow){
        assert success
        //analyze Nextflow trace file
        assert trace.tasks().size() == 4
        //Verify if strings have been written to stdout object
        assert "Ciao world!" in stdout
        assert "Bonjour world!" in stdout
        assert "Hello world!" in stdout
        assert "Hola world!" in stdout
      }
    }
  }
}
```

---

# Background

----

## Testing practices until now

- Pipelines - GitHub Actions
- Modules - pytest-workflow

----

## Pipelines - GitHub Actions

> CI is meant to run your test framework, not be your test framework

- Only checks that the workflow ran without failing

----

## Pipelines - GitHub Actions

- As the number of tests gets higher, it becomes more difficult to maintain

- Running tests locally required translating
  - Heavy reliance on CI runners

Note:
    Sarek for example was motivated to adopt pytest-workflow / CI Runners should settle runs on my computer arguments and provide a double-check

----

## Modules - Pytest-workflow

- Running your tests should be as easy as running your pipeline...
  - pytest-workflow was **not**
- Enter `nf-core modules test`

----

## Modules - Pytest-workflow

- No native support for Nextflow profiles
  - (docker, singularity, conda)
- Pipeline output was tough to find locally

----

### So why were we putting off pytest-workflow for pipelines?

- **A lot of manual work** to get all md5sums of files(See Sarek)
  - Didn't work with `bin/`

Note:
    Started a PR in December 2020, Got around to getting it to work for rnaseq at the Hackathon in October 2022, We started playing around with nf-test at the Hackathon

---

# Intro to nf-test

----

## Intro to nf-test

```shell [1|2|3-6|8]
curl -fsSL https://code.askimed.com/install/nf-test | bash
nf-test init
nf-test generate pipeline main.nf
nf-test generate workflow subworkflows/local/*.nf
nf-test generate process modules/local/*.nf
nf-test generate function lib/*
# After writing them
nf-test test
```

----

# Intro to nf-test

[Quick code walkthrough](https://github.com/nf-core/demultiplex/blob/dev/tests/pipeline/default/bases2fastq.nf.test)

---

# Good Testing Practices

- Test-Driven Development (**TDD**) <!-- .element: class="fragment" data-fragment-index="1" -->
- Behavioral-Driven Development (**BDD**) <!-- .element: class="fragment" data-fragment-index="2" -->
- CI/CD <!-- .element: class="fragment" data-fragment-index="3" -->
- Pair programming <!-- .element: class="fragment" data-fragment-index="4" -->
- Just Kidding (**JK**) <!-- .element: class="fragment" data-fragment-index="5" -->

----

# <del>Good</del> Realistic Testing <del>Practices</del> Priorities

1.  Convert CI tests to "pipeline" tests
2.  Add more pipeline tests for params/pathways you want to make sure don't break
3.  Add tests when fixing bugs
4.  Test your local modules

**TL;DR** Avoid Regressions

---

# [Roll out plan](https://hackmd.io/@nf-core/B15sVq5So?type=view)

- Pipelines as a proving ground (It's already in methylseq & demultiplex!)
- Update template
- Module infrastructure prep
- Update modules as they get changes
- Final push to convert all the modules at a hackathon

---

## Need help?

<!-- .slide: data-background="https://raw.githubusercontent.com/maxulysse/maxulysse.github.io/main/assets/img/svg/green_white_bg.svg" -->

Repository: [`askimed/nf-test`](https://github.com/askimed/nf-test)
Tutorial: [`nf-test Getting Started`](https://code.askimed.com/nf-test/getting-started/)
Chat: [`https://nf-co.re/join`](https://nf-co.re/join) <img src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-6gwiyo/Slack_Mark.svg" width=7.5%></img>`#nf-test`

<div style="margin-top:0.1em">&nbsp;</div>

<p align="center">
Follow nf-core on
<a href="https://www.twitter.com/nf_core"><img src="https://openmoji.org/data/color/svg/E040.svg" width=6%></a>
<a href="https://mstdn.science/@nf_core"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Mastodon_Logotype_%28Simple%29.svg/216px-Mastodon_Logotype_%28Simple%29.svg.png" width=5%></a>
<a href="https://github.com/nf-core"><img src="https://openmoji.org/data/color/svg/E045.svg"  width=6%></a>
<a href="https://www.youtube.com/c/nf-core"><img src="https://openmoji.org/data/color/svg/E044.svg" width=6%></a>
</a>
</p>

<a href="https://nf-co.re/" style="color: #000000; font-family:Monaco, monospace; font-weight:bold;">https://nf-co.re/</a>

<div style="display: flex; justify-content: space-evenly; align-items:center;">
<img src="https://chanzuckerberg.com/wp-content/themes/czi/img/logo.svg" width=15%>
<div style="font-style:italic; font-size: 0.5em; color: #666;">Icons:<br><a href="https://openmoji.org">openmoji.org</a></div></div>

<style>
.reveal section img { background:none; border:none; box-shadow:none; }

body {
    background-image: url(https://raw.githubusercontent.com/nf-core/logos/master/nf-core-logos/nf-core-logo-square.svg);
    background-size: 7.5%;
    background-repeat: no-repeat;
    background-position: 3% 96%;
    background-color: #181a1b;
}

.reveal body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal p {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal h1 {
    font-family: 'Roboto', sans-serif;
    font-style: bold;
    font-weight: 400;
    color: white;
    font-size: 62px;
}

.reveal h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal h3 {
    font-family: 'Roboto', sans-serif;
    font-style: italic;
    font-weight: 300;
    color: white;
}

.reveal p {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;

}

.reveal li {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;

}

.reveal pre {
    background-color: #272822 !important;
    display: inline-block;
    border-radius: 7px;
    color: #aaaba9;
}

.reveal pre code {
    color: #eeeeee;
    background-color: #272822;
    font-size: 100%;
}

.reveal code {
    background-color: #272822;
    font-size: 75%;
}

.reveal .progress {
    color: #24B064;

}

.reveal .controls button {
    color: #24B064;
}

.reveal blockquote {
    display: block;
    position: relative;
    width: 90%;
    margin: 20px auto;
    padding: 5px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 0px 2px rgb(0 0 0 / 20%);
}

</style>
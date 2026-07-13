---
publishDate: '2022-06-16T22:47Z'
title: Basic Testing Workflow in Julia
description: How Julia's standard testing tools turn interactive scientific work into repeatable checks.
tags: ['Julia', 'bioinformatics']
draft: true
---

Scientific code often implements complex algorithms without tests that show expected behavior. That gap makes later changes hard to trust, especially when the original author has moved on.

My work in [nf-core](https://nf-co.re/) showed me a better standard. Its modules pair scientific software with automated tests. I discussed that workflow in [a talk about testing nf-core modules](https://www.youtube.com/watch?v=pjhscKyWH74&t=1s).

I wanted to know whether Julia made the same discipline easy for a small package.

## Start with the standard library

Julia includes the [Test standard library](https://docs.julialang.org/en/v1/stdlib/Test/). Its main pieces cover the basic workflow:

- `@test` checks a value or relationship;
- `@test_throws` checks an expected failure;
- `@testset` groups related checks and reports a summary.

A small test file can stay close to the behavior it describes:

```julia
using Test

square(x) = x * x

@testset "square" begin
    @test square(3) == 9
    @test square(-2) == 4
    @test_throws MethodError square("three")
end
```

Julia runs every check in the test set before reporting its failures. Nested test sets can separate parsing, calculations, and output behavior.

## Test a package reproducibly

Julia packages conventionally place their entry point in `test/runtests.jl`. The package manager creates a test environment and runs that file:

```julia
pkg> test MyPackage
```

The package's `Project.toml` can declare dependencies needed only by tests. This keeps the test environment reproducible without adding those packages to normal runtime dependencies.

That command gives me the equivalent of the Rust workflow I value. Rust uses `cargo test`; Julia uses `Pkg.test` through package mode. Both give the repository one standard command for the complete suite.

## Move discoveries from the REPL into tests

Erik Engheim's essays on [organizing Julia tests](https://medium.com/codex/julia-v1-5-testing-how-to-organize-tests-5f7a76e29038) and [REPL-driven development](https://medium.com/codex/test-driven-vs-repl-driven-development-809d3c7a681) describe a useful rhythm. Explore the code and its inputs interactively, then preserve the important examples as tests.

That is not an argument against writing a test first. A regression with known behavior should begin with a failing check. Exploratory scientific work may begin with an uncertain question instead.

The durable step is the same in either case: once an expected result is known, record it. A successful REPL session helps once; a test protects every later change.

## Takeaway

Julia's basic testing workflow is small and built in. `Test` expresses behavior, `test/runtests.jl` gives a package a standard entry point, and `Pkg.test` recreates the test environment.

The framework cannot decide which scientific results are correct. Authors still need representative fixtures, numerical tolerances, and domain review. It does make those decisions executable, reviewable, and repeatable.

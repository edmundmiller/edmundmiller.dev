---
publishDate: "2022-06-16T22:47Z"
title: Basic Testing Workflow in Julia
description: A quick tour of Julia's testing framework and comparing it to Rust's ecosystem
tags: ["Julia","bioinformatics"]
draft: true
---
In a past life I wrote a good bit of Javascript and Solidity smart
contracts. Let me tell you, the Js community **loves** their testing.
Maybe it\'s because they over-engineer everything, or maybe they\'ve
just created a culture that appreciates good software practices. Anyways
cutting my teeth in that community, I developed a love for automated
testing, because I\'m a lazy programmer, and testing smart contracts by
hand is a huge pain.

So coming to scientific computing it\'s understandable that I was taken
aback by the lack of testing. Complex packages, with novel
ground-breaking algorithms, and `grep test **` returns nothing. How do I
know this works as intended, let alone the author?

Since my initial shock, I\'ve found a happy home in
[nf-core](https://nf-co.re/), where scientific code lives in green
pastures with plenty of test coverage. If you\'re interested I gave [a
talk on how we test our
modules](https://www.youtube.com/watch?v=pjhscKyWH74&t=1s).

When I initially found Julia, I was impressed by all of the 21st century
nicities, a package manager built-in, documentation generators, and
packages that have plans if they were to become orphaned. However, what
I haven\'t really dug into yet, is what the testing workflow looks like
in Julia. I\'ve noticed plenty of tests in repos and read through them,
but what interests me more, is \"what the developer experience is
like?\". Does writing and running tests bring joy and save time? Can I
run one test at time? Can I fire off all the tests easily(and
reproducibly) before I push a commit? [Testing in
Rust](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) is
currently what I judge other language frameworks by(I\'m open to
suggestions if anyone has a better recommendation to check out to form
my opinions!). `cargo test` and `cargo test one_hundred` are examples of
what I was talking about earlier.

# After some research...

In the process of starting to answer some of those questions I had, I
found a [wonderful article by Erik Engheim, \"Julia v1.5 Testing: Best
Practices\"](https://erik-engheim.medium.com/julia-v1-5-testing-best-practices-3ca8780e6336).
I highly recommend you give that a read, I\'m going do my best to avoid
duplicating his efforts.

# Takeaways from Erik Engheim\'s other article

<https://medium.com/codex/julia-v1-5-testing-how-to-organize-tests-5f7a76e29038>
<https://medium.com/codex/test-driven-vs-repl-driven-development-809d3c7a681>

This is a great article. As someone who\'s played around with a lot of
lisp, the REPL is a great feature(and the Julia REPL is a lot less
clunky than python\'s in Emacs), as he makes the point the REPL allows
for \"Rapid Iteration in Context\". I was really excited to see we
shared similar views of iterate interactively, then solidify **by
writing the tests down**

> Unlike TDD, you don't write the tests ahead of time. Instead as you
> develop the code in the REPL interactively you are both exploring how
> to create the code as well as how to test it. This new insight may
> help you define sensible tests to avoid future regressions in the code
> you have written.

> It is also worth keeping in mind that nothing prevents you from using
> a mixed approach.

Writing tests first might be a good exercise to get an outline of what
you\'re trying to accomplish, and then going back and filling those
tests in as you write the code.

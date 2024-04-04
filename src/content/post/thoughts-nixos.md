---
author: Edmund Miller
publishDate: "2020-03-15T09:53Z"
title: Thoughts on NixOS
tags: ["nixos","linux" ]
description: Highlighting its customization, stability, and how it simplifies development environments.
---

NixOS is a dream. It allows you to program your os by declaring what you
want in it. And then you can declare how you want your packages built.
Most of the time you just want the default, but for example

``` nix
(polybar.override {
  mpdSupport = true;
  pulseSupport = true;
  nlSupport = true;
})
```

It gives you the power to customize things when you want. And then
contributing packages is more developer focused, it\'s just a PR away.
It makes it really simple to mix bleeding edge, with stable.

The rollbacks are another big initial selling point that you kind of
forget about because things end up being so stable but they\'re the
best. Basically in your grub you can select any generation you\'d like,
so in case you wanted to try out a new kernel and that break you just
rollback to the previous generation.

The drawbacks are you need to understand a bit of functional
programming, and then on top of that you have to learn nix which is a
dsl. There\'s nothing wrong with the language, just that it\'s another
thing you have to learn.

It may also kill your hobby of ricing. It makes it so quick to reproduce
a setup, that you can spend time actually thinking about the artistic
portion and not symlinking config files, and getting the right package
version on ubuntu. I follow a guy\'s dotfiles and he created a modular
system, so your theme separate from the logic that sets up your WM, so
you can carry your rice across WM easily and themeses across a wm.

[Link to my Dotfiles](https://github.com/Emiller88/dotfiles)

Guix, cuts out the dsl issue with nix as the language. I love a good
lisp personally, and it\'s definately easier to pick up than nix. Nix/OS
is also a pretty old project, so it\'s grown over time, so the tooling
was build up over time so there\'s a bunch of different tools like
nix-shell ,nixos-install, nixos-rebuild, nix-env that are all at the
first level where as guix has all of those things under guix so it\'s
better for new people to discover commands from. Again the main issue is
they\'re going to die on the FOSS hill, but I think that\'ll get fixed
with private package repos.

Now that\'s just all for the OS. They can both be used for dev-tools
which is where they really shine imo. You can use nix/guix on MacOS and
any distro of your choosing. You can create your builds and dev
environment for any language in them. So for example, you\'re just
trying out python for the first time. You\'re overwhelmed with the 20
different ways to set up a developement environment. With nix it\'s just

``` nix
let pkgs = import <nixpkgs> {};
    nanomsg-py = .... build expression for this python library;
in pkgs.stdenv.mkShell {
buildInputs = [
    pkgs.pythonPackages.pip
    nanomsg-py
];
shellHook = ''
            alias pip="PIP_PREFIX='$(pwd)/_build/pip_packages' \pip"
            export PYTHONPATH="$(pwd)/_build/pip_packages/lib/python2.7/site-packages:$PYTHONPATH"
            unset SOURCE_DATE_EPOCH
'';
}
```

Another example that I had recently, was I needed an older version of
node, but I didn\'t want to clutter up my path with multiple node
packages I just wanted to build a project really quick with
`node_10`{.verbatim}. All it was is `nix-shell -p
node_10` and boom I had a shell with `node_10`{.verbatim} installed. So
then you can combo the power of nix-shell with direnv, to automagically
switch environments based on what project your in, and it\'s easy for
your team to replicate also, and let\'s you be more language-agnostic
because while tooling is awesome when it\'s good(rust for example, or
node possibly) when it\'s scary or the community get\'s
fragmented(python) it\'s a problem.

If anyone made it this far and you want more come hang out [in the Doom
Emacs Discord](https://doomemacs.org/discord), you don\'t have to be an
Emacs user even, but you might end up one.

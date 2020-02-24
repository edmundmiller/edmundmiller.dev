---
{
  "type": "blog",
  "author": "Edmund Miller",
  "title": "Learn Just Enough React to Move Out of your Parent's House: A Millennial's Guide to the 2019 Job Market",
  "description": "Getting started in React",
  "image": "/images/article-covers/hello.jpg",
  "published": "2019-05-26",
}
---

# Introduction

I recently was helping a friend start building a website, and in hopes of
boosting his resume, chose to build it in [React](https://reactjs.org), and because I think the best
way to master something is to teach it. I had picked up the frame work through
work, and I recommend [React Holiday](https://react.holiday) for anyone trying to pick it up with just a
few minutes a day to spare. The title came from the number of friends that I
have that have learned the popular framework and then been able to move out of
their parent&rsquo;s house. I also was inspired by the [Hacker News Hiring Trends](https://www.hntrends.com) which
claims react has been the most popular skill requested for 22 months and made up
28% of all job postings in March 2019. Because of the surplus of tutorials
that seem to teach you `Just Enough` ™. Hopefully this post will be enough to
get you going from zero to out of your parent&rsquo;s house.

# Install git

You&rsquo;ll want install `git` next. Follow the instructions at this [site to install](https://git-scm.com)
for your platform.

# VS Code

I personally don&rsquo;t use VS Code, I use [Doom Emacs](https://github.com/hlissner/doom-emacs) but that&rsquo;s a whole other beast.
With that disclaimer I recommend VS Code to friends new to programming because it
is the popular GUI editor of the hour. You can download it [here](https://code.visualstudio.com).

## Fira Code

A fun little thing to make you feel like a special snowflake is to change your
font in your editor. I like to recommend `FiraCode` because it has ligature
support with overwhelming you with options. You can see how to install it on
your system and add it VS Code [here](https://github.com/tonsky/FiraCode/wiki).

## Install nodejs

_Node.js is a JavaScript runtime built on Chrome&rsquo;s V8 JavaScript engine_.
is the description their site gives. We&rsquo;ll cover more on JS later. The link to
the [Download page](https://nodejs.org/en/download/).

## Installing Extensions

One of the perks of VS Code is that it makes install extensions simple. They can
be installed by clicking the square icon on the left side of VS Code.
The list of what I recommend for following this guide:

- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
- [React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [VS Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [IntelliSense for CSS](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

You should glance over each and see what they give you.

### [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

`prettier` formats the code you on save. Follow the instructions on the page to
set it up.

### [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

Another way to keep your code clean and set a standard. Can you tell I like
clean code?

### [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

`ESLint` tells you when you&rsquo;ve done something wrong and sometimes can fix it for you.

## Integrated Terminal

If you know how to get a terminal on your system already awesome. If you don&rsquo;t
know what I&rsquo;m writing about, we&rsquo;re just going to use the integrated terminal. [A
quick doc on it](https://code.visualstudio.com/docs/editor/integrated-terminal), I recommend you use `git bash` if you&rsquo;re on [windows](https://code.visualstudio.com/docs/editor/integrated-terminal#_windows).

# GitHub

## Create an Account

If you don&rsquo;t have one yet that&rsquo;s fine. It should be self explanatory. Bonus if
you&rsquo;re a student, sign up for the [Student Pack](https://education.github.com/pack). I am not spelling out a majority
of this tutorial because of the various different platforms people are one would
make it quite long, and because part of developing software is learning to read
the friendly manual. Think of it more of a checklist.

## Create a Repo

I would be doing the docs at GitHub a disservice if I tried to take their
tutorial so here is [Creating a new repository](https://help.github.com/en/articles/creating-a-new-repository). We won&rsquo;t be covering a personal
site today so name it whatever you like. I&rsquo;ll be referring to it as `example-site`.

## Clone the repo

Using your `Integrated Terminal` follow this [guide](https://help.github.com/en/articles/cloning-a-repository) to clone your site. In my
case it would be:

    git clone https://github.com/emiller88/example-site

# Getting the Site set up

Now that I&rsquo;ve bored you with all of the tooling, or if you enjoyed it, we&rsquo;re on
to the real work.

## Create React App

Is a great utility to get your up and running with `React`

    npx create-react-app my-app
    cd my-app
    npm start

If you installed `nodejs` correctly earlier this should go off without a hitch
and you should have a browser popup with your site. This is a `local` site that
hot reloads whenever you edit anything in the project so you can get feedback if
your change is correct quickly.

## GitHub Pages

Follow the [Procedure](https://github.com/gitname/react-gh-pages#procedure), you should be able to skip to step 3. replace
`react-gh-pages` with `example-site` or whatever you chose.

## CircleCI

Lastly, we&rsquo;ll setup a CI/CD pipeline to automatically deploy and build your site
whenever you push code to master. You&rsquo;ll want to [create an account](https://circleci.com) and link your
GitHub. We&rsquo;ll be following this [blog post](https://circleci.com/blog/automate-your-static-site-deployment-with-circleci/). Here is the `.circleci/config.yml`
you&rsquo;ll need to add to your project.

    version: 2
    jobs:
      build:
        docker:
          # specify the version you desire here
          - image: circleci/node:lts
    # Specify service dependencies here if necessary
          # CircleCI maintains a library of pre-built images
          # documented at https://circleci.com/docs/2.0/circleci-images/
          # - image: circleci/mongo:3.4.4
    working_directory: ~/repo
    steps:
          - checkout
    # Download and cache dependencies
          - restore_cache:
              keys:
              - v1-dependencies-{{ checksum "package.json" }}
              # fallback to using the latest cache if no exact match is found
              - v1-dependencies-
    - run: npm install
    - save_cache:
              paths:
                - node_modules
              key: v1-dependencies-{{ checksum "package.json" }}
    # run tests!
          - run: npm run test
          - deploy:
              name: deploy to GH-Pages
              command: npm run deploy

# React

It&rsquo;s about time we actually talked about `React`. As you can see though a good
chunk of development is just setting up the project.
There&rsquo;s obviously the link to the official documentation that comes in the
`create-react` starter page which I recommend you read. But now that we&rsquo;re to
the actual meat I&rsquo;ll take you through a few things.

## React bootstrap

If you&rsquo;ve ever seen a basic website recently it might be made with bootstrap. It
was recreated for use with [React](https://react-bootstrap.github.io/getting-started/introduction).

[To get started with it](https://react-bootstrap.github.io/getting-started/introduction) run the following and then follow the docs.

    npm install react-bootstrap bootstrap

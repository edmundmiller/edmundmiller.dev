---
author: Edmund Miller
publishDate: '2019-05-26T22:05:12Z'
title: Learn Just Enough React to Move Out of Your Parent's House
description: A 2019 checklist for creating a React site and deploying it automatically with GitHub Pages and CircleCI.
tag: ['javascript']
---

> This is a snapshot of my May 2019 workflow. Create React App, CircleCI, GitHub Pages, and their defaults have changed since then.

I wrote this checklist while helping a friend build a portfolio site in React. Teaching the setup helped me understand it. The title came from friends who learned React, found development jobs, and moved into their own homes.

The choice also reflected the 2019 job market. [Hacker News Hiring Trends](https://www.hntrends.com) reported that React appeared in 28% of its March 2019 job posts.

The goal was simple: create a React site, put its source on GitHub, and deploy each change automatically.

## The deployment checklist

1. Install [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/).
2. Create a [GitHub](https://github.com/) account and a repository named `example-site`.
3. Clone that repository to your computer.
4. Create the React application and run it locally.
5. Configure GitHub Pages.
6. Configure CircleCI to test and deploy each push.

Use any editor and terminal you are comfortable with. This post focuses on the project and deployment path. The linked documentation covers platform-specific installation.

## Create and clone the repository

Follow GitHub's guide to [create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). Then clone it from a terminal:

```bash
git clone https://github.com/edmundmiller/example-site
cd example-site
```

Students can also check their eligibility for the [GitHub Student Developer Pack](https://education.github.com/pack).

## Create the React application

In 2019, Create React App was the common starting point. I used these commands:

```bash
npx create-react-app my-app
cd my-app
npm start
```

The development server opened the site in a browser. It also reloaded the page after each saved change.

This setup let us start with React instead of choosing a bundler, test runner, and development server separately.

## Publish with GitHub Pages

I followed the [`react-gh-pages` procedure](https://github.com/gitname/react-gh-pages#procedure). The repository name in its example became `example-site` for this project.

That process added a deployment command and told GitHub Pages where to find the built site. A manual deploy confirmed the configuration before we automated it.

## Automate deployment with CircleCI

The last step connected the GitHub repository to [CircleCI](https://circleci.com/). Its job checked out the source, installed dependencies, ran tests, and called the deployment command.

Once that job passed, every push to the main branch could publish the site. The exact CircleCI image and configuration from 2019 are now obsolete. Current projects should use the latest CircleCI and GitHub Pages documentation.

The useful lesson was not the specific service. A small deployment path made the project easier to finish: run it locally, publish it once, then automate the same steps.

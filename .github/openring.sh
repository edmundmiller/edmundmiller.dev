#!/usr/bin/env bash

openring \
  -s https://drewdevault.com/blog/index.xml \
  -s https://monimiller.com/rss.xml \
  -s https://taehoonkim.org/news/?format=rss \
  <./.github/openring.html \
  >./src/components/openring-out.html

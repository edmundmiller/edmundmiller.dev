#!/usr/bin/env bash

openring \
  -s https://drewdevault.com/feed.xml \
  -s https://monimiller.com/feed.xml \
  -s https://taehoonkim.org/news/?format=rss \
  <./.github/openring.html \
  >./public/openring-out.html

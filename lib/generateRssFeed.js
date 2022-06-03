import fs from "fs";
import { Feed } from "feed";
import { getAllPosts } from "./api";

export default async function generateRssFeed() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'author_picture',
    'og_image',
    'cover_image',
    'content',
  ]);
  const siteURL = process.env.VERCEL_URL;
  const date = new Date();
  const author = {
    name: "Edmund Miller",
    email: "edmund.a.miller@@gmail.com",
    link: "https://edmundmiller.dev/about",
  };

  const feed = new Feed({
    title: "Edmund Miller",
    description: "Edmund Miller's Personal Blog",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Edmund Miller`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,  // xml format
      json: `${siteURL}/rss/feed.json`,// json fromat
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}
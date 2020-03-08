// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Edmund Miller",
  siteUrl: "https://edmundmiller.dev",
  // siteDescription:
  //   "",

  templates: {
    Post: "/:title",
    Tag: "/tag/:id"
  },

  plugins: [
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-107034006-4"
      }
    },
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true
          }
        }
      }
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Edmund Miller Blog",
          feed_url: "https://edmundmiller.dev/rss.xml",
          site_url: "https://edmundmiller.dev"
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: "https://edmundmiller.dev/" + node.slug,
          author: node.author
        }),
        output: {
          dir: "./static",
          name: "rss.xml"
        }
      }
    },
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "tailwind.config.js",
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};

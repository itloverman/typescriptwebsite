// https://github.com/gatsbyjs/gatsby/issues/1457
require("ts-node").register({ files: true })
const { join } = require("path")

// prettier-ignore
const shiki = join(require.resolve(`gatsby-remark-shiki-twoslash`), "..", "..", "package.json")

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.typescriptlang.org/`,
  },

  // This should only be used in a CI deploy while we're working in a v2 sub-folder
  pathPrefix: `/v2`,

  plugins: [
    // SCSS provides inheritance for CSS and which pays the price for the dep
    "gatsby-plugin-sass",
    // PWA metadata
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TypeScript Documentation`,
        short_name: `TS Docs`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#3178C6`,
        display: `standalone`,
        icon: `static/icons/ts-logo-512.png`,
      },
    },

    // Support for downloading or pre-caching pages, needed for PWAs
    // "gatsby-plugin-offline",

    // Creates TS types for queries during `gatsby dev`
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        // Ensure it works in a monorepo
        outputPath: __dirname + "/src/__generated__/gatsby-types.ts",
      },
    },
    // Support ts/tsx files in src
    "gatsby-plugin-typescript",
    // SEO
    `gatsby-plugin-sitemap`,
    // Lets you edit the head from inside a react tree
    "gatsby-plugin-react-helmet",
    // Grabs the old handbook markdown files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../handbook-v1/en`,
        name: `handbook-v1`,
      },
    },
    // Grabs file from the tsconfig reference
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../tsconfig-reference/output`,
        name: `tsconfig-reference`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../playground-examples/generated`,
        name: `playground-examples`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../playground-examples/copy`,
        name: `all-playground-examples`,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "en",
        useLangKeyLayout: true,
      },
    },

    // Markdown support, and markdown + react
    // `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: shiki,
            options: {
              // theme: "nord",
              theme: require.resolve("./lib/themes/typescript-beta-light.json"),
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    // Finds auto-generated <a>s and converts them
    // into Gatsby Links at build time, speeding up
    // linking between pages.
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /(sandbox|play)/,
      },
    },
    "gatsby-plugin-client-side-redirect",
  ],
}

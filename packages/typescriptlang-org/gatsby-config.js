// https://github.com/gatsbyjs/gatsby/issues/1457
require("ts-node").register({ files: true })

module.exports = {
  plugins: [
    // Creates TS types for queries during `gatsby dev`
    "gatsby-plugin-codegen",
    // Support ts/tsx files in src
    "gatsby-plugin-typescript",
    
    // Let's you edit the head from inside a react tree
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
    // Markdown support
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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
  ],
}

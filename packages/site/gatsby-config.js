module.exports = {
  siteMetadata: {
    title: "Commonwealth - Emergency Savings Demo",
    slug: "site-b",
    description:
      "An easy, no-fee product to help you take the first step on your savings journey.",
    author: "Commonwealth",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "steps",
        path: `${__dirname}/src/steps`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "partials",
        path: `${__dirname}/src/partials`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `@commonwealth-savings-wizard/theme`,
      options: {
        sources: {
          steps: `${__dirname}/src/steps`,
          partials: `${__dirname}/src/partials`,
        },
        routes: {
          confirmation: "/confirmation/",
        },
      },
    },
    "gatsby-plugin-remove-serviceworker",
  ],
};

module.exports = () => ({
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Commonwealth - Emergency Savings Demo",
        short_name: "commonwealth",
        start_url: "/",
        background_color: "#2559a7",
        theme_color: "#2559a7",
        display: "minimal-ui",
        icon: "src/assets/images/icon.png",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-remove-serviceworker",
    // "gatsby-plugin-offline",
  ],
});

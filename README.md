# Emergency Savings Demo

This is the source for a web-based signup wizard for a hypothetical emergency savings product. A live demo can be viewed [here](https://commonwealth-demo.netlify.app/).

This is a monorepo, which uses [Lerna](https://lerna.js.org/) and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). The wizard is a [React](https://reactjs.org/) app built with [Gatsby](https://gatsbyjs.com/) and [MDX](https://mdxjs.com/). The demo is hosted through [Netlify](https://www.netlify.com/).

In an effort to simplify split testing and user experiments, all of the Gatsby config, custom components and wizard functionality have been abstracted into a bespoke [Gatsby theme](https://www.gatsbyjs.com/docs/themes/). See [the theme's README](theme/README.md) for a description of its features and API.

## Create a new test

The npm script `new` is available to quickly create a new demo preconfigured to use the theme. From the repo root, execute the following:

```shell
% yarn run new
```

`new` is similar to the Gatsby CLI command `gatsby new`. You can provide as arguments a name for the new site and a starter to use. If you provide only one or no arguments, you'll be prompted to enter the rest.

```shell
% # create a new site "test-b" from site "test-a"
% yarn run new "test-b" "test-a"

% # or use without arguments and let the script assist you
% yarn run new
? New site name: (site-a)
? Existing site to clone: (Use arrow keys)
> main
  starter-default
```

> Alternatively, you can copy an existing site in the `sites` directory. Just be sure to change the `name` property in your new site's `package.json` and then run `yarn`.

Now you're ready to start editing. Make changes to `src/pages` and `src/steps`, or dig in if you want to make more complex changes.

### Editing pages

Pages are located in `src/pages`, and steps in `src/steps` by default. 
> You can keep steps in another directory if you prefer, just be sure to pass the path as a plugin option with the key `stepsPath` in your `gatsby-config.js`.
>
> ```js
> // specifying a different path in gatsby-config.js
> plugins: [
>   {
>     resolve: "@commonwealth-savings-wizard/theme",
>     options: {
>       stepsPath: `${__dirname}/content/steps`
>     }
>   }
> ]
> ```

Pages and steps are written in [MDX](https://mdxjs.com/), which is essentially [Markdown](https://daringfireball.net/projects/markdown/) + [JSX](https://reactjs.org/docs/introducing-jsx.html).

You can use React components (even imports) in addition to standard Markdown syntax. A number of components are made available by the theme, which you can use without importing. For a full list, see the [theme's README](/theme/README.md).

```mdx
import MyCustomComponent from "./components/MyCustomComponent"

# This is a heading

This is a paragraph.

Here are a <Link to="/another-page">link</Link> and a <Button>button</Button> which are provided by the theme.

Next is a text input, also provided by the theme:

<Field type="text" name="my-text-input" />

And finally, a custom component:

<MyCustomComponent />
```

### Deploying your test

Unfortunately monorepo support in Netlify is still a work in progress, so deploying for the first time requires a few extra steps. We'll treat each test as its own Netlify site.

From the Netlify dashboard:

1. Click "New site from Git" and select this repo
2. Set the build settings as follows:
    1. Set "Build command" to `cd sites/<site-directory> && yarn run build` replacing `<site-directory>` with the new site's directory name
    2. Set "Publish directory" to `sites/<site-directory>/public/`, again replacing `<site-directory>`
3. Deploy!


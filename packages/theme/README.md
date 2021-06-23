# Savings Wizard Theme

This is a [Gatsby theme](https://www.gatsbyjs.com/docs/themes/) that provides custom context, hooks and components for the savings wizard.

The theme uses MDX Form validation and management is handled by [React Hook Form](https://react-hook-form.com/), animations by [react-spring](https://www.react-spring.io/) and styling by [Emotion](https://emotion.sh/) via [Theme UI](https://theme-ui.com/). All components are Theme UI compatible and can be restyled through theming.

## Configuration

Configure the theme as you would any other Gatsby theme or plugin.

```js
/** gatsby-config.js */

// without options
plugins: ["@commonwealth-savings-wizard/theme"];

// with options
plugins: [
  {
    resolve: "@commonwealth-savings-wizard/theme",
    options: {
      stepsPath: "...",
      confirmationPagePath: "...",
    },
  },
];
```

### Options

Available options include:

- **`stepsPath`**  
  The path where your wizard step files are located. This should be relative to the site's root directory. The default is `"src/steps"`.
- **`confirmationPagePath`**  
  The relative URL for your confirmation page. The default is `"/confirmation/"`.

## Content

The theme is configured to use [MDX](https://mdxjs.com/), and expects pages and steps to be expressed as individual MDX files.

### Pages

The theme isn't particular about your pages. In a Gatsby project, pages are typically kept in `src/pages`.

At the very least, you'll want an `index.mdx` representing the front page, as well as a confirmation page which will be referenced at the conclusion of the wizard. Specify the route to your confirmation page with the plugin option `confirmationPagePath`.

### Steps

The theme must be able to distinguish step pages from other content. It looks for MDX files located in `src/steps`. You can specify a different location with the plugin option `stepsPath`.

Each file name must begin with a number representing the step's order in the wizard. MDX files with names that don't begin with numbers are ignored.

#### Frontmatter

Some step metadata is set with frontmatter. For now, properties set through frontmatter include:

| Property | Description |
| --- | --- |
| `cta` | Used as button text in the wizard's pagination. If not provided, the step's filename is used with leading digits removed and formatted in sentence case. |
| `nextText` | The text displayed in the Next button. `'Next'` is used by default, except for the last step which uses `'Confirm & submit'` by default. |
| `backText` | The text displayed in the Back button. `'Back'` is used by default. |

### Conditionally show and hide content

With a [`<Section>`](#section) component, you can show or hide content based on user input. The component's `conditions` prop is used to determine its visibility.

**For simple equality comparisons**, supply a plain object with keys that match the names of fields to check, and values that represent comparison operands.

In the following example, the text "False. Black bear." is only shown when the radio group named `best-bear` has a value of `Brown bear`.

```mdx
<Field
  name="best-bear"
  type="radio"
  label="What kind of bear is the best?"
  options={["Brown bear", "Black bear"]}
/>

<Section conditions={{ "best-bear": "Brown bear" }} >


False. Black bear.

</Section>

```

You can reference fields from any step in the wizard, not just the current step. _Remember that all fields are required to have unique names_.

**Complex comparisons** are supported through MongoDB-style queries via [sift.js](https://github.com/crcn/sift.js). If you've done any filtering or sorting with graphql in Gatsby, then this should feel familiar.

Sift offers common comparison operators such as `$eq` (equal), `$ne` (not equal), `$gt` (greater than) and `$lt` (less than), as well as logical operators `$and`, `$or`, `$not`, etc.. For a full list of available operators, see [this section of sift's api documentation](https://github.com/crcn/sift.js#supported-operators).

Also, one custom operator is available, **`$isSet`**. Use `$isSet` to check for any value other than the default.

The component from the example above can be rewritten as:

```mdx
<Section conditions={{ "best-bear": { $eq: "Brown bear" } }} >


False. Black bear.

</Section>

```

In the next example, the section is only visible when either of two conditions is true:

1. The field named "prior-savings" has a value of "No"
2. The filed named "prior-savings" has a value of "Yes" _and_ the field named "prior-savings-amount" has a value greater than 0.

```mdx
<Section
  conditions={{
    $or: [
      { "prior-savings": "No" },
      {
        $and: [
          {"prior-savings": "Yes"},
          {"prior-savings-amount": { $gt: 0 }}
        ]
      }
    ]
  }}
>


Let's get started.

</Section>

```

## API

### Available Components

Some components are made available through an `MDXProvider` and can be used in MDX without imports. See below for a list.

Props generally are spread into wrapped components and children, so default values can be overwritten and event handlers such as `onClick` and `onChange` will work as expected, as will valid html attributes.

All components are Theme UI compatible and support some style props. [`space` props](https://styled-system.com/table#space) (margin and padding) are supported across the board. The descriptions below list additionally supported style props (if any) and applicable theme keys.

- [`<Box>`](#Box)
- [`<Button>`](#Button)
- [`<CTA>`](#CTA)
- [`<Feature>`](#Feature)
- [`<Field>`](#Field)
- [`<FieldValue>`](#FieldValue)
- [`<Flex>`](#Flex)
- [`<Grid>`](#Grid)
- [`<Heading>`](#Heading)
- [`<Icon>`](#Icon)
- [`<Image>`](#Image)
- [`<Link>`](#Link)
- [`<Message>`](#Message)
- [`<Section>`](#Section)
- [`<Text>`](#Text)

#### `<Box>`

> Theme UI's `<Box>` component.

#### `<Button>`

> A generic button component.

If a `to` or `href` prop is provided, the component is rendered and behaves as a [`<Link>`](#link) component. Otherwise, it's rendered as a `<button>` with `type="button"` by default.

Be sure to provide an `onChange` handler or `type="submit"` if you're rendering a button and not a link.

##### Props

The same as [`<Link>`](#link)

#### `<CTA>`

#### `<Feature>`

#### `<Field>`

> A form control component.

The component can render any of a number of controls types based on the `type` prop. Most valid values for the HTML `<input>` element's `type` attribute are supported. Additional accepted values include `radio`, `select`, `slider` and `textarea`. See below for a complete list.

The `name` prop is required and must be globally unique. Think of the wizard taken all together as one big web form. No duplicate field names.

##### Props

| Name | Required | Default Value | Description |
| --- | --- | --- | --- |
| `defaultValue` | No | `''` | The form control's default value. |
| `direction` | No | `'column'` | Determines the layout of options for radio and checkbox controls. |
| `disabled` | No | `false` | Sets the form control's `disabled` attribute. |
| `hint` | No | `null` | Additional descriptive text for to accompany the input. |
| `label` | **Yes** | --- | The form control's accompanying label. |
| `name` | **Yes** | --- | The form control's name attribute. Names must by globally unique. |
| `options` | No | `[]` | An array of options or choices. Used by form controls of type `select`, `radio`, `checkbox` and `tiles`. Can be a simple array of strings, or an array of plain objects of the shape `{ value: <option-value> , text: <display-text> }`. |
| `placeholder` | No | `null` | Placeholder text used by text inputs such as those of type `text`, `password` and `textarea`. |
| `required` | No | `false` | Sets the form control's `required` attribute and is used for validation. |
| `type` | No | `text` | The form control type to render. See below for a complete list of valid values. |
| `units` | No | `null` | Used by inputs of type `number` to set coherent values for attributes like `min` and `step`. Also adds a prefix or suffix to the input. Right now, the only value with an effect is `USD` for U.S. dollars. |

Available form control types (i.e. acceptable values for the `type` prop):

- **`checkbox`**  
  A single or group of checkbox inputs. Pass values with the `options` prop.
- **`number`**  
  A number input.
- **`radio`**  
  A radio group. Pass values as an array with the `options` prop.
- **`select`**  
  A select element. Pass options as an array with the `options` prop.
- **`slider`** or **`range`**  
  An range input.
- **`text`**  
  A text input.
- **`textarea`**  
  A textarea element.
- **`tiles`**  
  A radio group styled to look something like a button group. Pass options as an array with the `options` prop.

#### `<FieldValue>`

> A component that renders the value of a specified form field.

The required prop `name` specifies which form value to reference. It should match the `name` prop of a field in the wizard.

You can also provide an array of names as fallback values. The component will use the first one that matches a field in the wizard that has a value. For example `name={["email", "phone-number"]}` will use the value of the field `email` if it is set, otherwise it will use the value of the field `phone-number`.

If provided, the value of the prop `defaultValue` will be used when none of the fields specified by prop `name` have a value.

The component optionally accepts a single function as its children. If present, the child function will be called with one argument: the value of the field specified by the `name` prop.

##### Props

| Name | Required | Default Value | Description |
| --- | --- | --- | --- |
| `children` | No | `null` | An optional render-prop style function. If provided, the function is called with the value of the field (or fields) specified by the `name` prop as its single argument. |
| `defaultValue` | No | `null` | The value rendered if no value has been set for the field (or fields) specified by the `name` prop. |
| `label` | No | `null` | Text to be rendered with the value. If a child function is provided, this prop is ignored. |
| `name` | **Yes** | --- | The name of the field to be referenced. You may pass an array of names, and the first one with a value will be used. |

#### `<Flex>`

#### `<Grid>`

#### `<Heading>`

#### `<Icon>`

#### `<Link>`

> A styled wrapper around [Gatsby's `<Link>`](https://www.gatsbyjs.com/docs/gatsby-link/) component, which is itself a wrapper around [Reach Router's `<Link>`](https://reach.tech/router/api/Link).

This `<Link>` is a bit less strict than Gatsby's. By contrest to Gatsby's `<Link>`, which requires the `to` props and expects it to be a pathname referencing an existing route, our `<Link>` checks both the `href` and `to` props (in that order) for URLs, and requires neither.

If the value of `href` or `to` is a relative URL, the component will render a Gatsby `<Link>`. You can also pass an integer (or an integer-ish value) representing the index of a step in the wizard, which will be swapped with the path for that step.

Otherwise, the component will render an `<a>` element with additional attributes `rel="noreferrer"` and `target="_blank"` (although these will be overwritten by props if they are provided).

##### Props

| Name | Required | Default Value | Description |
| --- | --- | --- | --- |
| `disabled` | No | `false` | Adds `aria-disabled` attribute if a truthy value is supplied. |
| `href` | No | `null` | An alias of `to`. |
| `to` | No | `null` | The destination page or hyperlink reference. |

#### `<Message>`

#### `<Section>`

> An unstyled `<div>`.

If supplied with a `conditions` prop, the visibility of the component is set dynamically, according to the values of form controls within the wizard. See [Conditionally show and hide content](#conditionally-show-and-hide-content) above for details.

##### Props

| Name | Required | Default Value | Description |
| --- | --- | --- | --- |
| `conditions` | No | `{}` | An object used to determine the component's visibility, generally of the shape `{ [field-name]: <success-condition> }` |

#### `<Text>`

> Theme UI's `<Text>` component.

### Hooks

- [`useFormField`](#useFormField)
- [`useFormSubmit`](#useFormSubmit)
- [`useFormValues`](#useFormValues)
- [`useIsCompleted`](#useIsCompleted)
- [`useResetWizard`](#useResetWizard)
- [`useSaveFormValues`](#useSaveFormValues)
- [`useLiveFormValues`](#useLiveFormValues)
- [`useSteps`](#useSteps)

#### `useFormField`

#### `useFormSubmit`

#### `useFormValues`

#### `useIsCompleted`

#### `useResetWizard`

#### `useSaveFormValues`

#### `useLiveFormValues`

#### `useSteps`

## Notes and TO-DOs

We're using a canary v9 `react-spring`. The API is pretty stable right now, but future updates may break things.

`react-spring@^9.0.0-rc.3` has [an app-breaking bug](https://github.com/react-spring/react-spring/issues/1078) that we've solved [by patching each of the `@react-spring` packages](https://github.com/react-spring/react-spring/issues/1078#issuecomment-692000408). After `rc.4` lands, be sure to remove `./patches/`, the `patch-package` post-install hook and the `patch-package` package.

# Tailwind Compositor

Compositor is a system of constraints designed to produce aesthetically pleasing, typographic compositions, based on objective, constant dimensions of space.

---

\_TL;DR A baseline grid system for [tailwindcss](https://tailwindcss.com/).

---

## Motivation

There is no right and wrong when it comes to typographic expression. This is simply a guide that help us design and implement consistent vertical typographic rhythm.

#### High Fault Tolerance

Many design systems only provide a series of independent token collections, for family, size, weight, style, line-height, letter-spacing that can be applied interchangeably. Most of these combinations don't produce useful results, or even worse don't exist at all.

For example, if we don't load a particular webfont, when a browser can't find the true bold or italic version of a font, will often create faux bold and italics by stretching and slanting the glyphs which renders the information uninteligible and makes typophiles very sad.

#### Unpredictable Rhythm

Traditionally, in typography, space between lines of text is measured from the baseline. On the web, browsers behave differently. The bounding box of the text, or the distance from the ascender to the descender, is vertically centered to it's line-height.

[Vertical Metrics Visualization](https://vertical-metrics.netlify.app)
<img src="https://github.com/a7sc11u/tailwind-compositor/raw/master/plugin/images/vertical-metrics.png" width="400"/>

As a result, when rendering text, unline any other dom element, the browser adds white-space above and below each line of text. So our layout implementation can behave unpredictably, and require optical adjustments, depending on the order of UI components, font, font-size and line-height.

#### Solution

Compositor only enables font styles configured in the system, and the baseline grid works as a guide to achieve a better typographic hierarchy and rhythm. The margin of error is minimized and the "correct" solution is easier to identify.

---

## How it works?

The compositor utilities, using font metrics, crop the white space around the text and align layout elements and lines of text, to a meaningful, baseline rhythm.

In the example below, initially we're using sensible values, provided by tailwind. It actually looks pretty good. There's reasonable distance between the lines and the text appears legible. But when we render a baseline grid, we notice that the space between lines of text is kind of inconsistent.

<img src="https://github.com/a7sc11u/tailwind-compositor/raw/master/plugin/images/baseline-slideshow.gif" width="500"/>

---

## Installation

You will need fontkit, postcss and tailwindcss installed along with the plugin

```
npm install postcss fontkit tailwindcss tailwind-compositor
```

#### - postcss.config.js

In your `postcss.config.js` you will need to import your standard `tailwind.config.js`, but also your `compositor.config.js`.

The `{ compositor }` will receive both, merge with your tailwind config, and return a standard tailwind configuration.

```
const tailwindcss = require('tailwindcss');]
const { compositor } = require('tailwind-compositor');

// import both configurations
const compositorConfig = require('./compositor.config.js');
const tailwindConfig = require('./tailwind.config.js');

// compose config
const tailwindConfigComposed = compositor(compositorConfig)(tailwindConfig);

// use with tailwind
module.exports = {
  plugins: [
    tailwindcss(tailwindConfigComposed),
  ],
};
```

---

## Configuration

#### - compositor.config.js

```
const compositorConfig = {
  // useRem
  useRem: true,

  // root (html) font-size in px units
  root: 16,

  // baseline grid in px units
  baseline: 8,

  // type scale in px units
  type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56, 60, 72],

  // rhythm in baseline units
  rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],

  // measure in ch units
  measure: [10, 15, 20, 30, 35, 50, 55, 60, 65],

  // webfonts and vertical metrics
  fonts: [
    {
      key: "sans-400",
      familyName: "Inter",
      fallback: "sans-serif",
      weight: 400,
      italic: false,
      upm: 2816,
      xHeight: 1536,
      capHeight: 2048,
      ascent: 2728,
      descent: -680
    }
    {
      key: 'sans-600',
      familyName: "Inter",
      fallback: 'sans-serif',
      file: path.resolve('./fonts/inter/Inter-Semibold.woff2'),
    },
  ],

  // compositor options
  options: {
    xray: true,
    baseline: true,
    capheight: true,
    xheight: true,
    rhythm: true,
    measure: true,
  },
}
```

#### `1/8 useRem: bool`

When useRem is set to true, all spacing and font-size utilities, will be transformed to `rem` units. Otherwise remain as configured, in `px`. It is recommended to favour `rem` units over `px`, however sometimes while in development, it's more efficient to communicate values with designers using `px` units, or absolute `baseline` units. With `useRem` you can switch all the values with a single configuration.

---

#### `2/8 - root: integer`

The root font size `1rem` in `px` units.

---

#### `3/8 - baseline: integer`

The baseline grid row height, in `px` units.

---

#### `4/8 - type : array[integer]`

```
type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56, 60, 72]
```

The system's typographic scale, in `px` units.

---

#### `5/8 - rhythm : array[integer]`

```
rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]
```

The system's size and spacing scale, in `baseline` units, used for `rhythm`, `margin`, `padding`, `width/min/max`, `height/min/max` and `grid-gap` utilities

---

#### `6/8 - measure : array[integer]`

```
measure: [10, 15, 20, 30, 35, 50, 55, 60, 65]
```

Separate scale used for `measure` (line-width) utilities, configured in `ch` units.

---

#### `7/8 - fonts : array[opentype]`

The font scale provides all the information needed to render text styles. Each entry describes a font/weight/style set, and only those that are part of the system will be enabled.

The `file` property, is used to extract the vertical metrics dynamically from the font-file. If you want to configure the metrics manually, you can avoid the `file` prop.

**Gotcha** some fonts might be designed as italic, but are not configured as such. If you use the `file` property, you might need to configure the `weight` and `italic` properties manually.

You can use the [vertical metrics](https://vertical-metrics.netlify.app) app to manually extract font metrics, or other tools like glyphs, robofont or ask your type foundry.

The `key` property is used to name the utility classes. The configuration bellow will produce two font styles `font-sans-400` which will render Inter Regular and `font-sans-400i` which will render Regular Italic style. The recommended convention is `${family}-${weight}i`.

You can adjust to whatever feels more intuitive to you. Theres is no constraint. for example, if you only have two weights, a `font-text` `font-heading` convention would work well.

```
{
  key: "sans-400",
  familyName: "Inter",
  fallback: "sans-serif",
  weight: 400,
  italic: false,
  upm: 2816,
  xHeight: 1536,
  capHeight: 2048,
  ascent: 2728,
  descent: -680
}
{
  key: 'sans-400i',
  familyName: "Inter",
  fallback: 'sans-serif',
  file: path.resolve('./fonts/inter/Inter-Italic.woff2'),
},
{
  key: 'sans-600',
  familyName: "Inter",
  fallback: 'sans-serif',
  file: path.resolve('./fonts/inter/Inter-Semibold.woff2'),
},
{
  key: 'sans-600i',
  familyName: "Inter",
  fallback: 'sans-serif',
  file: path.resolve('./fonts/inter/Inter-SemiboldItalic.woff2'),
},
```

---

#### `8/8 - options : object`

Options properties, are used to enable/disable individual compositor utilities.

```
options: {
    xray: true, //Enable debug utilities
    baseline: true, // Enable baseline typographic utilities
    capheight: true, // Enable capheight typographic utilities
    xheight: true, // Enable xheight typographic utilities
    rhythm: true, // Enable rhythm utilities
    measure: true, //Enable measure utilities
  }
```

---

## Tailwind Utility Classes

#### Font and Font Style

-   font: `font-{font-key}`
-   Size & Line Height : `type-{type_scale_index}/{leading_baseline_units}`

```

// fonts: [
//   {
//   key: "sans-400",
//   }
//   {
//     key: 'sans-400i',
//   },
//   {
//     key: 'sans-600',
//   },
//   {
//     key: 'sans-600i',
//   },
// ],
// type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56]


// sans semibold italic - 56px / leading 3
<h3 class="font-sans-600i type-10/3" />

// sans regular - 20px / leading 3
<p class="font-sans-400 type-2/3" />

// sans regular italic - 18px / leading 2
<p class="font-sans-400i type-1/2" />
```

---

#### Line Width

-   `measure-{measure_scale_index}`

```
// measure: [10, 15, 20, 30, 35, 50, 55, 60, 65]

// 10ch
<p class="measure-0">Ad proident quis enim duis commodo.</p>

// 15ch
<p class="measure-1">Ad proident quis enim duis commodo.</p>

// 20ch
<p class="measure-2">Ad proident quis enim duis commodo.</p>

// 30ch
<p class="measure-3">Ad proident quis enim duis commodo.</p>
```

---

#### Spacing

When the tailwind theme is composed, the rhythm scale is transformed to tailwindcss spacing scale and can be used for all spacing utilities, margin, padding and grid-gap.

-   Margin: `m-{rhythm_scale_index}`
-   Margin Left: `ml-{rhythm_scale_index}`
-   Padding: `p-{rhythm_scale_index}`
-   ...etc

```

// rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]

<section class="px-4 py-5">
  <h3 class="sans400 type-7/3 mb-4" />
  <input type="text" class="h-8 mb-4" />
  <p class="sans400i type-1/2" />
</section>
```

---

#### Size

Compositor also applies the spacing scale to tailwind sizing scales, width, min/max width and also height min/max.

-   Height: `h-{rhythm_scale_index}`
-   Min Height: `min-h-{rhythm_scale_index}`
-   Max Height: `max-h-{rhythm_scale_index}`
-   ...etc
-

```
<section class="min-h-10 flex flex-col items-end">
  <button class="h-8" />
</section>
```

---

#### Lobotomized Owls

-   Vertical rhythm (alias): `rhythm-{rhythm_scale_index}`
-   Vertical rhythm: `rhythm-y-{rhythm_scale_index}`
-   Horizontal Rhythm: `rhythm-x-{rhythm_scale_index}`

```


<section class="rhythm-3 lg:rhythm-5" />
  <h3 class="sans400 type-7/3" />
  <p class="sans400 type-5/3" />

  // render horizontally
  <div class="flex flex-row rhythm-x-2" >
    <button />
    <button />
  </div>
</section>
```

---

#### Dev Utils

-   Background grid lines: `bg-baseline`

```
<section class="bg-baseline" />
```

---

## Can I use it?

1. You can definitely use it as a practical educational or design and prototyping tool.

2. On production, it depends on your typescale and number of webfonts. Compositor creates breakpoints*fonts*typescale\*leading classes. That's a lot. The output's filesize can be way beyond anything you should consider shipping. For many use cases, such as personal blogs and minimal aesthetic, it should be fine. **You must use purgecss with this library.**

3. It should work with every font, however many fonts are poorly designed (some very popular too) and don't use the same vertical metrics to render text across browsers and operating systems. The error might be negligible in reading size, but display text can be more problematic.

4. Currently, the system only works for horizontal text So far, it hasn't been tested thoroughly with non-latin characters. So if you're going to try it, please share your observations.

---

## Todos

-   Website
-   Built-in typescales
-   Breakpoing configuration with useRem
-   Themes
-   Color
-   React/Emotion version
-   Custom IDE

---

Special thanks to Michael Taranto, who I've never met, but their original [basekick](https://github.com/michaeltaranto/basekick) recipe made this possible.

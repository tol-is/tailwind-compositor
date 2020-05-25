# Tailwind Compositor

Compositor is essentially a system of constraints, that helps implement aesthetically pleasing, predictable typographic compositions, based on mathematical thinking and objective, rational, constant dimensions of space.

> It is not important that the result should be this or that. What is important, is that the form should and must take it's shape, in obedience to an order or formula. It is in the design of the formula and not in the design of the form, that the creative pleasure resides. And thus the aim of the creative work
> _Karl Gerstner - Designing Programmes_

---

## Installation

You will need postcss, tailwindcss and fontkit installed along with the plugin

##### dependencies

```
npm install postcss fontkit tailwindcss tailwind-compositor
```

##### postcss.config.js

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

##### compositor.config.js

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

#### - `useRem: bool`

When useRem is set to true, all spacing and font-size utilities, will be transformed to `rem` units. Otherwise remain as configured, in `px`. It is recommended to always favour `rem` units, however it's more efficient to communicate values, for example with designers using `px` units. With `useRem` you can switch all the values with a single configuration.

#### -`root: integer`

The root font size `1rem` in `px` units.

#### - `baseline: integer`

The baseline grid row height, in `px` units.

#### - `type : array[integer]`

```
type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56, 60, 72]
```

The system's typographic scale, in `px` units, specified as an array of integers. If `useRem` is `true` when font-size is applied, it will be translated to `rem` units.

#### - `rhythm : array[integer]`

```
rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]
```

The system's size and spacing scale, in `baseline` units, specified as an array of integers, If `useRem` is `true` when margin, padding, height, grid-gap is applied it will be translated to `rem` units.

#### - `measure : array[integer]`

```
measure: [10, 15, 20, 30, 35, 50, 55, 60, 65]
```

Separate scale used for line-width utilities, in `ch` units.

#### - `fonts array[opentype]`

The font scale provides all the information needed to render text styles. Each entry describes a font/weight/style set, and only those that are part of the system will be enabled.

The `key` property is used for the utility classes. The configuration bellow will produce two font styles `sans-400` which will render Inter Regular and `sans-400i` it's italics style respectively.

You can preconfigure each font style manually, or use the `file` property to reference any font format, and extract the vertical metrics dynamically.

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
```

#### - `options`

Options provide a set of properties used to enable/disable individual compositor utilities. Unlike tailwind, compositor's utilities are all responsive and only responsive.

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

```
<p class="font-sans-400 type-3/2">
  Amet et non nisi ex
</p>
```

-   `font-{font-key} font style`
-   `type-{type_scale_index}/{leading_in_baseline_units} baseline bbox`
-   `capheight-{type_scale_index}/{leading_in_baseline_units} cap-height bbox`
-   `xheight-{type_scale_index}/{leading_in_baseline_units} x-height bbox`
    `

```
// family / style
<p class="font-sans-400" />
<p class="font-sans-400i" />

// bounding box / type scale / leading
<div class="font-sans-400 type-10/3" />
<div class="font-sans-400 capheight-5/3" />
<div class="font-sans-400 xheight-5/3" />
```

---

#### Line Width

-   `measure-{measure_scale_index}`

```
<p class="measure-0">Ad proident quis enim duis commodo.</p>
<p class="measure-1">Ad proident quis enim duis commodo.</p>
<p class="measure-2">Ad proident quis enim duis commodo.</p>
<p class="measure-3">Ad proident quis enim duis commodo.</p>
```

---

#### Rhythm, Size and Spacing

-   `rhythm-{rhythm_scale_index}` Vertical rhythm (alias)
-   `rhythm-y-{rhythm_scale_index}` Vertical rhythm
-   `rhythm-x-{rhythm_scale_index}` Horizontal Rhythm

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

When the tailwind theme is composed, the rhythm scale is transformed to tailwindcss spacing scale so thereafter, can be used for all spacing utilities, margin, padding and grid-gap.

-   `mx-{rhythm_scale_index}` Margin X
-   `ml-{rhythm_scale_index}` Margin Left
-   `p-{rhythm_scale_index}` Padding
-   ...etc

By default compositor will use the same scale to extend the other tailwind sizing scales, width, min/max width and height min/max.

```
<section class="px-4 py-5">
  <h3 class="sans400 type-7/3 mb-4" />
  <input type="text" class="h-8 mb-4" />
  <button class="h-8 mb-px" />
  <p class="sans400i type-1/2" />
</section>

```

---

#### Dev Utils

-   `bg-baseline` Background grid lines.

```
<section class="bg-baseline" />
```

---

## Motivation

There is not right and wrong when it comes to artistic expression. And typography is just that. But when the purpose is to make a reading experience pleasing, consistent, predictable rhythm, between lines of text and layout elements is one proven method based on mathematical thinking.

#### High Fault Tolerance

Many design systems only provide a series of independent token collections, family, size, weight, style, line-height, letter-spacing that can be applied interchangeably.

In most cases that's working well, but in typography, the vast majority of these combinations don't produce useful results, or even worse don't exist at all.

For example, if we don't load a particular webfont, when a browser can't find the true bold or italic version of a font, will often create faux bold and italics by stretching and slanting the glyphs which renders the information uninteligible.

#### Undesirable White Space

Traditionally, in typography, space between lines of text is measured from the baseline. On the web, browsers behave differently and center vertically, the bounding box, or the distance from the ascender to the descender, to the line-height.

[Vertical Metrics Visualization](https://vertical-metrics.netlify.app)
<img src="https://github.com/a7sc11u/tailwind-compositor/raw/master/plugin/images/vertical-metrics.png" width="400"/>

As a result, when rendering text, the browser adds white-space above and below each line and block of text, unline any other dom element. So regardless of margin/padding and depending on the order of UI components, font, font-size and line-height the space between two elements, our rhythm is unpredictable and layout elements out of the intented position by `(ascent + abs(descent)) - lineHeight / 2`.

## Solution

Compositor at the core, attempts to solve these problems. The configuration is based on rational values that get transformed to css styles on build time. Using font metrics crops the white space around text, with a modified [basekick](https://github.com/michaeltaranto/basekick) recipe and implements a baseline grid system that allows us to anchor layout elements and lines of text, to a meaningful rhythm.

---

### Can i use it?

1. Depending on your typescale and number of webfonts, the output's filesize can be way beyond anything you should consider shipping. **You must use purgecss with this library.** For many use cases, such as personal blogs and minimal aesthetic, it should be fine.

2. Currently, the system should only work with horizontal text, but at this moment, it hasn't been tested thoroughly with non-latin characters. So if you're going to try it, please share your observations.

3. It should work with most fonts, but some fonts are poorly designed (some very popular too) and don't use the same vertical metrics to render text across browsers and operating systems. The error might be negligible in reading size, but in display sizes can result to a couple pixels off the baseline.

4. If you can't use it on production, compositor can be of value, as an educational or design and prototyping tool.

---

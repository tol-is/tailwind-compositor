# Tailwind Compositor

Compositor is a system of constraints designed to produce aesthetically pleasing, typographic compositions, based on objective, constant dimensions of space.

A baseline-grid typography system for [tailwindcss](https://tailwindcss.com/).

Algorithm Demo: [Styled Baseline](https://styled-baseline.netlify.app/)

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
const tailwindcss = require('tailwindcss');
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
module.exports = {
  // root unit
  root: 16,

  // baseline grid height in px units
  baseline: 8,

  // maximum leading
  leading: 4,

  // matrix max columns
  matrix: 4,

  // type scale in px units
  type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56, 60, 72],

  // spacing scale in baseline units
  rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],

  // line width in ch units
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
    },
    {
      key: 'sans-600',
      familyName: "Inter",
      fallback: 'sans-serif',
      file: path.resolve('./fonts/inter/Inter-Semibold.woff2'),
    },
  ],

  // compositor options
  options: {
    useRem: true,
    snap: true,
    type: true,
    rhythm: true,
    measure: true,
    matrix: true,
    xray: true,
  },
}
```

---

#### 1/9 - root: integer

The root font size, in `px` units.

---

#### 2/9 - baseline: integer

The baseline grid row height, in `px` units.

---

#### 3/9 - leading: integer

The maximum leading value in baseline units.

---

#### 4/9 - matrix: integer

The maximum columns on the matrix utility

---

#### 5/9 - type : array[integer]

```
type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56, 60, 72]
```

The system's typographic scale, in `px` units.

---

#### 6/9 - rhythm : array[integer]

```
rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]
```

The system's size and spacing scale, in `baseline` units, used for `rhythm`, `margin`, `padding`, `width/min/max`, `height/min/max` and `grid-gap` utilities

---

#### 7/9 - measure : array[integer]

```
measure: [10, 15, 20, 30, 35, 50, 55, 60, 65]
```

Separate scale used for `measure` (line-width) utilities, configured in `ch` units.

---

#### 8/9 - fonts : array[opentype]

The font scale provides all the information needed to render text styles. Each entry describes a font/weight/style set, and only those that are part of the system will be enabled.

The `file` property, is used to extract the vertical metrics dynamically from the font-file. If you want to configure the metrics manually, you can omit the `file` prop.

The `key` property is used to name the utility classes. The configuration bellow will produce four font styles. The recommended convention is `${family}-${weight}${style}`.

1. `font-sans-400` : Inter Regular
2. `font-sans-400i` : Inter Regular Italic
3. `font-sans-600i` : Inter Semibold
4. `font-sans-600i` : Inter Semibold Italic

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
  lineGap: 0,
  ascent: 2728,
  descent: -680
},
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

#### 9/9 - Options : object

Options properties, are used to enable/disable individual compositor utilities.

If `useRem` is set to true, compositor will use the root unit value, to transform all spacing and font-size utilities, to relative units. Line-height will be transformed to unitless ratios.

If `snap` is true, compositor will align each line text to the nearest baseline grid row, otherwise will trim the line-height above the capHeight and below the baseline, and apply a constant lineGap between lines of text.

-   `useRem: boolean` transform to relative units
-   `snap: boolean` Align text styles to a baseline grid
    `type: boolean` Enable typographic utilities
-   `rhythm: boolean` Enable rhythm utilities
-   `measure: boolean` Enable measure utilities
-   `matrix: boolean` Enable matrix utilities
-   `xray: boolean` Enable debug utilities

```
options: {
  useRem: true,
  snap: true,
  type: true,
  rhythm: true,
  measure: true,
  matrix: true,
  xray: true,
}
```

---

## Tailwind Utility Classes

#### 1/7 - Typography

##### Font & Font Style

-   font: `font-{font-key}`

```

// fonts: [
// { key: "sans-400", ... },
// { key: 'sans-400i', ... },
// { key: 'sans-600', ... },
// { key: 'sans-600i', ... },
// ],

// sans semibold italic
<h3 class="font-sans-600i" />

// sans regular
<p class="font-sans-400" />

// sans regular italic
<p class="font-sans-400i" />
```

##### Text Style

-   Text Style : `text-{type_scale_index}/{leading_baseline_units}`

```

// type: [16, 18, 20, 22, 24, 28, 30, 32, 40, 48, 56]

// sans semibold italic - 56px / leading 3
<h3 class="font-sans-600i text-10/3" />

// sans regular - 20px / leading 3
<p class="font-sans-400 text-2/3" />

// sans regular italic - 18px / leading 2
<p class="font-sans-400i text-1/2" />
```


---

#### 2/7 - Line Width

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

#### 3/7 - Spacing

When the tailwind theme is composed, the rhythm scale is transformed to tailwindcss spacing scale and can be used for all spacing utilities, margin, padding and grid-gap.

-   Margin: `m-{rhythm_scale_index}`
-   Margin Left: `ml-{rhythm_scale_index}`
-   Padding: `p-{rhythm_scale_index}`
-   ...etc

```

// rhythm: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]

<section class="px-4 py-5">
  <h3 class="sans400 text-7/3 mb-4" />
  <input type="text" class="h-8 mb-4" />
  <p class="sans400i text-1/2" />
</section>
```

---

#### 4/7 - Size

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

#### 5/7 - Lobotomized Owls

-   Vertical rhythm (alias): `rhythm-{rhythm_scale_index}`
-   Vertical rhythm: `rhythm-y-{rhythm_scale_index}`
-   Horizontal Rhythm: `rhythm-x-{rhythm_scale_index}`

```

<section class="rhythm-3 lg:rhythm-5" />
  <h3 class="sans400 text-7/3" />
  <p class="sans400 text-5/3" />

  // render horizontally
  <div class="flex flex-row rhythm-x-2" >
    <button />
    <button />
  </div>
</section>
```

---

#### 6/7 - Matrix Utils

##### Matrix
-   Matrix: `matrix-{columns_length}`
-   Matrix Gap: `matrix-gap-{rhythm_scale_index}`
-   Matrix Gap X: `matrix-gap-x-{rhythm_scale_index}`
-   Matrix Gap Y: `matrix-gap-y-{rhythm_scale_index}`

##### Cells
By default every child of the matrix, will be placed in the next available column and will span for 1 column. In many cases you might not need any cell utilities or only the `cell-span-x` utility.

-   Cell Start X: `cell-start-x-{columns_index}`
-   Cell Span X: `cell-span-x-{columns_index}`

---

#### 7/7 - Dev Utils

-   Background grid lines: `bg-baseline`

```
<section class="bg-baseline" />
```

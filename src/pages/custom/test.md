---
layout: layouts/single-page.njk
title: Hallooooooo
---

This challenge becomes even trickier when you don't know in advance which logos will be in your logo row.

## The Common Approach: Same Height for All

The most straightforward solution is to set all logos to the same height. Let's see how that looks.

> All the logos are wrapped in an additional div (.logo). This is because we want a plain block element without intrinsic sizing, which images with width and height attributes typically have. By setting the height on the outer div and giving the image a height of 100% and width of auto, we ensure consistent sizing across all logos.

```html
<div class="logo-row">
  <div class="logo" style="--width:49; --height: 48;">
    <img src="first-logo.svg" alt="" />
  </div>
  <div class="logo" style="--width:228; --height: 48;">
    <img src="second-logo.svg" alt="" />
  </div>
  ...more logos...
</div>
```

```scss
.logo-row {
  --base-height: 3rem;
  --scale-factor-horizontal: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem 2rem;
}

.logo {
  --base-ratio: calc(var(--width) / var(--height));
  aspect-ratio: var(--base-ratio);

  --factor-horizontal: min(
    var(--scale-factor-horizontal) * -1 * var(--base-ratio) + var(
        --scale-factor-horizontal
      ) + 1,
    1
  );
  height: max(
    var(--base-height) / 2,
    var(--base-height) * var(--factor-horizontal)
  );
}

.logo img {
  width: 100%;
  height: auto;
}
```

## Let's Plug in Some Numbers

- Aspect Ratio of 1: (-0.1 \* 1) + 1.1 = 1
- Aspect Ratio of 2: (-0.1 \* 2) + 1.1 = 0.9
- Aspect Ratio of 3: (-0.1 \* 3) + 1.1 = 0.8

![Random image](../../assets/images/blog/america.jpg)

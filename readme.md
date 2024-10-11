# Stimulus confetti

Are you in the mood to add confetti to your stimulus application? You're in luck! This package helps you do that in no-time.


![The easiest way to add confetti to your Stimulus JS app](school-pride.gif)

## Install

Add the package to your project.

```bash
yarn add stimulus-confetti
# or
npm install stimulus-confetti
```

## Register the stimulus controller

Register the controller in your Stimulus app.

```javascript
import { Confetti } from "stimulus-confetti"

application.register('confetti', Confetti)
```

## Use the DOM

```html
<a
  href="https://github.com/avo-hq/avo"
  target="_blank"
  data-controller="confetti"
  data-action="click->confetti#spray"
>Star Avo</a>
```

When you click that link, the confetti will spray and after the animation finishes, the browser will navigate to that location.

## Animation types

There are three types of animation. Note: actions should match animation values.

1. **Basic** which shoots of confetti under your mouse

```html
<a
  href="https://github.com/avo-hq/avo"
  target="_blank"
  data-controller="confetti"
  data-action="click->confetti#spray"
  data-confetti-animation-value="basic"
>Star Avo</a>
```

![](basic.gif)

2. **School pride** which adds two cannons on each side of the screen

```html
<a
  href="https://github.com/avo-hq/avo"
  target="_blank"
  data-controller="confetti"
  data-action="click->confetti#spray"
  data-confetti-animation-value="school-pride"
  data-confetti-duration-value="10"
  data-confetti-first-color-value="#CC0000"
  data-confetti-second-color-value="#0000FF"
>Star Avo</a>
```

![](school-pride.gif)

3. **Stars** which will spray stars from under your cursor

```html
<a
  href="https://github.com/avo-hq/avo"
  target="_blank"
  data-controller="confetti"
  data-action="click->confetti#spray"
  data-confetti-animation-value="stars"
>Star Avo</a>
```

![](stars.gif)

## Configuration

### `data-confetti-animation-value`

Values can be `basic`, `school-pride`, or `stars` and will change the type of animation.

Defaults to `basic`.

### `data-confetti-follow-value`

Controls whether at the end of the animation, the browser should follow the link. You can set it to `false` when you want to test the animation.

Defaults to `true`.

### `data-confetti-duration-value`

The duration, in seconds, for the **School pride** animation.

Defaults to `5`.

### `data-confetti-first-color-value`

The first color for the **School pride** animation.
Defaults to `#0886DE`

### `data-confetti-second-color-value`

The second color for the **School pride** animation.
Defaults to `#FF6154`

### `data-confetti-debug-value`

Controls wether log messages are being displayed in the console.

Defaults to `false`.

### `data-confetti-particleCount-value`, `data-confetti-startVelocity-value`, `data-confetti-spread-value`, and `data-confetti-ticks-value`

Controls various setting for the [`canvas-confetti`](https://github.com/catdad/canvas-confetti) package.

## Thanks

This package is based on the [`canvas-confetti`](https://github.com/catdad/canvas-confetti) package, so please [donate](https://github.com/sponsors/catdad) to help them and support their work.

## Other packages

- [`active_storage-blurhash`](https://github.com/avo-hq/active_storage-blurhash) - A plug-n-play [blurhash](https://blurha.sh/) integration for images stored in ActiveStorage
 - [`avo`](https://github.com/avo-hq/avo) - Build Content management systems with Ruby on Rails
 - [`class_variants`](https://github.com/avo-hq/class_variants) - Easily configure styles and apply them as classes. Very useful when you're implementing Tailwind CSS components and call them with different states.
 - [`prop_initializer`](https://github.com/avo-hq/prop_initializer) - A flexible tool for defining properties on Ruby classes.

## Try Avo ⭐️

If you enjoyed this gem try out [Avo](https://github.com/avo-hq/avo). It helps developers build Internal Tools, Admin Panels, CMSes, CRMs, and any other type of Business Apps 10x faster on top of Ruby on Rails.

[![](./logo-on-white.png)](https://github.com/avo-hq/avo)

# wallop
[![Build Status](https://travis-ci.org/peduarte/wallop.svg)](https://travis-ci.org/peduarte/wallop) [![npm version](https://badge.fury.io/js/wallop.svg)](http://badge.fury.io/js/wallop)

### Much more than just a slider
wallop is a minimal 4kb library for showing & hiding things.

> ❗️**Important note**️<br>
> Version 1 of *WallopSlider* is not compatible with version 2+.<br>
> If you are still using v1, please note that I am no longer supporting it.<br>
> Documentation, etc. has been moved to [this branch](https://github.com/peduarte/wallop/tree/v1).

## About
In a nutshell, wallop takes a collection of HTML elements and Previous & Next buttons, and adds helper HTML classes in the correct elements based on whether you want to navigate forwards or backwards.

It basically just add the right classes in the right places at the right time.

With those classes, you can do an infinite [number of things](#real-life-examples), controlling what's shown or hidden with CSS.

## Examples
- [Basic](http://codepen.io/peduarte/pen/pjzYpG) – This is wallop's most basic implementation
- [Fade animation](http://codepen.io/peduarte/pen/RWbORJ) – Using one of the [available animations](#adding-animations)
- [Custom pagination](http://codepen.io/peduarte/pen/bVbZLK) – Create your own pagination by levaragin the power of wallops' API and CustomEvents

I've created a collection on **[Codepen](http://codepen.io/collection/DQWmxZ/)** with a few more examples, go take a 👀!

## Benefits
- Mobile first
- Progressive enhancement
- Transitions/Animations are all in CSS
- Minimal JavaScript
- Flexible & Scalable
- Custom events and API available
- 4KB minified
- Dependency free

## Install
With npm

```bash
$ npm install wallop
```

With bower

```bash
$ bower install wallop
```

Download<br>
You can download the latest version or checkout all the releases [here](https://github.com/peduarte/wallop/releases).

## Usage
Once you have downloaded Wallop, the first thing you need to do is include the CSS and the JavaScript.

### CSS
```html
<head>
  <link rel="stylesheet" href="path/to/wallop.css">
</head>
```

### JavaScript
```html
<script src="path/to/Wallop.min.js"></script>
<script>
  var wallopEl = document.querySelector('.Wallop');
  var slider = new Wallop(wallopEl);
</script>
```

### commonJS
```js
  var Wallop = require('Wallop');
```

### ES6
```js
  import Wallop from 'Wallop';
```

### HTML
```html
<div class="Wallop">
  <div class="Wallop-list">
    <div class="Wallop-item">…</div>
    <div class="Wallop-item">…</div>
    <div class="Wallop-item">…</div>
    <div class="Wallop-item">…</div>
    <div class="Wallop-item">…</div>
  </div>
  <button class="Wallop-buttonPrevious">Previous</button>
  <button class="Wallop-buttonNext">Next</button>
</div>
```

>**#protip**<br>
>You can set the starting slide with a `.Wallop-item--current` class.

## Adding animations
Wallop has no animations by default, so if you want to animate the slides, you need to extend the default `.Wallop` class with an animation modifier and include the respective CSS into your HTML.<br>

I have created a few basic animations which are ready for you to use out-of-the-box, you will find them in the `/css` directory.

### Including animation CSS
```html
<head>
  <link rel="stylesheet" href="path/to/wallop.css">
  <link rel="stylesheet" href="path/to/wallop-animation.css">
</head>
```

### Extending with modifier
```html
<div class="Wallop Wallop--fade">
...
</div>
```

### Available animations
Here's a list of the available animation modifiers ready for you to use
- `Wallop--slide`
- `Wallop--fade`
- `Wallop--scale`
- `Wallop--rotate`
- `Wallop--fold`
- `Wallop--vertical-slide`

> **protip**<br>
> These animation helpers are especially helpful using if you are using wallop as a slider, but don't feel forced to use them, instead, feel free to take advantage of the classes wallop provides you with, and create you own! Like [these guys](http://london-housing.uk) did.

## Options
Here's a list of options you can pass to Wallop
- `buttonPreviousClass: 'Wallop-buttonPrevious'`
- `buttonNextClass: 'Wallop-buttonNext'`
- `itemClass: 'Wallop-item'`
- `currentItemClass: 'Wallop-item--current'`
- `showPreviousClass: 'Wallop-item--showPrevious'`
- `showNextClass: 'Wallop-item--showNext'`
- `hidePreviousClass: 'Wallop-item--hidePrevious'`
- `hideNextClass: 'Wallop-item--hideNext'`
- `carousel: true`

## API
Wallop offers a basic API for you to use, so you can control it from your own buttons or gestures.

### goTo(index)
This allows you to go to a specific slide index.
```js
var slider = document.querySelector('.Wallop');
var Wallop = new Wallop(slider);

// Go to 2nd slide
Wallop.goTo(1);
```
> **#protip**<br>
> index starts at 0 👌

### next()
This allows you to go to the next slide
```js
var slider = document.querySelector('.Wallop');
var Wallop = new Wallop(slider);

// Go to next slide
Wallop.next();
```

### previous()
This allows you to go to the previous slide
```js
var slider = document.querySelector('.Wallop');
var Wallop = new Wallop(slider);

// Go to previous slide
Wallop.previous();
```

## Events
Wallop dispatches a Custom Event everytime a slide changes, and it returns a `detail` object which contains the current slide index and the element you initiated Wallop with.

### Listening to a slide change
```js
var slider = document.querySelector('.Wallop');
var Wallop = new Wallop(slider);

Wallop.on('change', function(event) {
  // event.detail.wallopEl
  // => <div class="Wallop">…</div>

  // event.detail.currentItemIndex
  // => number
});
```

## Real life examples
- **[Google](http://www.google.com/trends/worldcup)** – uses wallop as a slideshow, transitioning the background colour and animating the hero image of each item
- **[Warp](http://warp.net/news/afx-following-global-premieres-you-can-now-hear-4-tracks-from-the-ep/?o=gallery&index=0)** – uses the power of wallop's API and Custom Events to control the items via the URL and to build a custom pagination
- **[London Housing Headlines](http://london-housing.uk)** – uses wallop to display a collection of really cool headlines about London's housing crisis 👍

If you are using wallop, please do let  me know by [creating an issue](https://github.com/peduarte/wallop/issues) and I'll make sure to add it to this list 👊

## Limitations
Due to its simplicity, wallop has a few limitations. For example, it is not possible to have the slide position animation based on gesture, or it's not possible to include physics based animations based on gesture momentum.

If you want a slider which provides all these options, I highly recommend David Desandro's [Flickity](http://flickity.metafizzy.co/).

## Contributing
Plese see [CONTRIBUTING.md](https://github.com/peduarte/wallop/blob/master/CONTRIBUTING.md) for more information.

## Licensing
MIT © 2015 [Pedro Duarte](http://pedroduarte.me)

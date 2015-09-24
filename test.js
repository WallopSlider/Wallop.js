'use restrict';

var Wallop = require('./js/Wallop');
var test = require('tape');

function createSlider(className, itemsTotal) {
  var $wallop = document.createElement('div');
  $wallop.classList.add(className);
  document.body.appendChild($wallop);

  var $wallopList = document.createElement('div');
  $wallopList.classList.add('Wallop-list');
  $wallop.appendChild($wallopList);

  for (var i = 0; i < itemsTotal; i++) {
    var $item = document.createElement('div');
    $item.classList.add('Wallop-item');
    $wallopList.appendChild($item);
  }

  var $wallopButtonPrevious = document.createElement('button');
  $wallopButtonPrevious.classList.add('Wallop-buttonPrevious');
  $wallop.appendChild($wallopButtonPrevious);

  var $wallopButtonNext = document.createElement('button');
  $wallopButtonNext.classList.add('Wallop-buttonNext');
  $wallop.appendChild($wallopButtonNext);
}


test('First item is currentItem if not specified in HTML', function(assert) {
  createSlider('Wallop1', 2);

  var slider = document.querySelector('.Wallop1');
  var wallop = new Wallop(slider);

  assert.equal(wallop.currentItemIndex, 0, 'correct');
  assert.end();
});

test('Button state on initialization when carousel option is disabled', function(assert) {
  createSlider('Wallop2', 3);

  var slider = document.querySelector('.Wallop2');
  var wallop = new Wallop(slider, { carousel: false });

  var previousButtonDisabled = slider.querySelector('.Wallop-buttonPrevious').disabled;

  assert.equal(previousButtonDisabled, true, 'correct button state');
  assert.end();
});

test('Clicking Next updates currentItemIndex', function(assert) {
  createSlider('Wallop3', 3);

  var slider = document.querySelector('.Wallop3');
  var wallop = new Wallop(slider);
  var index = wallop.currentItemIndex;

  wallop.next();

  index = wallop.currentItemIndex;

  assert.equal(index, 1, 'updated index');
  assert.end();
});

test('Go to specific item index', function(assert) {
  createSlider('Wallop4', 3);

  var slider = document.querySelector('.Wallop4');
  var wallop = new Wallop(slider);
  var index = wallop.currentItemIndex;

  wallop.goTo(1);

  index = wallop.currentItemIndex;

  assert.equal(index, 1, 'goTo works');
  assert.end();
});

test('Carousel is working', function(assert) {
  createSlider('Wallop5', 3);

  var slider = document.querySelector('.Wallop5');
  var wallop = new Wallop(slider);

  wallop.goTo(wallop.lastItemIndex);
  index = wallop.currentItemIndex;

  assert.equal(index, 2, 'went to last item index');

  wallop.next();
  index = wallop.currentItemIndex;
  assert.equal(index, 0, 'went to first item index from the last');
  var nextItem = wallop.allItemsArray[wallop.currentItemIndex];
  assert.equal(nextItem.classList.contains('Wallop-item--showNext'), true, 'carousel works forwards');

  wallop.previous();
  index = wallop.currentItemIndex;
  assert.equal(index, 2, 'went back to last item from first');
  var previousItem = wallop.allItemsArray[wallop.currentItemIndex];
  assert.equal(previousItem.classList.contains('Wallop-item--showPrevious'), true, 'carousel works backwards');
  assert.end();
});

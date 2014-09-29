/**
* wallopSlider.js
*
* @fileoverview Simple Slider Class
*
* @author Pedro Duarte
* @author http://pedroduarte.me
*
* @licence: http://opensource.org/licenses/MIT MIT
* @source: https://github.com/peduarte/wallop-slider
*/

//------------------------------------------------------------------------------------------------------------
var WallopSlider = WallopSlider || {};

WallopSlider = (function() {

  function Wallop(selector, options) {
    if (!selector) {
      throw new Error('selector missing, eg: new WallopSlider(".selector")');
    }

    this.options = {
      wSBtnPreviousClass: 'wallop-slider__btn--previous',
      wSBtnNextClass: 'wallop-slider__btn--next',
      wSItemClass: 'wallop-slider__item',
      wSCurrentItemClass: 'wallop-slider__item--current',
      wSShowPreviousClass: 'wallop-slider__item--show-previous',
      wSShowNextClass: 'wallop-slider__item--show-next',
      wSHidePreviousClass: 'wallop-slider__item--hide-previous',
      wSHideNextClass: 'wallop-slider__item--hide-next',
      wSCarousel: false
    };

    this.selector = selector;
    this.$selector = document.querySelector(this.selector);
    this.options = extend(this.options, options);
    this.event = null;



    // "Global vars"
    this.allItemsArray = Array.prototype.slice.call(document.querySelectorAll(this.selector + ' .' + this.options.wSItemClass));
    this.allItemsArrayLength = this.allItemsArray.length;
    this.currentItemIndex = this.allItemsArray.indexOf(document.querySelector(this.selector + ' .' + this.options.wSCurrentItemClass));
    this.buttonPrevious = document.querySelector(this.selector + ' .' + this.options.wSBtnPreviousClass);
    this.buttonNext = document.querySelector(this.selector + ' .' + this.options.wSBtnNextClass);

    this.bindEvents();
    this.createCustomEvent();
  }

  var WallopProto = Wallop.prototype;

  // Update prev/next readonly attribute
  WallopProto.updatePagination = function () {
    if ((this.currentItemIndex + 1) === this.allItemsArrayLength && this.options.wSCarousel !== true) {
      this.buttonNext.setAttribute('readonly', 'readonly');
    } else if (this.currentItemIndex === 0) {
      this.buttonPrevious.setAttribute('readonly', 'readonly');
    }
  };

  // Reset all settings by removing classes and attributes added by goTo() & updatePagination()
  WallopProto.removeAllHelperSettings = function () {
    removeClass(this.allItemsArray[this.currentItemIndex], this.options.wSCurrentItemClass);
    removeClass($$(this.options.wSHidePreviousClass)[0], this.options.wSHidePreviousClass);
    removeClass($$(this.options.wSHideNextClass)[0], this.options.wSHideNextClass);
    removeClass($$(this.options.wSShowPreviousClass)[0], this.options.wSShowPreviousClass);
    removeClass($$(this.options.wSShowNextClass)[0], this.options.wSShowNextClass);
    this.buttonPrevious.removeAttribute('readonly');
    this.buttonNext.removeAttribute('readonly');
  };

  // Method to add classes to the right elements depending on the index passed
  WallopProto.goTo = function (index) {
    index = Number(index - 1);
    if (index >= this.allItemsArrayLength || index < 0 || index === this.currentItemIndex) { return; }

    this.removeAllHelperSettings();

    addClass(this.allItemsArray[this.currentItemIndex], index > this.currentItemIndex ? this.options.wSHidePreviousClass : this.options.wSHideNextClass);
    addClass(this.allItemsArray[index], this.options.wSCurrentItemClass + ' ' + (index > this.currentItemIndex ? this.options.wSShowNextClass : this.options.wSShowPreviousClass));

    this.currentItemIndex = index;

    this.updatePagination();

    // Update event currentItemIndex property and dispatch it
    this.event.detail.currentItemIndex = this.currentItemIndex;
    this.$selector.dispatchEvent(this.event);
  };

  // Callback for when previous button is clicked
  WallopProto.onPreviousButtonClicked = function () {
    this.goTo((this.currentItemIndex + 1) - 1);
  };

  // Callback for when next button is clicked
  WallopProto.onNextButtonClicked = function () {
    if(this.currentItemIndex + 1 === this.allItemsArrayLength && this.options.wSCarousel === true) {
      this.goTo(1);
    } else {
      this.goTo((this.currentItemIndex + 1) + 1);
    }
  };

  // Attach click handlers
  WallopProto.bindEvents = function () {
    var _this = this;
    this.buttonPrevious.addEventListener('click', function () { _this.onPreviousButtonClicked(); });
    this.buttonNext.addEventListener('click', function () { _this.onNextButtonClicked(); });
  };

  // Method so it is nicer for the user to use custom events
  WallopProto.on = function (eventName, callback) {
    if (eventName !== 'change') {
      throw new Error('the only available event is "change"');
    }

    this.$selector.addEventListener(eventName, function(event) {
      return callback(event);
    }, false);
  };

  // Create custom Event
  WallopProto.createCustomEvent = function () {
    var _this = this;
    this.event = new CustomEvent('change', {
      detail: {
        parentSelector: _this.selector,
        currentItemIndex: Number(_this.currentItemIndex)
      },
      bubbles: true,
      cancelable: true
    });
  };



  /**
   * Helper functions
   */

  function $$(element) {
    if (!element) { return; }
    return document.getElementsByClassName(element);
  }

  function addClass(element, className) {
    if (!element) { return; }
    element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
  }

  function removeClass(element, className) {
    if (!element) { return; }
    element.className = element.className.replace(className, '');
  }

  function extend(origOptions, userOptions){
    var extendOptions = {}, attrname;
    for (attrname in origOptions) { extendOptions[attrname] = origOptions[attrname]; }
    for (attrname in userOptions) { extendOptions[attrname] = userOptions[attrname]; }
    return extendOptions;
  }

  // Pollyfill for CustomEvent() Constructor - thanks to Internet Explorer
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.CustomEvent.prototype;
  window.CustomEvent = CustomEvent;

  return Wallop;

})();

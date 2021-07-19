"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

jQuery(function () {
  smoothScroll(), burger(), date(), spaceSlider(), initTabs(), slickSlide(), reviewsSlide();
});

function smoothScroll() {
  $("nav").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 800);
  });
}

function burger() {
  $('.mobile_menu div').on('click', function () {
    $('.mobile_menu div').toggleClass('active');
    $('.mobile_menu nav').toggleClass('open');
    $('.mobile_menu nav ul').toggleClass('show');
    $('body').toggleClass('lock');
  });

  for (var a = 1; a <= $(".mobile_menu ul li").length; a++) {
    $(".mobile_menu ul li:nth-child(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
  }

  $('.menu a').on('click', function () {
    $('.burger').toggleClass('active');
    $('.menu').toggleClass('open');
    $('.menu ul').toggleClass('show');
    $('body').toggleClass('lock');
  });
}

function date() {
  var datepicker = $("#datepicker").datepicker({});
  datepicker.change(function (e) {
    var dateValue = transformToMounthDate(e.target.value);
    datepicker.val(dateValue);
  });
}

;

function transformToMounthDate(date) {
  var mounths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dateArr = date.split('/');
  var transformDate;
  mounths.forEach(function (el, ind) {
    if (+dateArr[0] === ind + 1) {
      transformDate = "".concat(dateArr[1], " ").concat(el, " ").concat(dateArr[2]);
    }
  });
  return transformDate;
}

function spaceSlider() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      1440: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 60
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 60
      }
    },
    runCallbacksOnInit: true,
    on: {
      slideChange: function slideChange() {
        var currentSlide = this.realIndex + 1;
        document.querySelector('.current-slide').innerHTML = '0' + currentSlide;
      },
      paginationRender: function paginationRender() {
        var totalSlides = document.getElementsByClassName('swiper-pagination-bullet').length;
        document.querySelector('.total-slides').innerHTML = '0' + totalSlides;
        var currentSlide = this.realIndex + 1;
        document.querySelector('.current-slide').innerHTML = '0' + currentSlide;
      }
    }
  });
}

function initTabs() {
  var tabset = jQuery('.tabset').tabset({
    tabLinks: 'a',
    defaultTab: true,
    addToParent: true
  });

  var tabsChildrens = _toConsumableArray(tabset[0].children);

  var totalCount = tabsChildrens.length;
  var visualPagination = document.querySelector('.visual-pagination-tabs');

  for (var i = 0; i < totalCount; i++) {
    visualPagination.insertAdjacentHTML('beforeend', "<li></li>");
  }

  var visualElements = _toConsumableArray(visualPagination.children);

  var curTab;
  checkCurrent();
  tabset[0].addEventListener('click', checkCurrent);

  function checkCurrent() {
    visualElements.forEach(function (el) {
      return el.classList.remove('active');
    });
    setTimeout(function () {
      tabsChildrens.forEach(function (el, idx) {
        if (el.classList.contains('active')) {
          curTab = idx + 1;
          visualElements[idx].classList.add('active');
          showTotalCounter('.tab-counter', curTab, totalCount);
        }
      });
    }, 10);
  }
}

function showTotalCounter(selector, current, total) {
  var wrap = document.querySelector(selector);
  wrap.querySelector('.current-tab').textContent = '0' + current;
  wrap.querySelector('.total-tab').textContent = '0' + total;
}

function Tabset($holder, options) {
  this.$holder = $holder;
  this.options = options;
  this.init();
}

Tabset.prototype = {
  init: function init() {
    this.$tabLinks = this.$holder.find(this.options.tabLinks);
    this.setStartActiveIndex();
    this.setActiveTab();

    if (this.options.autoHeight) {
      this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
    }

    this.makeCallback('onInit', this);
  },
  setStartActiveIndex: function setStartActiveIndex() {
    var $classTargets = this.getClassTarget(this.$tabLinks);
    var $activeLink = $classTargets.filter('.' + this.options.activeClass);
    var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
    var activeIndex;

    if (this.options.checkHash && $hashLink.length) {
      $activeLink = $hashLink;
    }

    activeIndex = $classTargets.index($activeLink);
    this.activeTabIndex = this.prevTabIndex = activeIndex === -1 ? this.options.defaultTab ? 0 : null : activeIndex;
  },
  setActiveTab: function setActiveTab() {
    var self = this;
    this.$tabLinks.each(function (i, link) {
      var $link = $(link);
      var $classTarget = self.getClassTarget($link);
      var $tab = $($link.attr(self.options.attrib));

      if (i !== self.activeTabIndex) {
        $classTarget.removeClass(self.options.activeClass);
        $tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
      } else {
        $classTarget.addClass(self.options.activeClass);
        $tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
      }

      self.attachTabLink($link, i);
    });
  },
  attachTabLink: function attachTabLink($link, i) {
    var self = this;
    $link.on(this.options.event + '.tabset', function (e) {
      e.preventDefault();

      if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
        self.activeTabIndex = i;
        self.switchTabs();
      }

      if (self.options.checkHash) {
        location.hash = jQuery(this).attr('href').split('#')[1];
      }
    });
  },
  resizeHolder: function resizeHolder(height) {
    var self = this;

    if (height) {
      this.$tabHolder.height(height);
      setTimeout(function () {
        self.$tabHolder.addClass('transition');
      }, 10);
    } else {
      self.$tabHolder.removeClass('transition').height('');
    }
  },
  switchTabs: function switchTabs() {
    var self = this;
    var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
    var $nextLink = this.$tabLinks.eq(this.activeTabIndex);
    var $prevTab = this.getTab($prevLink);
    var $nextTab = this.getTab($nextLink);
    $prevTab.removeClass(this.options.activeClass);

    if (self.haveTabHolder()) {
      this.resizeHolder($prevTab.outerHeight());
    }

    setTimeout(function () {
      self.getClassTarget($prevLink).removeClass(self.options.activeClass);
      $prevTab.addClass(self.options.tabHiddenClass);
      $nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
      self.getClassTarget($nextLink).addClass(self.options.activeClass);

      if (self.haveTabHolder()) {
        self.resizeHolder($nextTab.outerHeight());
        setTimeout(function () {
          self.resizeHolder();
          self.prevTabIndex = self.activeTabIndex;
          self.makeCallback('onChange', self);
        }, self.options.animSpeed);
      } else {
        self.prevTabIndex = self.activeTabIndex;
      }
    }, this.options.autoHeight ? this.options.animSpeed : 1);
  },
  getClassTarget: function getClassTarget($link) {
    return this.options.addToParent ? $link.parent() : $link;
  },
  getActiveTab: function getActiveTab() {
    return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
  },
  getTab: function getTab($link) {
    return $($link.attr(this.options.attrib));
  },
  haveTabHolder: function haveTabHolder() {
    return this.$tabHolder && this.$tabHolder.length;
  },
  destroy: function destroy() {
    var self = this;
    this.$tabLinks.off('.tabset').each(function () {
      var $link = $(this);
      self.getClassTarget($link).removeClass(self.options.activeClass);
      $($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
    });
    this.$holder.removeData('Tabset');
  },
  makeCallback: function makeCallback(name) {
    if (typeof this.options[name] === 'function') {
      var args = Array.prototype.slice.call(arguments);
      args.shift();
      this.options[name].apply(this, args);
    }
  }
};

$.fn.tabset = function (opt) {
  var args = Array.prototype.slice.call(arguments);
  var method = args[0];
  var options = $.extend({
    activeClass: 'active',
    addToParent: false,
    autoHeight: false,
    checkHash: false,
    defaultTab: true,
    animSpeed: 500,
    tabLinks: 'a',
    attrib: 'href',
    event: 'click',
    tabHiddenClass: 'js-tab-hidden'
  }, opt);
  options.autoHeight = options.autoHeight;
  return this.each(function () {
    var $holder = jQuery(this);
    var instance = $holder.data('Tabset');

    if (_typeof(opt) === 'object' || typeof opt === 'undefined') {
      $holder.data('Tabset', new Tabset($holder, options));
    } else if (typeof method === 'string' && instance) {
      if (typeof instance[method] === 'function') {
        args.shift();
        instance[method].apply(instance, args);
      }
    }
  });
};

function slickSlide() {
  var gallerySlider = $('.gallery_slider');
  gallerySlider.slick({
    appendArrows: '.gallery_arrows_wrap',
    slidesToShow: 3,
    prevArrow: '<span class="gallery_prev"> </span>',
    nextArrow: '<span class="gallery_next"> </span>',
    responsive: [{
      breakpoint: 2660,
      settings: {
        slidesToShow: 6
      }
    }, {
      breakpoint: 1920,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  var initialFirstSliderEl = document.querySelectorAll('.slick-active')[1];

  if (initialFirstSliderEl) {
    initialFirstSliderEl.classList.add('slick-preview');
    gallerySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var previewSlides = _toConsumableArray(document.querySelectorAll('.slick-preview'));

      previewSlides.forEach(function (el) {
        return el.classList.remove('slick-preview');
      });
    });
    gallerySlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var firstActiveSlide = document.querySelectorAll('.slick-active')[1];
      firstActiveSlide.classList.add('slick-preview');
    });
  }
}

function reviewsSlide() {
  $('.reviews_slider').slick({
    appendArrows: '.reviews_arrows_wrap',
    slidesToScroll: 1,
    slidesToShow: 3.4,
    dots: true,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 769,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 320,
      settings: {
        slidesToShow: 1
      }
    }],
    prevArrow: '<span class="reviews_prev"> </span>',
    nextArrow: '<span class="reviews_next"> </span>'
  });
}
//# sourceMappingURL=main.js.map

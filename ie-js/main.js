'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
    var slider = function () {
        function slider() {
            var _this = this;

            _classCallCheck(this, slider);

            this._slidesDesktop = ['img/slider/desktop/slide-1.png', 'img/slider/desktop/slide-2.png', 'img/slider/desktop/slide-3.png'];
            this._slidesTablet = ['img/slider/tablet/slide-1.png', 'img/slider/tablet/slide-2.png', 'img/slider/tablet/slide-3.png'];
            this._slidesMobile = ['img/slider/mobile/slide-1.png', 'img/slider/mobile/slide-2.png', 'img/slider/mobile/slide-3.png'];
            this._nextSlide = 0;
            this._currentSlide = 0;
            this._intervalFunction;
            this._slideContainer = document.getElementById('slides');
            this._slideContainer.addEventListener('click', function (event) {
                if (event.target.type === 'button') {
                    if (event.target.id === 'btnPrev') {
                        _this._nextSlide = _this._currentSlide - 1 === -1 ? 2 : _this._currentSlide - 1;
                    }
                    _this.setImage(_this.getImageUrl(), _this._currentSlide);
                    _this.clearIntervalFunction();
                    _this.startSlider();
                } else {
                    if ((_this._nextSlide - 1) % 2 === 0) {
                        location.href = 'catalog.html';
                    } else {
                        location.href = 'item.html';
                    }
                }
            });

            this.setImage(this.getImageUrl(), this._currentSlide);
        }

        _createClass(slider, [{
            key: 'changeSlide',
            value: function changeSlide(nextSlide) {
                this._nextSlide = nextSlide;
                this.setImage(this.getImageUrl(), this._currentSlide);
                this.clearIntervalFunction();
                this.startSlider();
            }
        }, {
            key: 'getImageUrl',
            value: function getImageUrl() {
                var slide = '';
                this._currentSlide = this._nextSlide;
                if (document.documentElement.clientWidth > 1024) {
                    slide = this._slidesDesktop[this._nextSlide];
                } else if (document.documentElement.clientWidth > 768) {
                    slide = this._slidesTablet[this._nextSlide];
                } else {
                    slide = this._slidesMobile[this._nextSlide];
                }
                if (this._nextSlide === 2) {
                    this._nextSlide = 0;
                } else {
                    this._nextSlide++;
                }
                return slide;
            }
        }, {
            key: 'startSlider',
            value: function startSlider() {
                var _this2 = this;

                this._intervalFunction = setInterval(function () {
                    _this2.setImage(_this2.getImageUrl(), _this2._currentSlide);
                }, 2000);
            }
        }, {
            key: 'clearIntervalFunction',
            value: function clearIntervalFunction() {
                clearInterval(this._intervalFunction);
            }
        }, {
            key: 'setImage',
            value: function setImage(imgUrl, slideIndex, callback) {
                this._slideContainer.style.background = 'url(\'' + imgUrl + '\') center center no-repeat';
                this._slideContainer.style.backgroundSize = 'cover';
                changeSliderButtonClassName(slideIndex);
            }
        }]);

        return slider;
    }();

    var slider_ = new slider();
    slider_.startSlider();
    var buttons = document.getElementsByClassName('slider-nav-button');

    var _loop = function _loop(i) {
        buttons[i].addEventListener('click', function () {
            slider_.changeSlide(i);
            changeSliderButtonClassName(i);
        });
    };

    for (var i = 0; i < buttons.length; i++) {
        _loop(i);
    }

    function changeSliderButtonClassName(indexActiveBtn) {
        var buttons = document.getElementsByClassName('slider-nav-button');
        for (var i = 0; i < 3; i++) {
            if (i === indexActiveBtn) {
                buttons[i].className += ' active';
            } else {
                buttons[i].className = 'slider-nav-button';
            }
        }
    }

    var menuBtn = document.getElementById('menuBtn');
    var isOpenMenu = false;
    menuBtn.addEventListener('click', function () {
        var menu = document.getElementsByClassName('mobile-group')[0];
        if (isOpenMenu) {
            menu.className = 'mobile-group';
        } else {
            menu.className += ' active-menu';
        }
        isOpenMenu = !isOpenMenu;
    });
});
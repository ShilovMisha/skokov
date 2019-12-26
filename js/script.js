$(document).ready(function() {
//https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}


//Открытие меню ввиде модуля
(function(window){
    var App = window.App || {};

    function Toggle(){
        this.data = {};
    };

    Toggle.prototype.add = function(button, modal){
        this.data.button = button;
        this.data.modal = modal;
        find.bind(this)();
    }
    Toggle.prototype.modificator = function(button, modal){
        this.mod = {};
        this.mod[this.data.button] = button;
        this.mod[this.data.modal] = modal || button; 
    }
    function find(){
        this.button = {};
        this.modal = {};
        this.button = document.querySelector(this.data.button);
        this.modal = document.querySelector(this.data.modal);
        this.btnClass = this.button.className.split([" "]).find(function(e){
            if (this.data.button.match(e)){
                return e;
            }
         }.bind(this));
        this.modalClass = this.modal.className.split([" "]).find(function(el){
            if (this.data.modal.match(el)){
                return el;
            }
         }.bind(this));
    
        this.button.addEventListener('click', onClick.bind(this));
    }
    function onClick(evt){
        evt.preventDefault();
        evt.currentTarget.classList.toggle((this.btnClass + this.mod[this.data.button]));
       this.modal.classList.toggle((this.modalClass + this.mod[this.data.modal]));
  }

  
    App.Toggle = Toggle;
    window.App = App;
}(window));

var toggle = new App.Toggle();
toggle.add('.header__nav-toggle','.header__nav-list');
toggle.modificator('--open', '--open');




var carousel;
$(document).ready(function () {
    carousel = $(".about-us__our-clients-slider ul");
    if (carousel.length) {
        carousel.itemslide({ 
          left_sided: true
        });
    }

});

//slow anchor
var $page = $('html, body');
$('a[href^="#"]:not([href="#"])').click(function() {
		$page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 40
    	}, 400);
   	 	return false;
});


//link only #
var $misLinks = $('[href="#"]');

$('a[href="#"]').click(function(evt) {
	evt.preventDefault();
})


//validation
var validator =  new FormValidator('example_form', [{
    name: 'skokov-name',
    display: 'Name',
    rules: 'required|callback_alphamy'
},{
  name: 'skokov-email',
  display: 'Email',
  rules: 'required|valid_email'
},
{
  name: 'skokov-message',
  display: 'Message',
  rules: 'required'
}], function(errors, evt) {

    var SELECTOR_ERRORS = $('.error_box'),
        SELECTOR_SUCCESS = $('.success_box');

    if (errors.length > 0) {
        SELECTOR_ERRORS.empty();

        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            SELECTOR_ERRORS.append(errors[i].message + '<br />');
        }

        SELECTOR_SUCCESS.css({ display: 'none' });
        SELECTOR_ERRORS.fadeIn(200);
    } else {
        SELECTOR_ERRORS.css({ display: 'none' });
        SELECTOR_SUCCESS.fadeIn(200);
    }

    if (evt && evt.preventDefault) {
        evt.preventDefault();
    } else if (event) {
        event.returnValue = false;
    }
});
validator.setMessage('numeric', 'Поле %s должно содержать только цифры.');
validator.setMessage('required', 'Поле %s обязательно к заполнению.');


validator.registerCallback('alphamy', function(value) {
	var reg = /[A-zА-яЁё]/;
	if (reg.test(value)) {
		
        return true;
    }
    return false;
})
.setMessage('alphamy', 'Поле %s должно содержать только буквы.');


//noscript extract
var noscript = document.querySelectorAll('noscript');

var header = document.querySelector('.header');
for (var i = 0; i < noscript.length; i++){
	var tempElement = document.createElement('div');
	

	tempElement.innerHTML = noscript[i].textContent||noscript[i].innerHTML;
	var tempPicture = tempElement.querySelector('picture:only-child');
	if (tempPicture) {
		var tempSource = tempPicture.querySelectorAll('source');
	if (tempSource) {
		for (var j = 0; j < tempSource.length; j++){
			tempSource[j].dataset.srcset = tempSource[j].getAttribute('srcset');
			tempSource[j].removeAttribute('srcset');
		}
	}
	var tempImage = tempPicture.querySelector('img');
  if(tempImage.getAttribute('srcset')) {
    tempImage.dataset.srcset = tempImage.getAttribute('srcset');
  }
	
	tempImage.dataset.src = tempImage.getAttribute('src');
	tempImage.removeAttribute('srcset');
	tempImage.removeAttribute('src');
    if (tempPicture){
      noscript[i].parentNode.insertBefore(tempPicture, noscript[i]);
    }
	}
}
/////////////////////////////////////////////////////////////
//ForEach для IE
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}

var lazyLoad = function(){
	if ('IntersectionObserver' in window){
	
	function lazyLoadPicture(element){
		  element.forEach(function(change) {
		 	
		
		
    
    if(change.isIntersecting) {
      	//для всех элементов с dataset-src
		if (change.target.dataset.src) {
			change.target.src = change.target.dataset.src;
			change.target.removeAttribute('data-src');
		}
		////////////////////////
		//для всех элементов с <img dataset-src='' dataset-srcset=''> внутри
		var picture = change.target.querySelector('img');
		if (picture){
				if (picture.dataset.src) {
				picture.src = picture.dataset.src;
				picture.removeAttribute('data-src');
			}
			if (picture.dataset.srcset) {
				picture.srcset = picture.dataset.srcset;
				picture.removeAttribute('data-srcset');
			}
		}
		
		//для всех элементов с <source dataset-srcset=''> внутри
		var sources = change.target.querySelectorAll('source');
		for (var j = 0; j < sources.length; j++){
			if (sources[j]){
				if (sources[j].dataset.srcset) {
					sources[j].srcset = sources[j].dataset.srcset;
					sources[j].removeAttribute('data-srcset');
				}
			}
			
		}
    }
  });
	}

		var options = {
	  threshold: [0],
	   rootMargin: '100px'
	};

	var watchMe = new IntersectionObserver(lazyLoadPicture, options);
	//установить обсервер для picture
	var pictures = document.querySelectorAll('picture');
	for (var i = 0; i < pictures.length; i++) {
		var picImg = pictures[i].querySelector('img');
		if (picImg) {
			if (picImg.dataset){
				if (picImg.dataset.src){
					watchMe.observe(pictures[i]);
				}
			}
		}	
	}
	//установить обсервер для iframe
	var iframes = document.querySelectorAll('iframe:not([src])');
	if (iframes){
		for (var i = 0; i < iframes.length; i++) {

			watchMe.observe(iframes[i]);	
		}
	}
}
}



//Инклюды для IE
var body = document.querySelector("body");
var html = document.querySelector("html");
var scriptElement = document.createElement('script');
if (!('IntersectionObserver' in window)){
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/intersection-observer.js";
	
	body.appendChild(currentElement);

currentElement.onload = function() {
 	setTimeout(lazyLoad, 10);
};
	
} else lazyLoad();

var loadFallback = function () {
	if (html.classList.contains('no-picture')){

	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/picturefill.min.js";
	
	body.appendChild(currentElement);
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/pf.mutation.min.js";
	body.appendChild(currentElement);
	}
}
setTimeout(loadFallback, 10);	
});
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

// //animate
// var button = document.querySelector('.main-nav__toggle');
// var modal = document.querySelector('.main-nav__list');
// var $modal = $('.main-nav__list');
// var menuItem = modal.querySelectorAll('.main-nav__item');
// var $menuItems = $('.main-nav__item');
// button.addEventListener('click', function(){
	
// 	if (button.classList.contains("main-nav__toggle--open")) {

// 		 $modal.css({'animation-direction' : 'initial', 'display':'flex'});
// 		button.style = "font-weight: normal;"
// 		$modal.addClass('animated fadeInDown faster');
// 		$menuItems.addClass('animated flipInY faster');
				
// 	} else {

// 		$modal.css({'animation-direction' : 'reverse', 'display':'flex'});
// 		button.style = "font-weight: bold;"
// 		$modal.addClass('animated fadeInDown faster');
// 	}
	
// });

// $modal.on("animationend transitionend webkitAnimationEnd oanimationend MSAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd", function(){
// 	$modal.removeClass('animated fadeInDown faster fadeInUp');
// 	$menuItems.removeClass('animated flipInY faster');
// 	if (button.classList.contains("main-nav__toggle--open")) {
// 	} else {

// 	$modal.css({'display' : 'none'});
// 	}});




// var ssss = function(){return ((i*2 + 1)/100 + (2/10)) + "s;"}

// for (var i=0; i < $menuItems.length; i++) {
// 	$menuItems[i].style = "animation-delay:" + ((i*2 + 1)/100 + (2/10)) + "s;"
// }





//wow ourteam item delay
// var item = document.querySelectorAll('.our-team__item');

// for (var i = 0; i < item.length; i++) {
// 	item[i].querySelector('.our-team__avatar-wrapper').setAttribute('data-wow-delay', (i + 1)/10 + "s;");
// }
//all title wow

// var titles = document.querySelectorAll('[class*=title]');
// for (var i = 0; i < titles.length; i++ ){
// 	titles[i].classList.add('wow', 'pulse');
// }


// price list events 
// var list = document.querySelector(".subscription__price-list");
// var items = list.children;

// var additional = document.querySelector(".subscription__additional");

// var priceItemOnClick = function(evt){
	


// 	var curElem = list.querySelector('.subscription__price-item--current');
// 	if ([].slice.call(items).indexOf(this) > 1) {
// 		// list.insertBefore(this, curElem);
// 		list.appendChild(list.replaceChild(this, curElem));
// 		for (var i = 0; i < items.length; i++) {
// 			items[i].classList.remove('subscription__price-item--current');


// 			items[i].style.cssText = "animation-name: fadeIn; animation-duration: 0.5s !important;";

// 			//additional.classList.remove('wow','fadeInUp');
// 			$(additional).removeClass('wow fadeInUp');
// 			additional.style.cssText = "animation-name: fadeIn; animation-duration: 0.5s !important;";

// 		}
// 		this.classList.add('subscription__price-item--current');
// 	}
// 	if ([].slice.call(items).indexOf(this) < 1) {
// 		list.insertBefore(list.replaceChild(this, curElem), this);
// 		for (var i = 0; i < items.length; i++) {
// 			items[i].classList.remove('subscription__price-item--current');
// 			items[i].style.cssText = "animation-name: fadeIn; animation-duration: 0.5s !important;";

// 			//additional.classList.remove('wow','fadeInUp');
// 			$(additional).removeClass('wow fadeInUp');
// 			additional.style.cssText = "animation-name: fadeIn; animation-duration: 0.5s !important;";
// 		}
// 		this.classList.add('subscription__price-item--current');
// 	}

// }
// additional.addEventListener('animationend', function(){
// 	additional.setAttribute('style','');
// })
// $(additional).on("animationend transitionend webkitAnimationEnd oanimationend MSAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd", function(){
// 			additional.setAttribute('style','');
// 	});
// for (var i=0; i < items.length; i++) {
// 	items[i].addEventListener('click', priceItemOnClick);
// }

//change count subscription__duration-list
// var durList = document.querySelector('.subscription__duration-list');
// var durLinks = durList.querySelectorAll('.subscription__duration-link');

// var durOnClick = function(evt){
// 	evt.preventDefault();
// 	for (var i=0; i < durLinks.length; i++) {
// 		durLinks[i].classList.remove('subscription__duration-link--current');
// 	}
// 	this.classList.add('subscription__duration-link--current');
// }
// for (var i = 0; i < durLinks.length; i++) {
// 	durLinks[i].addEventListener('click', durOnClick);
// }


//slider

// var sliderModule = function(list, items, btnGrp, btnNext, btnPrevious, smBlockItemCount){
// 	var ourList = document.querySelector(list);
// 	var ourItems = ourList.querySelectorAll(items);;

// 	var btnGroup = document.querySelector(btnGrp);
// 	var nextButton = document.querySelector(btnNext);
// 	var previousButton = document.querySelector(btnPrevious);



// 	var checkBtnAttr = function(evt){
// 		if ((window.getComputedStyle(document.body, ':after').getPropertyValue('content') == '"sm"') || 
// 			(window.getComputedStyle(document.body, ':after').getPropertyValue('content') == '"lg"')){
				
// 				for (var i = 0; i < ourItems.length; i++) {
// 				if (ourItems[i] == ourList.querySelector(items + '--current')) {
// 					if ((i + smBlockItemCount) >= ourItems.length) {
// 						nextButton.setAttribute('disabled', '');
// 					} else nextButton.removeAttribute('disabled', '');
// 				}
// 			}
// 		} else {
// 			if (ourList.querySelector(items +  ':last-of-type') === ourList.querySelector(items + '--current')){
			
// 				nextButton.setAttribute('disabled', '');
// 			} else nextButton.removeAttribute('disabled', '');
// 		}
		

// 		if (ourList.querySelector(items +  ':first-of-type') === ourList.querySelector(items + '--current')){
			
// 			previousButton.setAttribute('disabled', '');
// 		} else previousButton.removeAttribute('disabled', '');


		
// 	};
// 	var onClickNext = function(){

// 		if (ourList.querySelector(items +  ':last-of-type') !== ourList.querySelector(items + '--current')) {
			
// 			for (var i = 0; i < ourItems.length; i++) {

// 				if (ourItems[i].classList.contains(items.slice(1) + '--current')) {
// 					ourItems[i + 1].classList.add(items.slice(1) + '--current');
// 					ourItems[i].classList.remove(items.slice(1) + '--current');
// 					break;
// 				}
				
// 			}
			
// 		}
// 	}
// 	var onClickPrevious = function(){
// 		if (ourList.querySelector(items +  ':first-of-type') !== ourList.querySelector(items + '--current')) {
// 			for (var i = 0; i < ourItems.length; i++) {

// 				if (ourItems[i].classList.contains(items.slice(1) + '--current')) {
// 					ourItems[i - 1].classList.add(items.slice(1) + '--current');
// 					ourItems[i].classList.remove(items.slice(1) + '--current');
// 					break;
// 				}
				
// 			}
			
// 		}
// 	}
// 	btnGroup.addEventListener('click', checkBtnAttr);
// 	nextButton.addEventListener('click', onClickNext);
// 	previousButton.addEventListener('click', onClickPrevious);
// }
// sliderModule('.reviews__list','.reviews__item','.reviews__slider-controls','.reviews__slider-button--next','.reviews__slider-button--previous', 2);
// sliderModule('.our-team__list','.our-team__item','.our-team__slider-controls','.our-team__slider-button--next','.our-team__slider-button--previous', 3);
// /////////////////////////////////////////////////////////////
// //no-grid fallback

// if (document.querySelector('.no-cssgrid')) {
// 	var noGridContainer = document.querySelector('.trends__no-grid');
// 	var itemsGrid = document.querySelector('.trends-item:first-child').children;
// 	for (var i = 0; itemsGrid[i]; i++){
// 		noGridContainer.appendChild(itemsGrid[i].cloneNode(true));
	
// 	}
	
// }




//slow anchor
var $page = $('html, body');
$('a[href^="#"]:not([href="#"])').click(function() {
		$page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 40
    	}, 400);
   	 	return false;
});



// //all links and buttons hover wow
// var link = document.querySelectorAll('.hoverEffect a, .hoverEffect button');
// var funcs = function(evt){
// 	$(this).addClass('animated pulse faster');
// 	this.style = "animation-duration: 0.2s"
// 	$(this).on("animationend transitionend webkitAnimationEnd oanimationend MSAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd", function(){
// 			$(this).removeClass('animated pulse faster');
// 	});
// 	// 
// }
// for (var i=0; i < link.length; i++) {
	
// 	link[i].addEventListener('mouseover', funcs);
	
// }
// ////////////////////////////////////////////////////////////
// //progress bar scroll
// window.onscroll = function() {myFunction()};

// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("myBar").style.width = scrolled + "%";
// }
// //to top scroll
// $(function() {
 
// 	$(window).scroll(function() {
	 
// 	if($(this).scrollTop() != 0) {
	 
// 	$('#toTop').fadeIn();
	 
// 	} else {
	 
// 	$('#toTop').fadeOut();
	 
// 	}
	 
// 	});
	 
// 	$('#toTop').click(function() {
	 
// 	$('body,html').animate({scrollTop:0},400);
	 
// 	});
	 
// 	});
// //
// //link only #
// var $misLinks = $('[href="#"]');

// $('a[href="#"]').click(function(evt) {
// 	evt.preventDefault();
// })


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

    /*
     * DO NOT COPY AND PASTE THIS CALLBACK. THIS IS CONFIGURED TO WORK ON THE DOCUMENTATION PAGE ONLY.
     * YOU MUST CUSTOMIZE YOUR CALLBACK TO WORK UNDER YOUR ENVIRONMENT.
     */

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
			// tempSource[j].dataset.srcset = tempSource[j].srcset;	
			tempSource[j].dataset.srcset = tempSource[j].getAttribute('srcset');
			tempSource[j].removeAttribute('srcset');
		}
	}
	var tempImage = tempPicture.querySelector('img');
	// tempImage.dataset.srcset = tempImage.srcset;
	tempImage.dataset.srcset = tempImage.getAttribute('srcset');
	// tempImage.dataset.src = tempImage.src;
	tempImage.dataset.src = tempImage.getAttribute('src');
	tempImage.removeAttribute('srcset');
	tempImage.removeAttribute('src');
	if (tempPicture){
		noscript[i].parentNode.insertBefore(tempPicture, noscript[i]);
	}
	}
	// ieContainer.appendChild(tempElement);
	
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
$(document).ready(function() {
	//Меню бургер
	$('.header__burger').click(function(event) {
		$('.header__burger, .header__menu').toggleClass('active');
		$('body').addClass('locked');
	});
	$('.content').click(function(event) {
		$('.header__burger, .header__menu').removeClass('active');
		$('body').removeClass('locked');
	});
	//Слайдеры
	$('.first-screen-slider').slick({
		arrows:true,
		dots:false,
		adaptiveHeight:false,
		slidesToShow:1,
		slidesToScroll:1,
		speed:1000,
		easing: 'ease',
		infinite:false,
		initialSlide:0,
		autoplay:false,
		autoplaySpeed:2000,
		pauseOnFocus:true,
		pauseOnHover:true,
		pauseOnDotsHover:false,
		draggable:false,
		swipe:false,
		touchThreshold:10,
		touchMove:false,
		waitForAnimate:false,
		centerMode:false,
	});
	$('.projects-slider').slick({
		arrows:false,
		dots:false,
		adaptiveHeight:false,
		slidesToShow:3,
		slidesToScroll:1,
		speed:1000,
		easing: 'ease',
		infinite:false,
		initialSlide:0,
		autoplay:false,
		autoplaySpeed:2000,
		pauseOnFocus:true,
		pauseOnHover:true,
		pauseOnDotsHover:false,
		draggable:true,
		swipe:true,
		touchThreshold:10,
		touchMove:false,
		waitForAnimate:false,
		centerMode:false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow:2
				}
			},{
				breakpoint: 550,
				settings: {
					slidesToShow:1
				}
			}
		],
	});
});

//Плавный переход до блока
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
	anchor.addEventListener("click", function(event) {
		event.preventDefault();
		const blockID = anchor.getAttribute('href')
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
}

// Модальные окна
const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches (css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();


//Анимация
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			}else{
				if(!animItem.classList.contains('_anim-no-hide'))
				animItem.classList.remove('_active');
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	animOnScroll();
}
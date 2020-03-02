
const LARGE_WIDTH = 992;
const TABLET_WIDTH = 600;

function getWidth() {
	let devicePixelRatio = window.devicePixelRatio || 1;
	return screen.width * devicePixelRatio;
}

function isMobile() {
	if(getWidth() < LARGE_WIDTH)
		return true;
	return false;
}

function scrollToID(id) {
	(document.getElementById(id)).scrollIntoView({behavior:"smooth"});
}

function gotoOrigin() {
	window.scrollTo(0,0);
}

function getFirstByClass(className) {
	return document.getElementsByClassName(className)[0];
}

function isOnScreen(element) {	
	let rect = element.getBoundingClientRect();
	let top = rect.top;
	let bot = rect.bottom;

    if(bot > 0 && top < window.innerHeight /2)
        return true;
    return false;
}

function slideTo(element, position) {
	element.style.top = position + 'px';
}

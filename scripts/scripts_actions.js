
const DELAY_APPEAR_GLASS = 10;
const MENU_SLIDE_TIME = 600;
const GLASS_HIDING_TIME = MENU_SLIDE_TIME + 600;
const UNLOCK_AFTER_MENU_HIDING_DELAY = GLASS_HIDING_TIME + 100;

let focused = null;
let locked = false;
let fadeLocked = false;

function isVisible(element) {
	return element.classList.contains(CLASS_VISIBLE)
}

function isInvisible(element) {
	return element.classList.contains(CLASS_INVISIBLE)
}

function setVisible(element) {
    element.setAttribute("class", CLASS_VISIBLE);
    if(isInvisible(element))
        element.classList.remove(CLASS_INVISIBLE);
}

function setInvisible(element) {
    element.setAttribute("class", CLASS_INVISIBLE);
    if(isVisible(element))
        element.classList.remove(CLASS_VISIBLE);
}

function showMenu() {    
    if(fadeLocked)
		return;
    
    if(!isVisible(glass)) {
        fadeLocked = true;
        
        glass.style.display = 'block';
        appearGlass();
                	
		window.setTimeout(
			function() {
				setVisible(glass);
				slideTo(mobileNav, menuSlideVisible)
                fadeLocked = false;
			},
			MENU_SLIDE_TIME
		);
    }
}

function hideMenu() {
	if(fadeLocked)
		return;
	
	if(!isInvisible(glass)) {
        fadeLocked = true;
		slideTo(mobileNav, menuSlideHidden)
        disappearGlass();        
			
		window.setTimeout (
			function ()	{
				setInvisible(glass);
			},
			GLASS_HIDING_TIME
		);
		
		window.setTimeout (
			function () {
				glass.style.display = 'none';
				fadeLocked = false;
			},
			UNLOCK_AFTER_MENU_HIDING_DELAY
		);
	}
}

function appearGlass() {
    window.setTimeout(
        function() {
            glass.style.opacity = '1';
        },
        DELAY_APPEAR_GLASS
    );
}

function disappearGlass() {
    window.setTimeout (
        function () {
            glass.style.opacity = '0';
        },
		MENU_SLIDE_TIME
    );
}

function switchAction(switchElement) {
	locked = true;			
	focusLink(switchElement);			
	switchTarget = switchElement.getAttribute(ATTR_TARGET);			
	scrollToID(switchTarget);			
}

function waitForUnlock() {
	let currentBoard = document.getElementById(getCurrentTarget());	
	if(isOnScreen(currentBoard))
		locked = false;
}

function onScrollAction() {
	hideMenu();
	
	if(locked) {
		waitForUnlock();
		return;
	}
	
	let menuItemClass;    
	if(mobileScreen)
		menuItemClass = CLASS_MOBILE_MENU_ITEM;
	else
		menuItemClass = CLASS_LARGE_MENU_ITEM;
	
	let menuItems = document.getElementsByClassName(menuItemClass);
	
	for(let i = 0; i < menuItems.length; i++)
	{
		let target = document.getElementById(menuItems[i].getAttribute(ATTR_TARGET));
					
		if(isOnScreen(target)) {
			if(focused == null) {
				menuItems[i].className += " " + CLASS_CURRENT;
				focused = menuItems[i];
			}
		} else {
			menuItems[i].classList.remove(CLASS_CURRENT);
		
			if(document.getElementsByClassName(CLASS_CURRENT).length == 0)
				focused = null;
			else
				focused = document.getElementsByClassName(CLASS_CURRENT)[0];
		}
	}
}

function assignOnScrollAction() {
	window.onscroll = function() {
		onScrollAction();
	};
}

function afterLoadAction() {
    initProperties();
    setElements();
	buildPageContent();
    calculateVariables();
	gotoOrigin();
	assignOnScrollAction();
	configureMobileMenu();	
}

document.addEventListener("DOMContentLoaded", afterLoadAction());

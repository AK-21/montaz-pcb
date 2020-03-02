
const SLIDE_MODIFIER = 10;
const MENUITEM_PADDING_TABLET = 6;
const MENUITEM_PADDING_PHONE = 12;

const ID_HEADER = "page-header";
const ID_GLASS = "mobile-nav-glass";
const ID_LARGE_MENU = "switches-menu";
const ID_MOBILE_NAV = "mobile-nav";
const ID_MOBILE_MENU = "mobile-menu";
const ID_HOLES = "holes-bar";
const ID_BOARDS = "boards";

const CLASS_VISIBLE = "visible";
const CLASS_INVISIBLE = "invisible";
const CLASS_BOARD = "board";
const CLASS_CONTENT = "content";
const CLASS_LARGE_MENU_ITEM = "label";
const CLASS_MOBILE_MENU_ITEM = "component";
const CLASS_CURRENT = "current";
const CLASS_HOLE = "hole";
const CLASS_IMG = "image";

const ATTR_TARGET = "data-target";

let glass;
let mobileNav;
let mobileMenu;
let largeMenu;
let boardsSection;

let menuSlideHidden;
let menuSlideVisible;

let mobileScreen;

function initProperties() {
    mobileScreen = isMobile();
}

function setElements() {
    glass = document.getElementById(ID_GLASS);
    mobileNav = document.getElementById(ID_MOBILE_NAV);
    mobileMenu = document.getElementById(ID_MOBILE_MENU);
    largeMenu = document.getElementById(ID_LARGE_MENU);
    boardsSection = document.getElementById(ID_BOARDS);
}

function calculateVariables() {
    menuSlideHidden = mobileNav.offsetTop - (mobileNav.offsetHeight + SLIDE_MODIFIER);
    menuSlideVisible = 0;
}

function getCurrentTarget() {
	return getFirstByClass(CLASS_CURRENT).getAttribute(ATTR_TARGET);
}

function createDOMElement(elementType, className) {
	let element = document.createElement(elementType);
	element.setAttribute("class", className);
	return element;
}
		
function createBoardSection() {
	return createDOMElement("section", CLASS_BOARD);
}
		
function createBoardContent() {
	return createDOMElement("article", CLASS_CONTENT);
}
		
function createDiv(className) {
	return createDOMElement("div", className);
}

function createAnchor(id) {
	return "item_"+id;
}

function createMenuItem(className, index) {
    let a = document.createElement("a");
    a.setAttribute("class", className);
	a.setAttribute("onclick", "switchAction(this)");
	a.setAttribute("data-target", createAnchor(index));
    a.innerHTML = getHeader(index);
    let item = document.createElement("li");
    item.appendChild(a);
    return item;
}

function createLinkToChapter(index) {
	largeMenu.appendChild(
        createMenuItem(CLASS_LARGE_MENU_ITEM, index)
    );    
    mobileMenu.appendChild(
        createMenuItem(CLASS_MOBILE_MENU_ITEM, index)
    );
}

function printMenu() {
	for(let i = 0; i < countItems(); i++)
		createLinkToChapter(i);
}

function setTitle() {
    document.title = title;
    document.getElementById(ID_HEADER).innerHTML = title;
}

function createChapterHeader(index) {
	let header = document.createElement("h2");
	header.innerHTML = getHeader(index);
	return header;
}

function createImgParagraph(paragraphString) {
	let arr = extractImageParagraph(paragraphString);
	
	let p = document.createElement("span");
	p.setAttribute("class", CLASS_IMG);
	
	let img = document.createElement("img");
	img.src = arr[IMG_PATH_INDEX];
	p.appendChild(img);
				
	if(arr[IMG_DESCRIPTION_INDEX].length > 0) {
		let imgDescr = document.createElement("p");
		imgDescr.innerHTML = arr[IMG_DESCRIPTION_INDEX];
		p.appendChild(imgDescr);
	}	
	return p;
}

function createTextParagraph(paragraphString) {
	let p = document.createElement("p");
	p.innerHTML = paragraphString;
	return p;
}

function createContentInsideContainer(container, paragraphsStringsArray) {
	paragraphsStringsArray.forEach (
		function(paragraphString) {
            let p;
			if(hasImagePrefix(paragraphString))
				p = createImgParagraph(paragraphString);
			else
				p = createTextParagraph(paragraphString);				
			container.appendChild(p);
		}
	);
}

function createBoard(index) {
	let board = createBoardSection();
	board.setAttribute("id", createAnchor(index));

	let inside = createBoardContent();

	header = createChapterHeader(index);	
	inside.appendChild(header);

	let paragraphs = getParagraphsArray(index);
	createContentInsideContainer(inside, paragraphs)
	
	board.appendChild(inside);
	boardsSection.appendChild(board);
}
		
function printArticles() {
	for(let i = 0; i < countItems(); i++)
		createBoard(i);
}

function buildPageContent() {
	createContent();
    setTitle();
	printMenu();
	printArticles();
}

function configureMobileMenu() {
    let items = document.getElementsByClassName(CLASS_MOBILE_MENU_ITEM);
    let initialPadding;
    
    if(getWidth() < TABLET_WIDTH)
		initialPadding = MENUITEM_PADDING_PHONE;
	else
		initialPadding = MENUITEM_PADDING_TABLET;
    
    let height = 0;
    let length = items.length;	
	let heightArray = new Array(length);
    
    for(let i = 0; i < length; i++) {
		let otherHeight = items[i].offsetHeight;
		heightArray[i] = otherHeight;
		if(otherHeight > height)
			height = otherHeight;
	}
    
    for(let i = 0; i < length; i++)	{
        let item = items[i];
        item.style.height = height + 'px';
        let padding = (height - heightArray[i]) /2 + initialPadding;
		item.style.paddingTop = padding + 'px';
		item.style.paddingBottom = padding + 'px';
    }
    
    createHoles(length);
    slideTo(mobileNav, menuSlideHidden);
    glass.setAttribute("class", CLASS_INVISIBLE);
}

function createHoles(count) {
    let holesBar = document.getElementById(ID_HOLES);	
	holesBar.style.height = mobileMenu.offsetHeight + 'px';
    
    let holeHeight = mobileMenu.offsetHeight / count;
	
	for(let i = 0; i < count; i++)	{
		let hole = document.createElement("div");
		hole.setAttribute("class", CLASS_HOLE);
		hole.style.height =  holeHeight + 'px';
		holesBar.appendChild(hole);
	}
}

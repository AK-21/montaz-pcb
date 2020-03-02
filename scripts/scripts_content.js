
const HEADER = 0;
const PARAGRAPHS = 1;
		
const IMG_PREFIX = "#IMG";
const IMG_SEPARATOR = "|";

const IMG_PATH_INDEX = 0;
const IMG_DESCRIPTION_INDEX = 1;

let pageContentArray = new Array;
let chapters;
let title;

function countItems() {
	return pageContentArray.length;
}

function getHeader(index) {
	return pageContentArray[index][HEADER];
}

function getParagraphsArray(index) {
	return pageContentArray[index][PARAGRAPHS];
}

function addContent(header, paragraphsArray) {
	pageContentArray.push([header, paragraphsArray])
}

function defocusAllLinks() {
	let links = document.getElementsByClassName(CLASS_CURRENT);
	for(let i = 0; i < links.length; i++)
		(links[i]).classList.remove(CLASS_CURRENT);
}

function focusLink(element) {
	defocusAllLinks();
	element.className += " " + CLASS_CURRENT;
}

function hasImagePrefix(imgParagraphString) {
	return imgParagraphString.search(IMG_PREFIX) == 0;
}

function extractImageParagraph(imgParagraphString) {
	let data = new Array(2);    
	let split = imgParagraphString.indexOf(IMG_SEPARATOR);

	if(split == -1)	{
		data[IMG_PATH_INDEX] = imgParagraphString.substring(IMG_PREFIX.length);
		data[IMG_DESCRIPTION_INDEX] = "";
	} else {
		data[IMG_PATH_INDEX] = imgParagraphString.substring(IMG_PREFIX.length, split);
		data[IMG_DESCRIPTION_INDEX] = imgParagraphString.substring(split + IMG_SEPARATOR.length);
	}	
	return data;
}


function createContent() {    
    let data = getContent();
    
    title = data.title;    
    let chapters = data.chapters;
    
    for(let i = 0; i < chapters.length; i++)
        addContent(chapters[i].header, chapters[i].paragraphs);
}

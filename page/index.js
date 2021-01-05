/* eslint-env browser */
/* global MetadataFilter */

const filters = [
	MetadataFilter.getSpotifyFilter(),
	MetadataFilter.getYoutubeFilter(),
];

const filterInputExamples = [
	[
		'Nevermind - Remastered',
		'Fever - Oklou Remix',
		"Just Can't Get Enough - Live in Hammersmith",
	],
	[
		'Scattered Sprites (Official Music Video)',
		'If I Get High (Official Video)',
		'Watercolour (Live at Rock Am Ring 2010)',
	],
];

function main() {
	setupEventListeners();
	fillTextInput();
}

function setupEventListeners() {
	const filterButtonEl = document.getElementById('filter-button');
	filterButtonEl.addEventListener('click', onFilterButtonClicked);

	const selectFilterEl = document.getElementById('filter');
	selectFilterEl.addEventListener('change', fillTextInput);
}

function fillTextInput() {
	const filterIndex = getSelectedFilterIndex();
	const inputExample = getInputExample(filterIndex);

	setInputTextValue(inputExample);
}

function onFilterButtonClicked() {
	const filterIndex = getSelectedFilterIndex();
	const filter = getFilter(filterIndex);

	filterInput(filter);
}

function filterInput(filter) {
	const inputText = getInputTextValue();

	if (!inputText) {
		alert('You should input the text to filter');
		return;
	}

	const filteredText = filter.filterField('track', inputText);
	alert(filteredText);
}

function getSelectedFilterIndex() {
	const selectFilterEl = document.getElementById('filter');
	return selectFilterEl.selectedIndex;
}

function getFilter(filterIndex) {
	return filters[filterIndex];
}

function getInputExample(filterIndex) {
	const examples = filterInputExamples[filterIndex];
	return examples[Math.floor(Math.random() * examples.length)];
}

function getInputTextValue() {
	const inputTextEl = document.getElementById('input-text');
	return inputTextEl.value;
}

function setInputTextValue(value) {
	const inputTextEl = document.getElementById('input-text');
	inputTextEl.value = value;
}

main();

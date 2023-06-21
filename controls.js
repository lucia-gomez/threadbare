let distortionSlider;
let numRowsSlider;
let numSegmentsSlider;
let strokeWeightSlider;

let colorPickerStart;
let colorPickerEnd;
let colorPickerBg;

let geometryCheckbox;

let resetButton;
let menuOpen = false;
let textColor = "#ffffff";

function toggleMenu() {
	const menu = document.getElementById("menu");
	if (!menuOpen) {
		menu.style.width = "250px";
		menu.style.height = "300px";
	} else {
		menu.style.width = "100px";
		menu.style.height = "32px";
	}
	menuOpen = !menuOpen;
}

function createControls() {
	createSliders();
	createColorPickers();
	createCheckboxes();
}

function appendSlider(label, min, max, value) {
	const controlMenu = document.getElementById("controls");
	const sliderRow = document.createElement("div");
	sliderRow.className = "control-row";

	const labelTag = document.createElement("label");
	labelTag.setAttribute("for", label);
	labelTag.innerText = label;
	sliderRow.appendChild(labelTag);

	const slider = createSlider(min, max, value);
	slider.elt.name = label;
	sliderRow.appendChild(slider.elt);

	controlMenu.appendChild(sliderRow);
	return slider;
}

function createSliders() {
	numRowsSlider = appendSlider("Rows", 1, 100, 50);
	strokeWeightSlider = appendSlider("Thickness", 1, 6, 4);
	numSegmentsSlider = appendSlider("Detail", 2, 50, 20);
	distortionSlider = appendSlider("Amplitude", 5, 100, 50);
	cursorSizeSlider = appendSlider("Cursor", 50, 200, 50);
}

function createColorPickers() {
	const menu = document.getElementById("menu");
	const controlMenu = document.getElementById("color-controls");

	colorPickerStart = createColorPicker("#2e8cbf");
	controlMenu.appendChild(colorPickerStart.elt);

	colorPickerEnd = createColorPicker("#119c5b");
	controlMenu.appendChild(colorPickerEnd.elt);

	colorPickerBg = createColorPicker("#042836");
	controlMenu.appendChild(colorPickerBg.elt);
	colorPickerBg.elt.oninput = (e) => {
		menu.style.backgroundColor = e.target.value + "cc";
		const newTextColor = getTextColor(e.target.value);
		menu.style.color = newTextColor;
		textColor = newTextColor;
	};
}

// https://stackoverflow.com/a/12043228
function getTextColor(bgColor) {
	var c = bgColor.substring(1); // strip #
	var rgb = parseInt(c, 16); // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff; // extract red
	var g = (rgb >> 8) & 0xff; // extract green
	var b = (rgb >> 0) & 0xff; // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
	return luma > 170 ? "#000000" : "#ffffff";
}

function createCheckboxes() {
	const controlMenu = document.getElementById("controls");
	const checkboxRow = document.createElement("div");
	checkboxRow.className = "control-row";

	const labelTag = document.createElement("label");
	labelTag.setAttribute("for", "geometry");
	labelTag.innerText = "Show Geometry";
	checkboxRow.appendChild(labelTag);

	geometryCheckbox = createCheckbox(false);
	geometryCheckbox.elt.name = "geometry";
	checkboxRow.appendChild(geometryCheckbox.elt);

	controlMenu.appendChild(checkboxRow);
}

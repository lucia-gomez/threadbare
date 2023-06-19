let distortionSlider;
let numRowsSlider;
let segmentWidthSlider;

let colorPickerStart;
let colorPickerEnd;
let colorPickerBg;

let resetButton;
let menuOpen = false;

function toggleMenu() {
	if (!menuOpen) {
		const openHeightAnim = document.getElementById("openHeight");
		const openWidthAnim = document.getElementById("openWidth");
		openHeightAnim.beginElement();
		openWidthAnim.beginElement();
	} else {
		const closeHeightAnim = document.getElementById("closeHeight");
		const closeWidthAnim = document.getElementById("closeWidth");
		closeHeightAnim.beginElement();
		closeWidthAnim.beginElement();
	}
	menuOpen = !menuOpen;
}

function createControls() {
	createSliders();
	createColorPickers();
}

function createSliders() {
	textSize(15);
	distortionSlider = createSlider(5, 100, 30);
	distortionSlider.position(20, 10);
	distortionSlider.elt.id = "distortionSlider";

	numRowsSlider = createSlider(1, 100, 50);
	numRowsSlider.position(20, 50);

	segmentWidthSlider = createSlider(2, 50, 20);
	segmentWidthSlider.position(20, 90);
}

function drawSliderLabels() {
	noStroke();
	text(
		"Distortion",
		distortionSlider.x * 2 + distortionSlider.width,
		distortionSlider.y + distortionSlider.height
	);
	text(
		"Rows",
		numRowsSlider.x * 2 + numRowsSlider.width,
		numRowsSlider.y + numRowsSlider.height
	);
	text(
		"Detail",
		segmentWidthSlider.x * 2 + segmentWidthSlider.width,
		segmentWidthSlider.y + segmentWidthSlider.height
	);
}

function createColorPickers() {
	colorPickerStart = createColorPicker("#2e8cbf");
	colorPickerStart.position(300, 10);

	colorPickerEnd = createColorPicker("#119c5b");
	colorPickerEnd.position(350, 10);

	colorPickerBg = createColorPicker("#042836");
	colorPickerBg.position(400, 10);
}

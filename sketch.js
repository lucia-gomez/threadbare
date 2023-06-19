let segments = [];
let isDrawing = true;
let prevMouseX = 0;
let prevMouseY = 0;

let HEIGHT, WIDTH;

function resetDrawing() {
	background(color(colorPickerBg.value()));
	segments = [];
	for (let r = 0; r < numRowsSlider.value(); r++) {
		let prev = new Segment(r, 0, null);
		for (let c = 1; c <= segmentWidthSlider.value(); c++) {
			const newSegment = new Segment(r, c, prev);
			segments.push(newSegment);
			prev = newSegment;
		}
	}
}

function setup() {
	HEIGHT = document.body.clientHeight;
	WIDTH = document.body.clientWidth;

	createCanvas(WIDTH, HEIGHT);
	createControls();

	strokeWeight(4);
	resetDrawing();
}

function draw() {
	background(color(colorPickerBg.value()));

	const distortion = distortionSlider.value() / 100;

	segments.forEach((segment) => {
		if (isDrawing && segment.isTouching(mouseX, mouseY)) {
			let xDiff = prevMouseX - mouseX;
			let yDiff = prevMouseY - mouseY;
			segment.update(
				segment.x - xDiff * distortion,
				segment.y - yDiff * distortion
			);
		}
		segment.draw();
	});

	drawSliderLabels();
	prevMouseX = mouseX;
	prevMouseY = mouseY;
}

function mousePressed() {
	isDrawing = false;
}

function mouseReleased() {
	isDrawing = true;
}

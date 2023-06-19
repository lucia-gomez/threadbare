let rows = [];
let isDrawing = true;
let prevMouseY = 0;

let HEIGHT, WIDTH;

function genRow(r) {
	const row = [];
	let prev = null;
	for (let c = 0; c <= segmentWidthSlider.value(); c++) {
		const newSegment = new Segment(r, c, prev);
		row.push(newSegment);
		prev = newSegment;
	}
	return row;
}

function resetDrawing() {
	background(color(colorPickerBg.value()));
	rows = [];
	for (let r = 0; r < numRowsSlider.value(); r++) {
		rows[r] = genRow(r);
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
	updateRows();

	rows.forEach((row) => {
		row.slice(1).forEach((segment) => {
			if (isDrawing && !menuOpen && segment.isTouching(mouseX, mouseY)) {
				let yDiff = prevMouseY - mouseY;
				segment.move(-1 * yDiff * distortion);
			}
			segment.draw();
		});
	});

	prevMouseY = mouseY;
}

function updateRows() {
	const newNumRows = numRowsSlider.value();
	if (newNumRows === rows.length) {
		return;
	}

	if (newNumRows < rows.length) {
		rows = rows.slice(0, newNumRows);
	} else if (newNumRows > rows.length) {
		for (let r = rows.length; r < newNumRows; r++) {
			rows[r] = genRow(r);
		}
	}
	rows.forEach((row) => row.forEach((segment) => segment.updateRow()));
}

function mousePressed() {
	isDrawing = false;
}

function mouseReleased() {
	isDrawing = true;
}

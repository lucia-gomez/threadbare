let rows = [];
let isDrawing = true;
let isLocked = false;
let prevMouseY = 0;

let HEIGHT, WIDTH;

function genRow(r, numSegments = numSegmentsSlider.value()) {
	const row = [];
	let prev = null;
	for (let c = 0; c <= numSegments; c++) {
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
	document.addEventListener(
		"touchmove",
		function (e) {
			e.preventDefault();
		},
		{ passive: false }
	);

	HEIGHT = document.body.clientHeight;
	WIDTH = document.body.clientWidth;

	createCanvas(WIDTH, HEIGHT);
	createControls();
	strokeWeight(strokeWeightSlider.value());
	noFill();
	resetDrawing();

	// can draw under the menu nub, but not the expanded menu
	const menuElement = select("#menu");
	menuElement.mouseOver(() => {
		isDrawing = !menuOpen;
	});
	menuElement.mouseOut(() => {
		isDrawing = true;
	});
}

function draw() {
	background(color(colorPickerBg.value()));
	strokeWeight(strokeWeightSlider.value());

	const distortion = distortionSlider.value() / 100;
	updateRows();
	updateSegments();

	rows.forEach((row) => {
		row.slice(1).forEach((segment) => {
			if (isDrawing && !isLocked && segment.isTouching(mouseX, mouseY)) {
				let yDiff = prevMouseY - mouseY;
				segment.move(-1 * yDiff * distortion);
			}
			segment.draw();
		});
	});

	if (geometryCheckbox.checked()) {
		rows.forEach((row) => {
			row.slice(1).forEach((segment) => segment.drawGeometry());
		});
	}

	prevMouseY = mouseY;
}

function updateRows() {
	const newNumRows = numRowsSlider.value();
	if (newNumRows === rows.length) {
		return;
	}

	if (newNumRows < rows.length) {
		rows = rows.slice(0, newNumRows);
	} else {
		for (let r = rows.length; r < newNumRows; r++) {
			rows[r] = genRow(r);
		}
	}
	rows.forEach((row) => row.forEach((segment) => segment.updateRow()));
}

function updateSegments() {
	const newNumSegments = numSegmentsSlider.value();
	if (newNumSegments === rows[0].length - 1) {
		return;
	}

	for (let r = 0; r < rows.length; r++) {
		let row = rows[r];
		if (newNumSegments < row.length - 1) {
			rows[r] = row.slice(0, newNumSegments + 1);
		} else {
			for (let c = row.length; c <= newNumSegments; c++) {
				let newSegment = new Segment(r, c, row[row.length - 1]);
				row.push(newSegment);
			}
		}
		rows[r].forEach((segment) => segment.updateCol());
	}
}

function mousePressed() {
	isDrawing = false;
}

function mouseReleased() {
	isDrawing = true;
}

function keyTyped() {
	if (key === "s" || key === "S") {
		save();
	} else if (key === "x" || key === "X") {
		resetDrawing();
	} else if (key === "h" || key === "H") {
		toggleMenu();
	} else if (key === "l" || key === "L") {
		toggleLock();
	}
	return false;
}

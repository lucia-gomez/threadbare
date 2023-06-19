class Segment {
	constructor(row, col, prev) {
		this.row = row;
		this.col = col;
		this.prev = prev; // null if initial point in row
		this.originalY = this.calculateRow();

		this.x = (WIDTH / segmentWidthSlider.value()) * col;
		this.y = this.originalY;
		this.centerX = (this.x + (this.prev?.x ?? this.x)) / 2;
		this.centerY = (this.y + (this.prev?.y ?? this.y)) / 2;
		this.offsetY = 0;
	}

	calculateRow() {
		return (HEIGHT / numRowsSlider.value()) * (0.5 + this.row);
	}

	updateRow() {
		this.originalY = this.calculateRow();
		this.move(0);
	}

	draw() {
		if (this.prev == null) return;

		const strokeColor = lerpColor(
			color(colorPickerStart.value()),
			color(colorPickerEnd.value()),
			this.row / numRowsSlider.value()
		);
		stroke(strokeColor);
		line(this.prev.x, this.prev.y, this.x, this.y);
	}

	drawGeometry() {
		strokeWeight(1);
		stroke(textColor);
		line(this.prev.x, this.prev.y, this.x, this.y);
		circle(this.x, this.y, 5);
		strokeWeight(strokeWeightSlider.value());
	}

	move(y) {
		const newY = this.originalY + this.offsetY + y;
		if (abs(this.originalY - newY) > 100) return;
		if (this.col === segmentWidthSlider.value()) return;

		this.offsetY += y;
		this.y = newY;
		this.centerY = (this.y + (this.prev?.y ?? this.y)) / 2;
	}

	isTouching(mouseX, mouseY) {
		return (
			dist(mouseX, mouseY, this.centerX, this.centerY) <=
			(WIDTH * 0.5) / segmentWidthSlider.value()
		);
	}
}

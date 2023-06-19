class Segment {
	constructor(row, col, prev) {
		this.row = row;
		this.col = col;
		this.prev = prev;
		this.originalX = (WIDTH / segmentWidthSlider.value()) * col;
		this.originalY = (HEIGHT / numRowsSlider.value()) * (0.5 + row);
		this.update(this.originalX, this.originalY);
	}

	draw() {
		if (this.prev == null) {
			return;
		}

		const strokeColor = lerpColor(
			color(colorPickerStart.value()),
			color(colorPickerEnd.value()),
			this.row / numRowsSlider.value()
		);
		stroke(strokeColor);
		line(this.prev.x, this.prev.y, this.x, this.y);
	}

	update(x, y) {
		if (dist(x, y, this.originalX, this.originalY) > 100) return;
		this.x = x;
		this.y = y;
		this.centerX = (this.x + (this.prev?.x ?? this.x)) / 2;
		this.centerY = (this.y + (this.prev?.y ?? this.y)) / 2;
	}

	isTouching(mouseX, mouseY) {
		return (
			dist(mouseX, mouseY, this.centerX, this.centerY) <=
			(WIDTH * 0.5) / segmentWidthSlider.value()
		);
	}

	highlight() {
		this.stroke = true;
	}

	unhighlight() {
		this.stroke = false;
	}
}

class Field {
  static #markerColor = "#FFC882";

  #canvas;
  #ctx;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  paintBackground() {
    this.#ctx.fillStyle = "black";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  paintMarkers() {
    const ctx = this.#ctx;

    const width = this.#canvas.width;
    const height = this.#canvas.height;
    
    const center = height / 2;
    const middle = width / 2;

    const lineLength = height / 20;
    const radius = width * 0.1;

    ctx.lineWidth = 10;
    ctx.strokeStyle = Field.#markerColor;
    
    ctx.beginPath();
    let i = lineLength / 2;
    for (i; i < height; i += lineLength * 2) {
      ctx.moveTo(middle, i);
      ctx.lineTo(middle, i + lineLength);
    }

    ctx.moveTo(middle + radius, center);
    ctx.arc(middle, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  draw() {
    this.clear();
    this.paintBackground();
    this.paintMarkers();
  }
}

module.exports = Field;
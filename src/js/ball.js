class Ball {
  static #ballRadius = 20;
  static #ballColor = "red";

  #canvas;
  #ctx;

  #position = { x: 0, y: 0 };
  #direction = { x: 0, y: 0 };
  #speed = 4;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

    this.initialize();
  }

  initialize() {
    this.#position.x = this.#canvas.width / 2;
    this.#position.y = this.#canvas.height / 2;

    this.#direction.x = Math.round(Math.random()) === 1 ? 1 : -1;
    this.#direction.y = Math.round(Math.random()) === 1 ? 1 : -1;
  }

  move() {
    const radius = Ball.#ballRadius;
    const canvas = this.#canvas;
    const pos = this.#position;

    const bounds = {
      left: pos.x - radius,
      right: pos.x + radius,
      top: pos.y - radius,
      bottom: pos.y + radius
    };


    if (bounds.left <= 0 || bounds.right > canvas.width) {
      this.#direction.x *= -1;
    }

    if (bounds.top < 0 || bounds.bottom > canvas.height) {
      this.#direction.y *= -1;
    }


    pos.x += this.#direction.x * this.#speed; 
    pos.y += this.#direction.y * this.#speed;

  }

  draw() {
    const ctx = this.#ctx;
    const pos = this.#position;

    this.move();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Ball.#ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = Ball.#ballColor
    ctx.fill();
  }
}

module.exports = Ball;
const EventEmitter = require("events");
class Ball extends EventEmitter {
  static #ballRadius = 20;
  static #ballColor = "red";

  #canvas;
  #ctx;
  #player1;
  #player2;

  #position = { x: 0, y: 0 };
  #direction = { x: 0, y: 0 };
  #speed = 4;

  constructor(canvas, player1, player2) {
    super();

    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

    this.#player1 = player1;
    this.#player2 = player2;

    this.initialize();
  }

  initialize() {
    this.reset();
  }

  reset() {
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
      bottom: pos.y + radius,
      x: pos.x,
      y: pos.y
    };

    if (this.#player1.isHit(bounds) || this.#player2.isHit(bounds)) {
      this.#direction.x *= -1;
      //this.#direction.y *= -1;
      
      this.emit("bounce");
    }
    else {
      
      if (bounds.left <= 0 || bounds.right > canvas.width) {
        this.#direction.x = 0;
        this.#direction.y = 0;

        this.emit("loss");

        return false;
      }
      

      if (bounds.top < 0 || bounds.bottom > canvas.height) {
        this.#direction.y *= -1;
  
        this.emit("bounce");
      }
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
    ctx.closePath();
  }
}

module.exports = Ball;
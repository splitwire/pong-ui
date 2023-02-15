const Ball = require("./ball");
const Field = require("./field");
const Player = require("./player");

class Game {
  #id;
  #canvas;
  #ctx;

  #animationID;

  #ball;
  #field;
  #player1;
  #player2;

  constructor(id) {
    this.#id = id;
    this.#canvas = document.getElementById(id);
    this.#ctx = this.#canvas.getContext("2d");

    this.initialize();
  }

  initialize() {
    if (!this.#field) this.#field = new Field(this.#canvas);

    if (!this.#player1) this.#player1 = new Player(this.#canvas, "left");
    if (!this.#player2) this.#player2 = new Player(this.#canvas, "right");

    if (!this.#ball) this.#ball = new Ball(this.#canvas);

    this.#animationID = null;

    console.log(this.#player1.position);
    
    this.animate();
  }

  animate() {
    this.#animationID = requestAnimationFrame(this.animate.bind(this));

    this.#field.draw();

    this.#player1.draw();
    this.#player2.draw();

    this.#ball.draw(this.#player1, this.#player2);
  }
}

const game = new Game("pong");

class Player {
  static #playerWidth = 10;
  static #playerHeight = 60;
  static #playerColor = "white";

  #canvas;
  #ctx;
  #side;
  #position = { x: 0, y: 0 };

  #direction = 0;
  #speed = 3;

  constructor(canvas, side) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#side = side.toLowerCase();

    this.initialize();
  }

  //----------------
  get position() {
    return this.#position;
  }

  //----------------
  initialize() {
    this.#position.y = this.#canvas.height / 2;
    this.#position.x = (this.#side === "left")
      ? 0
      : this.#canvas.width - Player.#playerWidth;
    
    document
      .addEventListener("keydown", function (evt) {
        if (evt.key.toLowerCase() === "arrowup") {
          this.#direction = -1
        }
        else if (evt.key.toLowerCase() === "arrowdown") {
          this.#direction = 1
        }

      }.bind(this));
    
    document
      .addEventListener("keyup", function () {
        this.#direction = 0;
      }.bind(this));
  }

  //----------------
  isHit(coordinates) {
    const pos = this.#position;

    const bounds = {
      left: pos.x,
      right: pos.x + Player.#playerWidth,
      top: pos.y,
      bottom: pos.y + Player.#playerHeight
    };

    if (coordinates.top <= bounds.top && coordinates.bottom <= bounds.bottom) {
      return (this.#side === "left")
        ? coordinates.left <= bounds.right
        : bounds.left <= coordinates.right;
    }

    return false;
  }

  //----------------
  move() {
    const pos = this.#position;
 
    pos.y += (this.#direction * this.#speed);

    if (pos.y >= this.#canvas.height) {
      pos.y = this.#canvas.height;
    }
    else if (pos.y <= 0) {
      pos.y = 0;
    }
  }

  draw(player1, player2) {
    const ctx = this.#ctx;
    const pos = this.#position;

    const height = Player.#playerHeight;
    const offset = height / 2;

    this.move(player1, player2);

    //----------------
    ctx.beginPath();
    ctx.rect(pos.x, pos.y - offset, Player.#playerWidth, height);
    ctx.fillStyle = Player.#playerColor;
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Player;
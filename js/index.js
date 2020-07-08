const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const game = new Game();
game.update();

const mouse = getMouse(canvas);
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player = new Topology({
    offsetX: PLAYER_BOARD_OFFSET_X,
    offsetY: PLAYER_BOARD_OFFSET_Y,
    fieldSizeX: BOARD_COL_NUM,
    fieldSizeY: BOARD_ROW_NUM,
});

const mouse = getMouse(canvas);

player.addShips(
    { x: 0, y: 0, direct: 0, size: 3 },
    { x: 0, y: 2, direct: 1, size: 4 }
);

player.addChecks(
    { x: 4, y: 2 },
    { x: 3, y: 1 }
);

drawGrid();
player.drawAll(context);
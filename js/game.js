class Game{
    constructor(){
        this.state = "preparation";
        this.player = new Topology({
            offsetX: PLAYER_BOARD_OFFSET_X,
            offsetY: PLAYER_BOARD_OFFSET_Y,
            fieldSizeX: BOARD_COL_NUM,
            fieldSizeY: BOARD_ROW_NUM,
        });

        this.computer = new Topology({
            offsetX: COMPUTER_BOARD_OFFSET_X,
            offsetY: COMPUTER_BOARD_OFFSET_Y,
            fieldSizeX: BOARD_COL_NUM,
            fieldSizeY: BOARD_ROW_NUM,
        });

        this.player.addShips(
            { x: 0, y: 0, direct: 0, size: 3 },
            { x: 0, y: 2, direct: 1, size: 4 }
        );

        this.player.addChecks(
            { x: 4, y: 2 },
            { x: 3, y: 1 }
        );
        
        requestAnimationFrame(x => this.update(x));
    }

    update(timestamp){
        requestAnimationFrame(x => this.update(x));

        clearCanvas();

        drawGrid();
        this.player.drawAll(context);
        this.computer.drawAll(context);

        if (this.state === "preparation"){
            this.updatePreparation(timestamp);
        }
    }

    updatePreparation(timestamp){
        
    }
}
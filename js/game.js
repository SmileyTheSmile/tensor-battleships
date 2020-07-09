/**
 * The game itself.
 */
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
        
        requestAnimationFrame(x => this.update(x));
    }

    /**
     * Updates the game screen.
     * @param timestamp
     */
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

    /**
     * Updates during the preparation stage of the game.
     * @param timestamp
     */
    updatePreparation(timestamp){
        
    }
}
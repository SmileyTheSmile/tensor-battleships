/**
 * The game itself.
 */
class Game{
    constructor(){
        this.state = "preparation";
        this.mouse = getMouse(canvas);
        this.playersTurn = true;
        this.player = new Playfield({
            offsetX: PLAYER_BOARD_OFFSET_X,
            offsetY: PLAYER_BOARD_OFFSET_Y,
            fieldSizeX: BOARD_COL_NUM,
            fieldSizeY: BOARD_ROW_NUM,
            visible: true
        });

        this.computer = new Playfield({
            offsetX: COMPUTER_BOARD_OFFSET_X,
            offsetY: COMPUTER_BOARD_OFFSET_Y,
            fieldSizeX: BOARD_COL_NUM,
            fieldSizeY: BOARD_ROW_NUM,
            visible: false
        });

        this.player.fill();
        this.computer.fill();
        
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

        if (this.state === "preparation"){
            requestAnimationFrame(x => this.preparation(x));
        }
        else if (this.state === "playing"){
            requestAnimationFrame(x => this.playing(x));
        }

        this.mouse.pleft = this.mouse.left;
    }

    /**
     * Updates during the preparation stage of the game.
     * @param timestamp
     */
    preparation(timestamp){
        requestAnimationFrame(x => this.preparation(x));

        let flag = true;

        drawText({
            text: "Введите ваше имя.",
            x: CANVAS_WIDTH / 2 - "Введите ваше имя.".clientWidth / 2,
            x: CANVAS_HEIGHT / 2 - "Введите ваше имя.".clientHeight / 2
        })
        if (flag){
            this.state = "playing";
        }
    }
    
    playing(timestamp){
        this.player.drawAll(context);
        this.computer.drawAll(context);
        
        if (this.playersTurn){
            if (this.computer.isUnderPoint(this.mouse)){
                return
            }

            const point = this.computer.getCoords(this.mouse);

            if (this.mouse.left && this.mouse.pleft){
                this.computer.addChecks(point);
                this.computer.updateChecks();
                this.playersTurn = false;
            }
        }
        else {
            const point = {
                x: Math.floor(Math.random() * BOARD_COL_NUM),
                y: Math.floor(Math.random() * BOARD_ROW_NUM)
            }
            console.log(point)
            this.player.addChecks(point);
            this.player.updateChecks();
            this.playersTurn = true;
        }
    }
}
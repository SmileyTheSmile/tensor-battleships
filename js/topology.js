class Topology{
    constructor(params){
        this.offsetX = params.offsetX;
        this.offsetY = params.offsetY;
        this.fieldSizeX = params.fieldSizeX;
        this.fieldSizeY = params.fieldSizeY;
        this.ships = [];
        this.checked = [];
    }

    /*
        Adds destroyed ship parts to the list.
    */
    addShips(...ships){
        for (const ship of ships){
            if (!this.ships.includes(ship)){
                this.ships.push(ship);
            }
        }

        return this;
    }

    /*
        Adds checked cells to the list.
    */
    addChecks(...checks){
        for (const check of checks){
            if (!this.checked.includes(check)){
                this.checked.push(check);
            }
        }

        return this;
    }

    /*
        Draws the ship according to given params {x, y, width, height, fill, stroke, fillStyle, strokeStyle}.
    */
    drawShip(ship){
        drawRect({
            x: this.offsetX + ship.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            y: this.offsetY + ship.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            width: (ship.direct === 0 ? ship.size : 1) * BOARD_CELL_SIZE,
            height: (ship.direct === 1 ? ship.size : 1) * BOARD_CELL_SIZE,
            fill: true,
            fillStyle: "rgba(0, 0, 0, 0.8)"
        });

        return this;
    }

    drawCheck(check){
        drawArc({
            x: this.offsetX + check.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 1.5,
            y: this.offsetY + check.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 1.5,
            radius: 5,
            startAngle: 0,
            endAngle: Math.PI * 2,
            fill: true,
            fillStyle: "rgba(0, 0, 0, 0.8)"
        });

        return this;
    }

    /*
        Draws the gameplay grid along with the numbers and letters.
    */
    drawBoard(context){
        for (let i = 1; i < this.fieldSizeX + 2; i++){
            drawLine({
                x0: this.offsetX + i * BOARD_CELL_SIZE,
                y0: this.offsetY,
                x1: this.offsetX + i * BOARD_CELL_SIZE,
                y1: this.offsetY + (this.fieldSizeY + 1) * BOARD_CELL_SIZE,
                strokeStyle: "blue",
                lineWidth: 2
            })
        }

        for (let i = 1; i < this.fieldSizeY + 2; i++){
            drawLine({
                x0: this.offsetX,
                y0: this.offsetY + i * BOARD_CELL_SIZE,
                x1: this.offsetX + (this.fieldSizeX + 1) * BOARD_CELL_SIZE,
                y1: this.offsetY + i * BOARD_CELL_SIZE,
            })
        }
        
        context.textAlign = "center";
        context.fillStyle = "blue";
        context.font = "25px Comic Sans MS";

        for (let i = 1; i < this.fieldSizeY + 1; i++){
            const num = i.toString();
            context.fillText(
                num,
                this.offsetX + BOARD_CELL_SIZE / 2,
                this.offsetY + i * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 0.75
            );
        }

        for (let i = 0; i < this.fieldSizeX + 1; i++){
            const letter = ALPHABET[i];
            context.fillText(
                letter,
                this.offsetX + i * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 0.5,
                this.offsetY + BOARD_CELL_SIZE * 0.75
            );
        }

        return this;
    }

    drawAll(context){
        this.drawBoard(context);

        for (const ship of this.ships){
            this.drawShip(ship);
        }

        for (const check of this.checked){
            this.drawCheck(check);
        }

        return this;
    }

    isUnderPoint(point){
        if (
            (point.x < this.offsetX + BOARD_CELL_SIZE) ||
            (point.x > this.offsetX + BOARD_CELL_SIZE * (this.fieldSizeX + 1)) ||
            (point.y < this.offsetY + BOARD_CELL_SIZE) ||
            (point.y > this.offsetY + BOARD_CELL_SIZE * (this.fieldSizeY + 1))){
                return true;
        }
        return false;
    }

    getCoords(point){
        if (this.isUnderPoint(point)){
            return false;
        }

        return {
            x: parseInt((point.x - this.offsetX - BOARD_CELL_SIZE) / BOARD_CELL_SIZE),
            y: parseInt((point.y - this.offsetY - BOARD_CELL_SIZE) / BOARD_CELL_SIZE)
        }
    }

    checkPlacement(ship){
        if ((ship.direct === 0 && ship.x + ship.size > BOARD_COL_NUM) ||
            (ship.direct === 1 && ship.y + ship.size > BOARD_ROW_NUM)){
            return false;
        }

        const map = new Array(BOARD_ROW_NUM);
        
        for (let i = 0; i < BOARD_ROW_NUM; i++)
        {
            map[i] = new Array(BOARD_COL_NUM)
            for (let j = 0; j < BOARD_COL_NUM; j++)
            {
                map[i][j] = true;
            }
        }
        
        for (const ship of this.ships){
            if (ship.direct === 0){
                for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++){
                    for (let y = ship.y - 1; y < ship.y + 2; y++){
                        if (map[y] && map[y][x]){
                            map[y][x] = false;
                        }
                    }
                }
            }
            else {
                for (let x = ship.x - 1; x < ship.x + 2; x++){
                    for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++){
                        if (map[y] && map[y][x]){
                            map[y][x] = false
                        }
                    }
                }
            }
        }

        if (ship.direct === 0)
        {
            for (let i = 0; i < ship.size; i++){
                if (!map[ship.y][ship.x + i]){
                    return false;
                }
            }
        }
        else {
            for (let i = 0; i < ship.size; i++){
                if (!map[ship.y + i][ship.x]){
                    return false;
                }
            }
        }

        return true;
    }

    fill(){
        this.ships = [];
        
        for (let i = 1; i < 5; i++){
            for (let j = 0; j < SHIP_NUMS[i]; j++){
                let flag = false;
                while (!flag){
                    const ship = {
                        x: Math.floor(Math.random() * BOARD_COL_NUM),
                        y: Math.floor(Math.random() * BOARD_ROW_NUM),
                        direct: Math.random() > Math.random() ? 0 : 1,
                        size: i
                    };

                    if (this.checkPlacement(ship)){
                        console.log("rgerg")
                        this.addShips(ship);
                        flag = true;
                    }
                    else {
                        console.log("fwef")
                    }
                }
            }
        }
    }
}
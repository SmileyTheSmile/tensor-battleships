/**
 * The class for the playfields.
 */
class Playfield{
    constructor(params){
        this.offsetX = params.offsetX;
        this.offsetY = params.offsetY;
        this.fieldSizeX = params.fieldSizeX;
        this.fieldSizeY = params.fieldSizeY;
        this.visible = params.visible;
        this.ships = [];
        this.checked = [];
        this.injuries = [];
    }

    /**
     * Adds an unspecified number of ships to the playfield.
     * @param ...ships
     */
    addShips(...ships){
        for (const ship of ships){
            if (!this.ships.includes(ship)){
                this.ships.push(ship);
            }
        }

        return this;
    }

    /**
     * Adds an unspecified number of checked cells to the playfield.
     * @param ...checks
     */
    addChecks(...checks){
        for (const check of checks){
            if (!this.checked.includes(check)){
                this.checked.push(check);
            }
        }

        return this;
    }

    /**
     * Draws a ship according to the ship parameters.
     * @param {x, y, direct, size}
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

    /**
     * Draws a circle in the specified cell.
     * @param {x, y}
     */
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

    drawInjury(injury){
        drawLine({
            x0: this.offsetX + injury.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            y0: this.offsetY + injury.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            x1: this.offsetX + injury.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 2,
            y1: this.offsetY + injury.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 2,
            lineWidth: 1,
            strokeStyle: "rgba(255, 0, 0, 0.8)"
        });

        drawLine({
            x0: this.offsetX + injury.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 2,
            y0: this.offsetY + injury.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            x1: this.offsetX + injury.x * BOARD_CELL_SIZE + BOARD_CELL_SIZE,
            y1: this.offsetY + injury.y * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 2,
            lineWidth: 1,
            strokeStyle: "rgba(255, 0, 0, 0.8)"
        });

        return this;

    }

    /**
     * Draws the playfield and all the letters and numbers.
     * @param context
     */
    drawBoard(context){
        for (let i = 1; i < this.fieldSizeX + 2; i++){ // vertical lines
            drawLine({
                x0: this.offsetX + i * BOARD_CELL_SIZE,
                y0: this.offsetY,
                x1: this.offsetX + i * BOARD_CELL_SIZE,
                y1: this.offsetY + (this.fieldSizeY + 1) * BOARD_CELL_SIZE,
                strokeStyle: "blue",
                lineWidth: 2
            })
        }

        for (let i = 1; i < this.fieldSizeY + 2; i++){ // horisontal lines
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

        for (let i = 1; i < this.fieldSizeY + 1; i++){ // draws the numbers on the side
            drawText({
                text: i.toString(),
                x: this.offsetX + BOARD_CELL_SIZE / 2,
                y: this.offsetY + i * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 0.75
            })
        }

        for (let i = 0; i < this.fieldSizeX + 1; i++){ // draws the letters on the top
            drawText({
                text: ALPHABET[i],
                x: this.offsetX + i * BOARD_CELL_SIZE + BOARD_CELL_SIZE * 0.5,
                y: this.offsetY + BOARD_CELL_SIZE * 0.75
            })
        }

        return this;
    }

    /**
     * The entire playfield along with all the ships and checked cells.
     * @param context
     */
    drawAll(context){
        this.drawBoard(context);

        if (this.visible){
            for (const ship of this.ships){
                this.drawShip(ship);
            }
        }

        for (const check of this.checked){
            this.drawCheck(check);
        }

        for (const injury of this.injuries){
            this.drawInjury(injury);
        }

        return this;
    }

    /**
     * Check if a point is within the bounds of this playfield.
     * @param {x, y}
     */
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

    /**
     * Get the cell in which the given point is located.
     * @param {x, y}
     */
    getCoords(point){
        if (this.isUnderPoint(point)){
            return false;
        }

        return {
            x: parseInt((point.x - this.offsetX - BOARD_CELL_SIZE) / BOARD_CELL_SIZE),
            y: parseInt((point.y - this.offsetY - BOARD_CELL_SIZE) / BOARD_CELL_SIZE)
        }
    }

    /**
     * Check if a point is within the bounds of this playfield.
     * @param {x, y}
     */
    checkPlacement(ship){
        if ((ship.direct === 0 && ship.x + ship.size > BOARD_COL_NUM) || // simple check on wether or not the ship firs into the board
            (ship.direct === 1 && ship.y + ship.size > BOARD_ROW_NUM)){
            return false;
        }

        const map = new Array(BOARD_ROW_NUM); // creates a map of possible ship locations
        
        for (let i = 0; i < BOARD_ROW_NUM; i++)
        {
            map[i] = new Array(BOARD_COL_NUM)
            for (let j = 0; j < BOARD_COL_NUM; j++)
            {
                map[i][j] = true;
            }
        }
        
        for (const ship of this.ships){ // finds all the cells in the map where the given ship cannot be placed
            if (ship.direct === 0){ // if the ship is horisontal
                for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++){
                    for (let y = ship.y - 1; y < ship.y + 2; y++){
                        if (map[y] && map[y][x]){
                            map[y][x] = false;
                        }
                    }
                }
            }
            else { // if the ship is vertical
                for (let x = ship.x - 1; x < ship.x + 2; x++){
                    for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++){
                        if (map[y] && map[y][x]){
                            map[y][x] = false
                        }
                    }
                }
            }
        }

        if (ship.direct === 0) // checks if all the parts of the ship are placed in available cells
        { // if the ship is horisontal
            for (let i = 0; i < ship.size; i++){
                if (!map[ship.y][ship.x + i]){
                    return false;
                }
            }
        }
        else { // if the ship is vertical
            for (let i = 0; i < ship.size; i++){
                if (!map[ship.y + i][ship.x]){
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Randomly fills the field with ships.
     */
    fill(){
        this.ships = [];
        
        for (let i = 4; i > 0; i--){ // ship size from 1 to 4
            for (let j = 0; j < SHIP_NUMS[i]; j++){ // number of ships spr=ecified in the constant
                let flag = false;
                while (!flag){ // looks for a ship location until an available one is found
                    const ship = {
                        x: Math.floor(Math.random() * BOARD_COL_NUM),
                        y: Math.floor(Math.random() * BOARD_ROW_NUM),
                        direct: Math.random() > Math.random() ? 0 : 1,
                        size: i
                    };

                    if (this.checkPlacement(ship)){
                        this.addShips(ship);
                        flag = true;
                    }
                }
            }
        }

        return this;
    }

    updateChecks(){
        this.checked = this.checked // filter all the clones of checked cells
            .map(check => JSON.stringify(check))
            .filter((e, i, l) => l.lastIndexOf(e) === i)
            .map(check => JSON.parse(check))
        
        const map = new Array(BOARD_ROW_NUM); // creates a map of all ships
        
        for (let i = 0; i < BOARD_ROW_NUM; i++)
        {
            map[i] = new Array(BOARD_COL_NUM)
            for (let j = 0; j < BOARD_COL_NUM; j++)
            {
                map[i][j] = false;
            }
        }
        
        for (const ship of this.ships){ // finds all the ship locatons on the map
            if (ship.direct === 0){ // if the ship is horisontal
                for (let x = ship.x; x < ship.x + ship.size; x++){
                    if (map[ship.y] && !map[ship.y][x]){
                        map[ship.y][x] = true;
                    }
                }
            }
            else { // if the ship is vertical
                for (let y = ship.y; y < ship.y + ship.size; y++){
                    if (map[y] && !map[y][ship.x]){
                        map[y][ship.x] = true;
                    }
                }
            }
        }
        
        for (const check of this.checked){
            if (!map[check.y][check.x]){
                this.injuries.push(check);

                const index = this.checked.indexOf(check);
                this.checked.splice(index, 1);

            }
        }
        
        this.injuries = this.injuries // filter all the clones of checked cells
            .map(check => JSON.stringify(check))
            .filter((e, i, l) => l.lastIndexOf(e) === i)
            .map(check => JSON.parse(check))
        console.log(this.injuries)
    }
}
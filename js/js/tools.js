/**
 * Draws a line between point (x0, y0) and (x1, x1).
 * @param {x0, y0, x1, y1}
 */
function drawLine(params){
    if (params.strokeStyle){
        context.strokeStyle = params.strokeStyle;
    }

    if (params.lineWidth){
        context.lineWidth = params.lineWidth;
    }

    context.beginPath();
    context.moveTo(params.x0, params.y0);
    context.lineTo(params.x1, params.y1);
    context.stroke();
}

/**
 * Draws a rect according to given params.
 * @param {x, y, width, height, fill, stroke, fillStyle, strokeStyle}
 */
function drawRect(params){
    if (!params.stroke && !params.fill){
        return
    }

    context.beginPath();
    context.rect(params.x, params.y, params.width, params.height);

    if (params.fill){
        context.fillStyle = params.fillStyle;
        context.fill();
    }

    if (params.stroke){
        context.lineWidth = params.lineWidth;
        context.strokeStyle = params.strokeStyle;
        context.stroke();
    }
}

/**
 * Draws a circle according to given params.
 * @param {x, y, radius, startAngle, endAngle, fill, stroke, fillStyle, strokeStyle}
 */
function drawArc(params){
    if (!params.stroke && !params.fill){
        return
    }
    
    context.beginPath();
    context.arc(params.x, params.y, params.radius, params.startAngle, params.endAngle);

    if (params.fill){
        context.fillStyle = params.fillStyle;
        context.fill();
    }

    if (params.stroke){
        context.lineWidth = params.lineWidth;
        context.strokeStyle = params.strokeStyle;
        context.stroke();
    }
}

/**
 * Draws text according to given params.
 * @param {text, x, y}
 */
function drawText(params){
    context.fillText(
        params.text,
        params.x,
        params.y
    );
}

/**
 * Draws the notebook-like background.
 */
function drawGrid(){
    for (let i = 0; i < canvas.height / CELL_SIZE; i++){ // horisontal lines
        drawLine({
            x0: 0,
            y0: i * CELL_SIZE,
            x1: canvas.width,
            y1: i * CELL_SIZE,
            strokeStyle: 'blue',
            lineWidth: 0.5
        })
    }
    
    for (let i = 0; i < canvas.width / CELL_SIZE; i++){  // vertical lines
        drawLine({
            x0: i * CELL_SIZE,
            y0: 0,
            x1: i * CELL_SIZE,
            y1: canvas.height,
            strokeStyle: 'blue',
            lineWidth: 0.5
        })
    }

    
    drawLine({  // red line
        x0: 0,
        y0: RED_LINE_OFFSET,
        x1: canvas.width,
        y1: RED_LINE_OFFSET,
        strokeStyle: 'red',
        lineWidth: 1
    })
}

/**
 * Clears the canvas.
 */
function clearCanvas(){
    canvas.width |= 0;
}

/**
 * Returns the current location of the cursor.
 */
function getMouse(element){
    const mouse = {
        x: 0,
        y: 0,
        left: false,
        pleft: false
    };
    
    element.addEventListener("mousemove", function(event){
        const rect = element.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    })

    element.addEventListener("mousedown", function(event){
        if (event.buttons === 1){
            mouse.left = true;
        }
    })

    element.addEventListener("mouseup", function(event){
        if (event.buttons !== 1){
            mouse.left = false;
        }
    })

    return mouse;
}
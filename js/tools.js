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
 * @param {x, y, width, height, fill, stroke, fillStyle, strokeStyle}
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

function drawGrid(){
    for (let i = 0; i < canvas.height / CELL_SIZE; i++){
        drawLine({
            x0: 0,
            y0: i * CELL_SIZE,
            x1: canvas.width,
            y1: i * CELL_SIZE,
            strokeStyle: 'blue',
            lineWidth: 0.5
        })
    }
    
    for (let i = 0; i < canvas.width / CELL_SIZE; i++){
        drawLine({
            x0: i * CELL_SIZE,
            y0: 0,
            x1: i * CELL_SIZE,
            y1: canvas.height,
            strokeStyle: 'blue',
            lineWidth: 0.5
        })
    }

    
    drawLine({
        x0: 0,
        y0: RED_LINE_OFFSET,
        x1: canvas.width,
        y1: RED_LINE_OFFSET,
        strokeStyle: 'red',
        lineWidth: 1
    })
}

function clearCanvas(){
    canvas.width |= 0;
}

function getMouse(element){
    const mouse = {
        x: 0,
        y: 0
    };
    
    element.addEventListener("mousemove", function(event){
        const rect = element.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    })
    return mouse;
}
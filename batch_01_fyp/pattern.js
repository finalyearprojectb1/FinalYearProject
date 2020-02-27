


var can = $("#canvas")[0],
    ctx = can.getContext('2d'),
    wid = can.width,
    hei = can.height,
    pad = 20,
    circles = [],
    selCircs = [],
    correctPath = [0,3,7,5,2],
    startPoint = {
        x: 0,
        y: 0
    },
    dragging = false;

(function init() {
    var rad = (wid - pad * 4) / 3;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            circles.push(new Circle({
                x: j * (pad + rad) + pad + rad / 2,
                y: i * (pad + rad) + pad + rad / 2
            }, rad / 2));
        }
    }
})();
(function draw() {
    ctx.clearRect(0, 0, wid, hei);

    for (var i = 0; i < circles.length; i++) {
        circles[i].draw(ctx);
    }

    if (dragging && selCircs.length > 1) {
        var pos = selCircs[0].circ.position();
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#000";
        ctx.moveTo(pos.x, pos.y);
        for (var j = 1; j < selCircs.length; j++){
            pos = selCircs[j].circ.position();
            ctx.lineTo(pos.x,pos.y);
        }
        ctx.stroke();
    }
    webkitRequestAnimationFrame(draw);
})();

function Circle(center, radius, fill, stroke, hover, active) {
    var center = {
        x: center.x,
        y: center.y
    },
        radius = radius,
        fill = fill || '#ccc',
        hover = hover || '#ddd',
        active = active || '#0f0',
        stroke = stroke || '',
        path;
    this.position = function(){
        return {x:center.x, y:center.y};
    }
    this.draw = function(ctx) {
        ctx.fillStyle = this.selected ? active : this.hovering ? hover : fill;
        if (stroke) ctx.strokeStyle = stroke;

        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        if (stroke) ctx.stroke();
    };

    this.isPointInPath = function(x, y) {
        return Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2)) <= radius;
    };
    this.hovering = false;
    this.selected = false;
}

$("#canvas").mousemove(function(e) {
    for (var i = 0; i < circles.length; i++) {
        var cir = circles[i];
        var pip = cir.isPointInPath(e.offsetX, e.offsetY);
        cir.hovering = pip;
        if (dragging && pip && !cir.selected) {
            selCircs.push({circ:cir, index:i});
            cir.selected = true;
        }
    }
});
$("#canvas").mousedown(function(e) {
    dragging = true;
});
$("#canvas").mouseup(function(e) {
    dragging = false;
    // validate path
    if (selCircs.length == correctPath.length){
        var valid = true;
        for (var i = 0; valid && i < correctPath.length; i++){
            var index = correctPath[i];
            if (selCircs[i].index !== index) valid = false;
        }
        if (valid) alert('correct!');
    }
    
    // reset selection
    for (var i = 0; i < selCircs.length; i++)
        selCircs[i].circ.selected = false;
    
    selCircs = [];
});
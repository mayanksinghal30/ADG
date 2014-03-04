var interactiveObj;
var ctx;
var c;
var counter = 0;

$(document).ready(function (e) {
    $(function () {
        var getParameters = getURLParameters();
        interactiveObj = new questionInteractive();
        var imageArray = new Array('scale1.png', 'scale2.png', 'slider-button.png');
        var loader = new PxLoader();
        $.each(imageArray, function (key, value1) {
            var pxImage = new PxLoaderImage('../assets/' + value1);
            loader.add(pxImage);
        });
        loader.addCompletionListener(function () {
            loadXML("xml.xml", function () {
                $("#loader").hide();
                $("#content").show();
                if (counter > 0) {
                    $("#container").html("Parameters" + " are missing");
                    $("#content").hide();
                }

                $("#replayButton").bind('click', function () {
                    interactiveObj.init();
                });

                $("#slider1").slider({
                    range: "min",
                    value: 0,
                    min: -4,
                    max: 4,
                    step: 0.1,
                    slide: function (event, ui) {
                        // While sliding, update the value in the #amount div element
                        $("#amount").html(replaceDynamicText(ui.value, interactiveObj.numberLanguage, ''));
                        interactiveObj.coordinates(ui.value);
                    }
                });

                $("#ruler1").bind("click", function () {
                    $("#scl1").toggle();
                });

                $("#scal1").bind("mousedown", function () {
                    interactiveObj.drag = 1;
                });

                interactiveObj.drag = 0;
                interactiveObj.rotate = 0;
                $(document).bind("mousemove", function (event) {
                    if (interactiveObj.rotate == 1) {
                        var x = event.clientX;
                        var y = event.clientY;
                        var m = Math.atan((y - parseFloat($("#scl1").css("top"))) / (x - parseFloat($("#scl1").css("left"))));
                        m = m * 180 / Math.PI;
                        $("#scl1").css({ "transformOrigin": "0% 0%" });
                        $("#scl1").css({ "rotate": m + "deg" });
                    }
                });

                $(document).bind("mouseup", function () {
                    interactiveObj.rotate = 0;
                });

                $("#scal2").bind("mousedown", function () {
                    interactiveObj.rotate = 1;
                });

                $("#scl1").draggable({
                    containment: "#container",
                    start: function () {
                        if (interactiveObj.drag == 0) {
                            return false;
                        }
                    }
                });

                $("#scal1").bind("mouseup", function () {
                    interactiveObj.drag = 0;
                });

                interactiveObj.init();
            });
        });
        loader.start();
    });
});

function questionInteractive() {
    if (typeof getParameters['language'] == "undefined") {
        this.language = 'english';
    }
    else {
        this.language = getParameters['language'];
    }
    if (typeof getParameters['numberLanguage'] == "undefined") {
        this.numberLanguage = 'english';
    }
    else {
        this.numberLanguage = getParameters['numberLanguage'];
    }
    if (typeof getParameters['quest'] == 'undefined') {
        counter++;
    }
    else{
        this.ques = getParameters['quest'];
    }
}

var myGraph1;
questionInteractive.prototype.init = function () {
    $("#amount").html(replaceDynamicText(0, interactiveObj.numberLanguage, ''));
    myGraph1 = new Graph({
        canvasId: 'grph1',
        minX: 0,
        numberLanguage: 'english',
        minY: 0,
        maxX: 32,
        maxY: 16,
        unitsPerTick: 1,
        drawGrid: true,
        drawAxes: false,
        drawTicks: false,
        drawNumbers: false,
        gridLineColor: 'grey',
        axisColor: 'black',
        font: '8px arial',
        textColor: 'black'
    });
    c = document.getElementById("cnvs");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.arc(250, 150, 2, 0, 2 * Math.PI);
    ctx.stroke();
    if (interactiveObj.ques == 1) {
        interactiveObj.v1x = 300;
        interactiveObj.v1y = 125;
        interactiveObj.v2x = 300;
        interactiveObj.v2y = 200;
        interactiveObj.v3x = 350;
        interactiveObj.v3y = 200;
        interactiveObj.v4x = 350;
        interactiveObj.v4y = 125;
    }
    else {
        $("#txt").show();
        $("#txt").html(promptArr['textm'] + "<br /><br />" + promptArr['textx']);
        interactiveObj.v1x = 300;
        interactiveObj.v1y = 125;
        interactiveObj.v2x = 275;
        interactiveObj.v2y = 200;
        interactiveObj.v3x = 375;
        interactiveObj.v3y = 200;
        interactiveObj.v4x = 350;
        interactiveObj.v4y = 125;
    }
    ctx.beginPath();
    ctx.moveTo(interactiveObj.v1x - 1, interactiveObj.v1y - 1);
    ctx.lineTo(interactiveObj.v2x - 1, interactiveObj.v2y - 1);
    ctx.lineTo(interactiveObj.v3x - 1, interactiveObj.v3y - 1);
    ctx.lineTo(interactiveObj.v4x - 1, interactiveObj.v4y - 1);
    ctx.lineTo(interactiveObj.v1x - 1, interactiveObj.v1y - 1);
    ctx.fillStyle = "rgba(255,0,0,0.3)";
    ctx.fill();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(interactiveObj.v1x, interactiveObj.v1y);
    ctx.lineTo(interactiveObj.v2x, interactiveObj.v2y);
    ctx.lineTo(interactiveObj.v3x, interactiveObj.v3y);
    ctx.lineTo(interactiveObj.v4x, interactiveObj.v4y);
    ctx.lineTo(interactiveObj.v1x, interactiveObj.v1y);
    ctx.stroke();

    ctx.font = "16px Comic Sans MS";
    ctx.fillStyle = 'red';
    ctx.fillText("A", interactiveObj.v1x - 5, interactiveObj.v1y - 10);
    ctx.fillText("B", interactiveObj.v2x - 5, interactiveObj.v2y + 10);
    ctx.fillText("C", interactiveObj.v3x - 5, interactiveObj.v3y + 10);
    ctx.fillText("D", interactiveObj.v4x - 5, interactiveObj.v4y - 10);
    ctx.fillStyle = 'black';
    ctx.fillText("O", 245, 145);
    interactiveObj.image1 = ctx.getImageData(240, 100, 200, 200);
    interactiveObj.coordinates(0);
    //interactiveObj.center = [325, 162.5];
}

questionInteractive.prototype.coordinates = function (scale) {
    c.width = c.width;
    ctx.putImageData(interactiveObj.image1, 240, 100, 0, 0, 200, 200);
    var x1 = (interactiveObj.v1x - 250) * scale + 250;
    var x2 = (interactiveObj.v2x - 250) * scale + 250;
    var x3 = (interactiveObj.v3x - 250) * scale + 250;
    var x4 = (interactiveObj.v4x - 250) * scale + 250;
    var y1 = (interactiveObj.v1y - 150) * scale + 150;
    var y2 = (interactiveObj.v2y - 150) * scale + 150;
    var y3 = (interactiveObj.v3y - 150) * scale + 150;
    var y4 = (interactiveObj.v4y - 150) * scale + 150;
    ctx.beginPath();
    ctx.moveTo(x1 - 1, y1 - 1);
    ctx.lineTo(x2 - 1, y2 - 1);
    ctx.lineTo(x3 - 1, y3 - 1);
    ctx.lineTo(x4 - 1, y4 - 1);
    ctx.lineTo(x1 - 1, y1 - 1);
    ctx.fillStyle = 'rgba(0,0,255,0.4)';
    ctx.fill();
    ctx.strokeStyle = "darkblue";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = '2';
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    if (scale >= 1) {
        ctx.moveTo(250, 150);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(x4, y4);
        ctx.stroke();
    }
    else if (scale < 0) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(interactiveObj.v1x, interactiveObj.v1y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(interactiveObj.v2x, interactiveObj.v2y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(interactiveObj.v3x, interactiveObj.v3y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x4, y4);
        ctx.lineTo(interactiveObj.v4x, interactiveObj.v4y);
        ctx.stroke();
    }
    else {
        ctx.moveTo(250, 150);
        ctx.lineTo(interactiveObj.v1x, interactiveObj.v1y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(interactiveObj.v2x, interactiveObj.v2y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(interactiveObj.v3x, interactiveObj.v3y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(interactiveObj.v4x, interactiveObj.v4y);
        ctx.stroke();
    }
    if (scale != 0)
        scale = scale / Math.abs(scale);
    ctx.fillStyle = 'blue';
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("A'", x1 - 5, y1 - 10 * scale);
    ctx.fillText("B'", x2 - 5, y2 + 10 * scale);
    ctx.fillText("C'", x3 - 5, y3 + 10 * scale);
    ctx.fillText("D'", x4 - 5, y4 - 10 * scale);
}
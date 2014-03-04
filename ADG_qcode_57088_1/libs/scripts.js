var interactiveObj;
var counter = 0;
var c;
var ctx;
var angle = 0;
var length = 0;

$(document).ready(function (e) {
    $(function () {
        var getParameters = getURLParameters();
        interactiveObj = new questionInteractive();
        var imageArray = new Array('2.png');
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

                $("#angle").click(function () {
                    c.width = c.width;
                    ctx.putImageData(interactiveObj.image1, 8, 42, 0, 0, 200, 200);
                    interactiveObj.startX += 20;
                    var point1 = interactiveObj.rotate30([interactiveObj.startX, 80]);
                    var point2 = interactiveObj.rotate30([320, 80]);
                    var point3 = interactiveObj.rotate30([320, 150]);
                    interactiveObj.v1x = point1[0];
                    interactiveObj.v1y = point1[1];
                    interactiveObj.v2x = point2[0];
                    interactiveObj.v2y = point2[1];
                    interactiveObj.v3x = point3[0];
                    interactiveObj.v3y = point3[1];
                    ctx.beginPath();
                    ctx.moveTo(point1[0], point1[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.lineTo(point3[0], point3[1]);
                    ctx.lineTo(point1[0], point1[1]);
                    ctx.strokeStyle = 'blue';
                    ctx.stroke();
                    interactiveObj.drawLine([20, 60], point1, 780);
                    interactiveObj.drawLine([180, 60], point2, 780);
                    interactiveObj.drawLine([180, 170], point3, 780);
                    interactiveObj.intersection([20, 60, point1[0], point1[1]], [180, 60, point2[0], point2[1]], [180, 170, point3[0], point3[1]]);
                    interactiveObj.coordText();
                });

                $("#reset").click(function () {
                    interactiveObj.angle = 0;
                    interactiveObj.startX = 220;
                    interactiveObj.v1x = 220;
                    interactiveObj.v1y = 80;
                    interactiveObj.v2x = 320;
                    interactiveObj.v2y = 80;
                    interactiveObj.v3x = 320;
                    interactiveObj.v3y = 150;
                    c.width = c.width;
                    ctx.putImageData(interactiveObj.image2, 8, 40, 0, 0, 800, 800);
                    interactiveObj.intersection([20, 60, 220, 80], [180, 60, 320, 80], [180, 170, 320, 150]);
                });

                $("#orientation").click(function () {
                    interactiveObj.angle += 30;
                    c.width = c.width;
                    ctx.putImageData(interactiveObj.image1, 8, 42, 0, 0, 240, 240);
                    var point1 = interactiveObj.rotate30([interactiveObj.startX, 80]);
                    var point2 = interactiveObj.rotate30([320, 80]);
                    var point3 = interactiveObj.rotate30([320, 150]);
                    interactiveObj.v1x = point1[0];
                    interactiveObj.v1y = point1[1];
                    interactiveObj.v2x = point2[0];
                    interactiveObj.v2y = point2[1];
                    interactiveObj.v3x = point3[0];
                    interactiveObj.v3y = point3[1];
                    interactiveObj.drawLine([20, 60], point1, 780);
                    interactiveObj.drawLine([180, 60], point2, 780);
                    interactiveObj.drawLine([180, 170], point3, 780);
                    ctx.beginPath();
                    ctx.moveTo(point1[0], point1[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.lineTo(point3[0], point3[1]);
                    ctx.lineTo(point1[0], point1[1]);
                    ctx.strokeStyle = 'blue';
                    ctx.stroke();
                    interactiveObj.intersection([20, 60, point1[0], point1[1]], [180, 60, point2[0], point2[1]], [180, 170, point3[0], point3[1]]);
                    interactiveObj.coordText();
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
}

questionInteractive.prototype.init = function () {
    $("#reset").html(promptArr['rest']);
    $("#angle").html(promptArr['changeAng']);
    $("#orientation").html(promptArr['changeOrient']);
    $("#text1").html(promptArr['pntEnlarge']);
    interactiveObj.angle = 0;
    c = document.getElementById("cnvs");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 60);
    ctx.lineTo(180, 60);
    ctx.lineTo(180, 170);
    ctx.lineTo(20, 60);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("A", 15, 55);
    ctx.fillText("B", 175, 55);
    ctx.fillText("C", 175, 185);
    interactiveObj.image1 = ctx.getImageData(8, 42, 200, 200);
    ctx.beginPath();
    interactiveObj.startX = 220;
    ctx.moveTo(220, 80);
    ctx.lineTo(320, 80);
    ctx.lineTo(320, 150);
    ctx.lineTo(220, 80);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fillText("A'", 215, 75);
    ctx.fillText("B'", 315, 75);
    ctx.fillText("C'", 315, 165);
    interactiveObj.drawLine([20, 60], [220, 80], 780);
    interactiveObj.drawLine([180, 60], [320, 80], 780);
    interactiveObj.drawLine([180, 170], [320, 150], 780);
    interactiveObj.v1x = 220;
    interactiveObj.v1y = 80;
    interactiveObj.v2x = 320;
    interactiveObj.v2y = 80;
    interactiveObj.v3x = 320;
    interactiveObj.v3y = 150;
    interactiveObj.intersection([20, 60, 220, 80], [180, 60, 320, 80], [180, 170, 320, 150]);
    interactiveObj.image2 = ctx.getImageData(8, 40, 800, 800);
}

questionInteractive.prototype.drawLine = function(pnt1, pnt2, externalPnt) {
    var m = (pnt2[1] - pnt1[1]) / (pnt2[0] - pnt1[0]);
    var x = externalPnt;
    var y = m*(x - pnt1[0]) + pnt1[1];
    ctx.beginPath();
    ctx.moveTo(pnt1[0], pnt1[1]);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

questionInteractive.prototype.rotate30 = function (pnt1) {
    var xcenter = [860 / 3, 310 / 3];
    var x1 = (interactiveObj.v1x + interactiveObj.v2x + interactiveObj.v3x);
    var y1 = (interactiveObj.v1y + interactiveObj.v2y + interactiveObj.v3y);
    interactiveObj.centroid = [x1 / 3, y1 / 3];
    var c = Math.cos(interactiveObj.angle * Math.PI / 180);
    var s = Math.sin(interactiveObj.angle * Math.PI / 180);
    pnt1[0] -= xcenter[0];
    pnt1[1] -= xcenter[1];
    var newx = pnt1[0] * c - pnt1[1] * s;
    var newy = pnt1[0] * s + pnt1[1] * c;
    newx += xcenter[0];
    newy += xcenter[1];
    var array = [newx, newy];
    return array;
}

questionInteractive.prototype.intersection = function (pnt1, pnt2, pnt3) {
    var m1 = (pnt1[3] - pnt1[1]) / (pnt1[2] - pnt1[0]);
    var m2 = (pnt2[3] - pnt2[1]) / (pnt2[2] - pnt2[0]);
    var c1 = (pnt1[1] - m1 * pnt1[0]);
    var c2 = (pnt2[1] - m2 * pnt2[0]);
    var array1 = [1, m1, c1];
    var array2 = [1, m2, c2];
    interactiveObj.intersectionX = (array1[2] - array2[2]) / (m2 - m1);
    interactiveObj.intersectionY = m1 * interactiveObj.intersectionX + c1;
    var m3 = (pnt3[3] - pnt3[1]) / (pnt3[2] - pnt3[0]);
    var c3 = (pnt3[1] - m3 * pnt3[0]);
    var y = m3 * interactiveObj.intersectionX + c3;
    if (Math.abs(interactiveObj.intersectionY - y) <= 7) {
        ctx.beginPath();
        var x = Math.abs(interactiveObj.intersectionY - y);
        if (x > 3) {
            ctx.arc(interactiveObj.intersectionX + 10, interactiveObj.intersectionY + 2, 6, 0, 2 * Math.PI);
        }
        else { 
            ctx.arc(interactiveObj.intersectionX + x, interactiveObj.intersectionY, 6, 0, 2 * Math.PI);
        }
        ctx.fillStyle = 'red';
        ctx.fill();
        $("#text1").show();
        $("#text1").css({ "left": (interactiveObj.intersectionX - 40) + "px", "top": (y + 50) + "px" });
        return;
    }
    else {
        $("#text1").hide();
        return;
    }
}

questionInteractive.prototype.coordText = function () {
    var x1Dis = interactiveObj.centroid[0] - interactiveObj.v1x;
    var y1Dis = interactiveObj.centroid[1] - interactiveObj.v1y;
    var x2Dis = interactiveObj.centroid[0] - interactiveObj.v2x;
    var y2Dis = interactiveObj.centroid[1] - interactiveObj.v2y;
    var x3Dis = interactiveObj.centroid[0] - interactiveObj.v3x;
    var y3Dis = interactiveObj.centroid[1] - interactiveObj.v3y;
    ctx.font = "16px MS Comic Sans";
    var a1x = -5;
    var a2x = -5;
    var a3x = -5;
    var a1y = -5;
    var a2y = -5;
    var a3y = -5;
    if (interactiveObj.v1x > interactiveObj.centroid[0]) {
        var a1x = 5;
    }
    if (interactiveObj.v2x > interactiveObj.centroid[0]) {
        var a2x = 5;
    }
    if (interactiveObj.v3x > interactiveObj.centroid[0]) {
        var a3x = 5;
    }
    if (interactiveObj.v1y > interactiveObj.centroid[1]) {
        var a1y = 5;
    }
    if (interactiveObj.v2y > interactiveObj.centroid[1]) {
        var a2y = 5;
    }
    if (interactiveObj.v3y > interactiveObj.centroid[1]) {
        var a3y = 10;
    }
    ctx.fillStyle = 'black';
    ctx.fillText("A'", interactiveObj.v1x + a1x, interactiveObj.v1y + a1y);
    ctx.fillText("B'", interactiveObj.v2x + a2x, interactiveObj.v2y + a2y);
    ctx.fillText("C'", interactiveObj.v3x + a3x, interactiveObj.v3y + a3y);
}
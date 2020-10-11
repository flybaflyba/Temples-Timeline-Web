

console.log("main.js running")

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var slider = document.getElementById("myrange");
var theta = 5800;
var calculationWidth;
var calculationHeight;
var temple_image_names;
var temple_images;
var spiralCoordinatesAndSizes;
var windowWidth;
var windowHeight;
 

window.onload = function() {

    resizeCanvas();

    slider.value = theta;

    // load images according to image names array
    temple_images = loadAllImages(temple_image_names);

    // get spiral coodinates and size on each coordinate 
    spiralCoordinatesAndSizes = getSpiralCoordinatesAndSizes();

    drawImages();

    // // draw a spiral, let's see how it looks like 
    // ctx.beginPath();
    // ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    // spiralCoordinatesAndSizes.forEach( (coordinate) => {
    //     //console.log(coordinate);
    //     ctx.lineTo(coordinate[0], coordinate[1]);
    // });
    // ctx.stroke();

}

window.onchange = function() {


}

function resizeCanvas() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    calculationWidth = Math.min(windowWidth * 0.7, windowHeight * 0.7);
    calculationHeight = Math.min(windowWidth * 0.7, windowHeight * 0.7);

    canvas.width = windowWidth * 1.0;
    canvas.height = windowHeight * 0.8;
}

function windowResizingDoSomething() {
    //console.log("window resizing")
    resizeCanvas();
    spiralCoordinatesAndSizes = getSpiralCoordinatesAndSizes();
    drawImages();
}

function sliderChange() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    theta = slider.value;
    // console.log(theta);
    // update canvas with new theta 
    drawImages();

}

function drawImages() {
    // place all images on canvas 
    for (i = 0; i < temple_image_names.length; i ++) {
        //console.log('drawing temple number ' + i);
        var position_index = theta - 30 * i;
        if (position_index > 0 && position_index < spiralCoordinatesAndSizes.length) {
            var currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
            var currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
            var currentSize = spiralCoordinatesAndSizes[position_index][2];
            ctx.drawImage(temple_images[i], currentX, currentY, currentSize, currentSize);
        }
    }
}


// Get all coordinates and size on each coordinate
function getSpiralCoordinatesAndSizes() {
    var spiralCoordinatesAndSizes = [];
    for (t = -25; t < 17.5; t += 0.02) { // used in other versions: t = -18
        // float x = centerX + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.cos(t));
        // float y = centerY + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.sin(t));
    
        var initialR = calculationWidth / 10;

        var centerX = canvas.getBoundingClientRect().width * 0.525;
        var centerY = canvas.getBoundingClientRect().height * 0.55;

        var x = centerX + initialR * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(t));
        var y = centerY + initialR * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(t));
        //console.log(x + " and " + y);
    
        var tOuter = t + 2 * Math.PI;
        var xOuter = centerX + initialR * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(tOuter));
        var yOuter = centerY + initialR * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(tOuter));
        var size = Math.sqrt(Math.pow(Math.abs(x - xOuter), 2) + Math.pow(Math.abs(y - yOuter), 2)) * 0.73;
        //console.log(size);
    
        spiralCoordinatesAndSizes.push([x, y, size]);
    }
    return spiralCoordinatesAndSizes.reverse();
}

//Load all temple images into an array 
function loadAllImages(temple_image_names) {
    var temple_images = [];
    for (i = 0; i < temple_image_names.length; i ++) {
        //console.log('temple_images/' + temple_image_names[i] + '_large.webp');
        var oneTemple = new Image();
        oneTemple.src = 'temple_images/' + temple_image_names[i] + '_large.webp';
        temple_images.push(oneTemple);
    }
    return temple_images;
}


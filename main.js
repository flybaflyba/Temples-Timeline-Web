

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
var intervalID;
 

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


function sliderReleased() {

    // effect 2-1, instant change and slow animation 
    // jump theta to a value that's close to the slider.value, but remain circles at it's psotion, that's why we use the number 30
    // var diff = Math.abs(theta - slider.value);
    // if (theta < slider.value) {
    //     theta = theta + Math.floor(diff / 30) * 30 - 30 * 5;
    // } else if (theta > slider.value) {
    //     theta = theta - Math.floor(diff / 30) * 30 + 30 * 5;
    // } 

    //clearInterval(intervalID);
    //intervalID = window.setInterval(animationDraw, 10);


}

function sliderChanging() {
    // theta = slider.value;
    // drawImages();

    var diff = slider.value - theta;
    var oldTheta = theta;
    animate({
        duration: 1000,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {
          theta = Math.floor(oldTheta + progress * diff);
          //console.log("theta " + theta + " slider.value " + slider.value);
          drawImages();
        }
      });

}

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    let requestId;

    cancelAnimationFrame(requestId);

    requestId = requestAnimationFrame(function animate(time) {
      // timeFraction 从 0 增加到 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // 计算当前动画状态
      let progress = timing(timeFraction);
  
      draw(progress); // 绘制
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

function animationDraw() {

    // update canvas with new theta 

    // effect 1, fast animation 
    if (theta < slider.value) {
        theta = theta + 31; // (slider.value - theta) / 10;
    } else if (theta > slider.value) {
        theta = theta - 31; // (theta - slider.value) / 10;
    } 

    // effect 2-2, instant change and slow animation 
    // if (theta < slider.value) {
    //     theta = theta + 1; // (slider.value - theta) / 10;
    // } else if (theta > slider.value) {
    //     theta = theta - 1; // (theta - slider.value) / 10;
    // } 

    if (Math.abs(slider.value - theta) <= 31 || Math.abs(theta - slider.value) <= 31) { // i'm using abs, so a single one should work, but it's not... i have to use both...
        clearInterval(intervalID);
    }

    drawImages();
}


function drawImages() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // place all images on canvas 
    for (i = 0; i < temple_image_names.length; i ++) {
        //console.log('drawing temple number ' + i);
        var position_index = theta - 30 * i;
        var currentX;
        var currentY;
        var currentSize;
        if (position_index > 0 && position_index < spiralCoordinatesAndSizes.length) {      
            currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
            currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
            currentSize = spiralCoordinatesAndSizes[position_index][2];
            ctx.drawImage(temple_images[i], currentX, currentY, currentSize, currentSize);
            //console.log("drawing each");
        }
    }

}




// Get all coordinates and size on each coordinate
function getSpiralCoordinatesAndSizes() {
    var spiralCoordinatesAndSizes = [];
    var initialR;
    var centerX;
    var centerY;
    var x;
    var y;
    var tOuter;
    var xOuter;
    var yOuter;
    var size;
    for (t = -25; t < 17.5; t += 0.02) { // used in other versions: t = -18
        // float x = centerX + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.cos(t));
        // float y = centerY + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.sin(t));
    
        initialR = calculationWidth / 10;

        centerX = canvas.getBoundingClientRect().width * 0.525;
        centerY = canvas.getBoundingClientRect().height * 0.55;

        x = centerX + initialR * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(t));
        y = centerY + initialR * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(t));
        //console.log(x + " and " + y);
    
        tOuter = t + 2 * Math.PI;
        xOuter = centerX + initialR * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(tOuter));
        yOuter = centerY + initialR * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(tOuter));
        size = Math.sqrt(Math.pow(Math.abs(x - xOuter), 2) + Math.pow(Math.abs(y - yOuter), 2)) * 0.73;
        //console.log(size);
    
        spiralCoordinatesAndSizes.push([x, y, size]);
    }

    for (xTop = x; xTop <= canvas.width + size; xTop += size / 30) {
        spiralCoordinatesAndSizes.push([xTop, y, size]);
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


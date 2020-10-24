

console.log("main.js running")

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var slider = document.getElementById("myrange");
var theta = 5800;
var calculationWidth;
var calculationHeight;
var temple_image_names;
var temple_images_objects;
var spiralCoordinatesAndSizes;
var windowWidth;
var windowHeight;
var intervalID;
var initialImagesDone = false;
var firstDraw = true;
var centerX;
var centerY;
 


//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="display: none; "><div id="over" style=" position: absolute;top: 0;left: 0; width: 100%;height: 100%; background-color: #f5f5f5;opacity:0.5;z-index: 1000;"></div><div id="layout" style="position: absolute;top: 40%; left: 40%;width: 20%; height: 20%;  z-index: 1001;text-align:center;"><p>loading now</p></div></div>';
//呈现loading效果
document.write(_LoadingHtml);
 
//移除loading效果
function completeLoading() {  
		document.getElementById("loadingDiv").style.display="none";
}
//展示loading效果
function showLoading()
{
document.getElementById("loadingDiv").style.display="block";
}

showLoading();


window.onload = function() {


    var loadingTimeInterval = setInterval(() => {
        // console.log(initialImagesDone);
        if (initialImagesDone) {
            clearInterval(loadingTimeInterval);
            completeLoading();
        }
    }, 1000);


    resizeCanvas();

    slider.value = theta;

    // load images according to image names array
    temple_images_objects = loadAllImages(temple_image_names);

    // get spiral coodinates and size on each coordinate 
    spiralCoordinatesAndSizes = getSpiralCoordinatesAndSizes();

    myTimeOut = setTimeout(
        function(){ 
            drawImages();
            initialImagesDone = true; }
        , 3000);

    // // draw a spiral, let's see how it looks like 
    // ctx.beginPath();
    // ctx.moveTo(canvas.width / 2, canvas.height / 2);
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

}

function sliderChanging() {
    firstDraw = false;
    theta = slider.value;
    drawImages();

    // var myTimeOut;
    // // clearTimeout(myTimeOut); // there are many slider change events, everytime we start a new one, if the first one has not started, we will cancel it
    // //console.log("start animation delay");
    // var diff = slider.value - theta;
    // var oldTheta = theta;
    // var duration = Math.abs(diff / 3.4);
    // // we set a delay to spiral next movement, so that when slider move very slowly, the image movements are not jerky 
    // myTimeOut = setTimeout(
    //     function(){ 
    //         animate({
    //             duration: duration,
    //             timing: function(timeFraction) {
    //               return timeFraction;
    //             },
    //             draw: function(progress) {
    //               theta = Math.floor(oldTheta + progress * diff);
    //               // console.log("theta " + theta + " slider.value " + slider.value);
    //               drawImages();
    //             }
    //           }); }
    //     , 30);

}

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    let requestId;

    // cancelAnimationFrame(requestId); // there are mant slider change events, everytime we start a new one, if the first one has not finished, we will cancel it


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


function animateEachImage(position_index, currentX, currentY, currentSize, key) {
    
    var diffX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2 - currentX;
    var diffY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2; - currentY;
    var diffSize = spiralCoordinatesAndSizes[position_index][2] - currentSize;
    var oldCurrentX = currentX;
    var oldCurrentY = currentY;
    var oldCurrentSize = currentSize;
    animate({
        duration: 1000,
        timing: function(timeFraction) {
            return timeFraction;
        },
        draw: function(progress) {
            // console.log(progress);
            // console.log(temple_images[key]);
            currentX = Math.floor(oldCurrentX + progress * diffX);
            currentY = Math.floor(oldCurrentY + progress * diffY);
            currentSize = Math.floor(oldCurrentSize + progress * diffSize);
            ctx.drawImage(temple_images_objects[key].image, currentX, currentY, currentSize, currentSize);    
        }
    });
    
}

function drawImages() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.keys(temple_images_objects).forEach(function(key) {

        var position_index = theta - 30 * key;
        var currentX;
        var currentY;
        var currentSize;
        if (firstDraw) {
            if (position_index > 0 && position_index < spiralCoordinatesAndSizes.length) {    
                currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
                currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
                currentSize = spiralCoordinatesAndSizes[position_index][2];
                ctx.drawImage(temple_images_objects[key].image, currentX, currentY, currentSize, currentSize);
                //console.log("drawing each");
            } else {
                ctx.drawImage(temple_images_objects[key].image, centerX-5, centerY-5, 10, 10);
            }
        } else {
            if (position_index > 0 && position_index < spiralCoordinatesAndSizes.length) {    
                // setTimeout(function(){
                //     currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
                //     currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
                //     currentSize = spiralCoordinatesAndSizes[position_index][2];
                //     animateEachImage(position_index, currentX, currentY, currentSize, key);
                // },0)
                currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
                currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
                currentSize = spiralCoordinatesAndSizes[position_index][2];
                ctx.drawImage(temple_images_objects[key].image, currentX, currentY, currentSize, currentSize);

                
            } else {
                ctx.drawImage(temple_images_objects[key].image, centerX-5, centerY-5, 10, 10);
            }
            
        }
    });


    // // place all images on canvas 
    // for (i = 0; i < temple_image_names.length; i ++) {
    //     //console.log('drawing temple number ' + i);
    //     var position_index = theta - 30 * i;
    //     var currentX;
    //     var currentY;
    //     var currentSize;
    //     if (position_index > 0 && position_index < spiralCoordinatesAndSizes.length) {    
    //         currentX = spiralCoordinatesAndSizes[position_index][0] - spiralCoordinatesAndSizes[position_index][2] / 2;
    //         currentY = spiralCoordinatesAndSizes[position_index][1] - spiralCoordinatesAndSizes[position_index][2] / 2;
    //         currentSize = spiralCoordinatesAndSizes[position_index][2];
    //         ctx.drawImage(temple_images[i], currentX, currentY, currentSize, currentSize);
    //         //console.log("drawing each");
    //     } else {
    //         ctx.drawImage(temple_images[i], centerX-5, centerY-5, 10, 10);
    //     }
        
    // }



}


// Get all coordinates and size on each coordinate
function getSpiralCoordinatesAndSizes() {
    var spiralCoordinatesAndSizes = [];
    var initialR;
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
    //var temple_images = [];
    var temple_images_objects = [];
    for (i = 0; i < temple_image_names.length; i ++) {
        //console.log('temple_images/' + temple_image_names[i] + '_large.webp');
        var oneTemple = new Image();
        oneTemple.src = 'temple_images/' + temple_image_names[i] + '_large.webp';
        //temple_images.push(oneTemple);
        var temple_image_object = {
            image: oneTemple,
            currentX: -1,
            currentY: -1,
            currentSize: -1,
            lastX: -1,
            lastY: -1,
            lastSize: -1,
        };
        temple_images_objects.push(temple_image_object);

    }
    //return temple_images;
    return temple_images_objects;
}


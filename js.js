

window.onload = function() {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(1080 / 2, 1980 / 2);

    // read image names from a file 
    var temple_image_names = readTextFile("temple_image_names.txt");
    // load images according to image names array
    temple_images = loadAllImages(temple_image_names);

    // get spiral coodinates and size on each coordinate 
    var spiralCoordinatesAndSizes = getSpiralCoordinatesAndSizes();

    // draw a spiral, let's see how it looks like 
    spiralCoordinatesAndSizes.forEach( (coordinate) => {
        //console.log(coordinate);
        ctx.lineTo(coordinate[0], coordinate[1]);
    });
    ctx.stroke();

    // place all images on canvas 
    for (i = 0; i < temple_image_names.length; i ++) {
        //console.log('drawing temple number ' + i);

        var position_index = 2000 - 30 * i;

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
    for (t = -18; t < 17.5; t += 0.02) {
        // float x = centerX + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.cos(t));
        // float y = centerY + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.sin(t));
    
        var x = 1080 / 2 + 108 * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(t));
        var y = 1980 / 2 + 108 * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(t));
        //console.log(x + " and " + y);
    
        var tOuter = t + 2 * Math.PI;
        var xOuter = 1080 / 2 + 108 * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(tOuter));
        var yOuter = 1980 / 2 + 108 * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(tOuter));
        var size = Math.sqrt(Math.pow(Math.abs(x - xOuter), 2) + Math.pow(Math.abs(y - yOuter), 2)) * 0.73;
        //console.log(size);
    
        spiralCoordinatesAndSizes.push([x, y, size]);
    }
    return spiralCoordinatesAndSizes;
}

// Read image file names 
function readTextFile(file)
{
    var temple_image_names = [];
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        rawFile = new XMLHttpRequest();
    } else { // code for IE6, IE5
        rawFile = new ActiveXObject("Microsoft.XMLHTTP");
    }
    rawFile.onreadystatechange = function ()
    {
        //console.log('readyState=>', rawFile.readyState);
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //alert(allText);
                temple_image_names = allText.split('\n');
                //console.log(array);
            }
        }
    }
    rawFile.open("GET", file, false); // We use 同步, Because we want to use the array, in the following code 
    rawFile.send(null);
    return temple_image_names;
}

// 同步与异步的区别

// 同步请求在请求完成前，后续的程序将处于暂停执行状态。而异步请求，除过请求事件函数中的程序在特定条件下执行外，请求外的程序会紧接着执行。

// 部分属性在同步请求中不可用或受限制，如异步请求可以通过配置属性 timeout 来进行超时设置， 而同步请求则不能配置，如果在同步请求中配置timeout 会抛异常(禁止在同步请求中使用属性 timeout的异常信息)。

// 这就意味着同步请求会阻断之后所有的代码执行，而这并不是大多项目所期望的场景。

// 作者：前端沐先生
// 链接：https://www.jianshu.com/p/9c38191007f2
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

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


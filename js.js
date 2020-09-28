

window.onload = function() {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // ctx.drawImage(temple_1, 10, 10, 100, 100);
    // ctx.drawImage(temple_2, 110, 110, 100, 100);
    // ctx.drawImage(temple_3, 210, 210, 100, 100);

    
    //ctx.drawImage(temple_images[0], 210, 210, 100, 100);


    ctx.beginPath();
    ctx.moveTo(1080 / 2, 1980 / 2);

    spiralCoordinates.forEach( (coordinate) => {
        //console.log(coordinate);
        ctx.lineTo(coordinate[0], coordinate[1]);
    
    });
    
    ctx.stroke();

    console.log('sizes size is ' + sizes.length);

    for (i = 0; i < number_of_temples; i ++) {
        //console.log('drawing temple number ' + i);

        //ctx.drawImage(temple_images[i], 210, 210 + 2 * i, 100, 100);

        var position_index = 2000 - 30 * i;

        if (position_index > 0 && position_index < spiralCoordinatesSize) {
            ctx.drawImage(temple_images[i], spiralCoordinates[position_index][0] - sizes[position_index] / 2,  spiralCoordinates[position_index][1] - sizes[position_index] / 2, sizes[position_index], sizes[position_index]);

            
        console.log('current temple size is ' + sizes[position_index]);
        }

    }



}


// Get all coordinates and size on each coordinate

var spiralCoordinates = [];
var sizes = [];

for (t = -18; t < 17.5; t += 0.02) {
    // float x = centerX + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.cos(t));
    // float y = centerY + initialR * (float) (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (float) (Math.sin(t));

    var x = 1080 / 2 + 108 * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(t));
    var y = 1980 / 2 + 108 * (Math.exp(t * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(t));

    spiralCoordinates.push([x, y]);
    //console.log(x + " and " + y);

    var tOuter = t + Math.PI;
    var xOuter = 1080 / 2 + 108 * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.cos(tOuter));
    var yOuter = 1980 / 2 + 108 * (Math.exp(tOuter * 1 / (Math.tan(47 * Math.PI / 100)))) * (Math.sin(tOuter));

    var size = Math.sqrt(Math.pow(Math.abs(x - xOuter), 2) + Math.pow(Math.abs(y - yOuter), 2)) * 0.255;
    //console.log(size);
    sizes.push(size);

}

var spiralCoordinatesSize = spiralCoordinates.length;

//console.log(spiralCoordinates);

// Read image file names 

var temple_image_names;

function readTextFile(file)
{
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
}

readTextFile("temple_image_names.txt");

//console.log(temple_image_names);

// for (t = 0; t < 226; t += 1) {
//     console.log(temple_image_names[t]);
// }

// 同步与异步的区别

// 同步请求在请求完成前，后续的程序将处于暂停执行状态。而异步请求，除过请求事件函数中的程序在特定条件下执行外，请求外的程序会紧接着执行。

// 部分属性在同步请求中不可用或受限制，如异步请求可以通过配置属性 timeout 来进行超时设置， 而同步请求则不能配置，如果在同步请求中配置timeout 会抛异常(禁止在同步请求中使用属性 timeout的异常信息)。

// 这就意味着同步请求会阻断之后所有的代码执行，而这并不是大多项目所期望的场景。

// 作者：前端沐先生
// 链接：https://www.jianshu.com/p/9c38191007f2
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


// var temple_1 = new Image();
// temple_1.src = 'temple_images/salt_lake_temple_large.webp';
// var temple_2 = new Image();
// temple_2.src = 'provo_temple_large.webp';
// var temple_3 = new Image();
// temple_3.src = 'provo_city_center_temple_large.webp';

console.log("hello");

console.log('temple_image_names.length is ' + temple_image_names.length);

//Get all temple images into an array 

var temple_images = [];

var number_of_temples = temple_image_names.length;
for (i = 0; i < number_of_temples; i ++) {
    //console.log('temple_images/' + temple_image_names[i] + '_large.webp');

    var oneTemple = new Image();
    oneTemple.src = 'temple_images/' + temple_image_names[i] + '_large.webp';

    temple_images.push(oneTemple);

}

console.log('temple_images.length is ' + temple_images.length);

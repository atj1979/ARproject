
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)};
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)};
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)};
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h};

function hexToRGB (hexVal){
	var colorObj ={};
	colorObj.r = hexToR(hexVal);
	colorObj.g = hexToG(hexVal);
	colorObj.b = hexToB(hexVal);
	return colorObj;
};
function getColors(imgData, startIndex){
	return {
				r : imgData.data[startIndex],
				g : imgData.data[startIndex+1],
				b : imgData.data[startIndex+2]
	}
};
function colorFilter(imgData, pixelNum, colorObj, range){
	// will return true or false based on wheter a the pixel color is within the specified range
	// an actual solution will involve color calculation in a color cube.   
	range = range || 100;

	// function colorRange(centerColor, compColor, range){...}
	if (
		colorRange(
			colorObj,
			{
				r : imgData.data[pixelNum],
				g : imgData.data[pixelNum+1],
				b : imgData.data[pixelNum+2]
			}, 
			range))
	{
		return true;
	} else {
		return false;
	}
};

function colorGradient(imgData, pixelNum, colorObj, range){
	//imgData and pixelNum will make up the current pixel, colorObj will make up any comparison pixel.

	// Function will check if it is within a straight line distance of current pixel if the gradient is within the radius ; Similar to colorFilter except the colorObj comes from the current pixel.
	return colorFilter(imgData, pixelNum, colorObj, range);
};



function noiseReduce (imgData, pixelNum, canvasWidth, colorObj, radius, layers){
	radius = radius || 1;
	//Idea - check surrounding radius of pixels to determine if checked pixel is noise or valid object
	//one method is to average the surrounding 8 pixels
	//another method is to count the number of pixels in that 3x3 within the color range.
	//return a true if pixel is valid
	//radius (maximum search radius in pixels) and layers (spaced equalually radius/layers) inputs could lead to changing how 
	//get current x and y
	var count = 0;

	//get surrounding pixel list
		// start topleft x - radius and y - radius
		//if those values are > 0 it's okay to do things
		// get the pixel list line by line.  

	for (var i = 0; i < radius; i++){
		if (colorFilter(imgData, pixelNum+i, colorObj)){
			count++;
		}
	}
	return count>=Math.floor(radius*.75) ? true : false;
	//get list of 8 indicies of pixels to check. Simple - do clockwise
	// check surrounding pixels - do not search within search radius of edge 
};

function colorRange(centerColor, compColor, range){
	//distance = sqrt((r1-r2)^2+(g1-g2)^2+(b1-b2)^2)
	//the formula will be changed such that distance/range will be squared to prevent using Math.sqrt() because it is an expensive operation. Also Math.pow() will not be used because it is also slightly more expensive, because the function call is slightly more expensive. 
	range = range || 50;
	if (
		range * range  >= 
			(centerColor.r - compColor.r) * (centerColor.r - compColor.r) +
			(centerColor.g - compColor.g) * (centerColor.g - compColor.g) +
			(centerColor.b - compColor.b) * (centerColor.b - compColor.b)
	){
		return true;
	} else {
		return false;
	}
};




function xyTranslate (inputIndex, canvasWidth, picData){
	//this function will take any one input from the data and return and object with x, y, r, g, b, a keys & appropriate values.  First values start at 0.
	var result = {};

	// keep referneces to calc number so there aren't multiple calculations for the same stuff.
	var numAll = inputIndex / (canvasWidth * 4);
	var yCalc = Math.floor(numAll);
	var numX = ((numAll - yCalc) * (canvasWidth * 4 ));
	var xCalc = Math.floor( numX / 4 );
	
	//get y - divide by canvas.width to get row
	result.y = yCalc;
	//get x - divide by 4 to get which x pixel.  left of the decimal is which pixel.  
	result.x = xCalc;

	if (picData){
	// get start index the do the count up from there.
	var startInd = Math.floor( inputIndex / 4 ) * 4; 
		result.r = picData[startInd];
		result.g = picData[startInd + 1];
		result.b = picData[startInd + 2];
		result.a = picData[startInd + 3];
	}
	return result;
};

function indexFromXY (x, y, canvasWidth){
	//  will return the index from x and y 
	return x + y * canvasWidth;


};



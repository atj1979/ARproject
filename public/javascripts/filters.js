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

function noiseReduce (imgData, pixelNum, canvasWidth, colorObj, radius, layers){
	radius = radius || 1;
	//Idea - check surrounding radius of pixels to determine if checked pixel is noise or valid object
	//one method is to average the surrounding 8 pixels
	//another method is to count the number of pixels in that 3x3 within the color range.
	//return a true if pixel is valid
	// radius (maximum search radius in pixels) and layers (spaced equalually radius/layers) inputs could lead to changing how 
	//get current x and y
	var count = 0;
	//filter down because I'm tired.
	for (var i = 0; i < radius; i++){
		if (colorFilter(imgData, pixelNum+i, colorObj)){
			count++;
		}
	}
	return count>=Math.floor(radius*.75) ? true : false;

	//get list of 8 indicies of pixels to check. Simple - do clockwise


	// check surrounding pixels - do not search within search radius of edge 
	//check vs method - 
};

function colorRange(centerColor, compColor, range){
	//distance = sqrt((r1-r2)^2+(g1-g2)^2+(b1-b2)^2)
	//the formula will be changed such that distance/range will be squared to prevent using Math.sqrt() because it is an expensive operation. Also Math.pow() will not be used because it is also slightly more expensive, because the function call is slightly more expensive. 
	
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




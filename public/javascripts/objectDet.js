var trackedObjects = {
	nextId : 1

	//objects will be tracked as boxes - because that is easy
	//with a calculated center for frame to frame tracking.

};


var Shape = function (leftMost, rightMost, topMost, bottomMost, pixelCount){
	// id:
	this.leftMost:leftMost,
	this.rightMost:rightMost,
	this.topMost:topMost,
	this.bottomMost:bottomMost,
  this.pixelCount:pixelCount
};

function getNearbyPx (imgData, pixelNum, radius, width){
	// Will return an array of the starting indices of the surrounding pixels.

	var maxRows = imgData.data.length / ( 4 * width); 
	// get current pixel x and y
	var xy = xyTranslate(pixelNum, width);
	var surrPxIndex = [];
	var radius = radius ? radius : 1;
	//skip pixels on edges.
	//is pixel near an edge ?

	if ( xy.x - radius > 0
		&& xy.x + radius < width 
		&& xy.y - radius > 0
		&& xy.y + radius < maxRows 
		) {
			console.log("SHOULD GET INDICIES");
		// double loops here based on radius 
		// this is really a box, where the radius is the shortest distance to an edge
					
		for (var ry = 0; ry <= 2 * radius; ry++){
			for (var rx = 0; rx <= 2 * radius; rx++){
				console.log("radius " + radius + " | " + " rx " + rx + " | " + " ry " + ry); 
				if (ry !== radius || rx !== radius){
					surrPxIndex.push(indexFromXY(xy.x - radius + rx, xy.y - radius + ry, width));
				}
			}
		}

	}
	return surrPxIndex;
};

function bloomSearch (imgData, startIndex, canvasWidth, trackedBuffer){
	//bloom search will search each pixel , compare it to surrounding pixels and decide if that pixel is part of an object.

	//create an empty array that matches the image # of pixels, not the # of RGBA quintuplets

	console.dir(buffer);

	//Method 1:  Bloom search, sense an object if it has pixels around it and search the surrounding pixels - will be recursive

	//bloom searh will be employed for existing objects

	//update image array with number correlating to the object that it is part of 
};


function linearObjSearch (imgData, startIndex, canvasWidth){
	
	//Method 2:  Linear search, if each pixel around it is within the range - (all pixels near the item) see what that that object is (via majority and )
	
	//linear search will find all of the objects first.

	// this function will search each line of the image and get a simple object detection - stored in trackedObjects.
	//if the current pixel is within a color range of the previous 4 pixels (think 3x3 grid of pixels - the first 5 pixels starting top left)

	//getNearbyPx (imgData, pixelNum, radius, width)

	//if 4 of the nearby pixels are close to the center pixel, 
	//the label the the pixel the same as the previous 4 pixels
	//if the previous 4 pixels are matched, but they do not have an object 
	// make a new object with the new id
	

	var nearbyPx = getNearbyPx(imgData, startIndex, 1, canvasWidth);
	var valid = nearbyPx.reduce(function (acc, startInd){
		// console.log(getColors(imgData, startIndex), getColors(imgData, startInd));
		// console.log(colorRange(getColors(imgData, startIndex), getColors(imgData, startInd), 200));
		if (acc){
			return colorRange(getColors(imgData, startIndex), getColors(imgData, startInd), 200);
		} else {
			return false;
		}
	}, true);

	if (valid){
		var index = toBufferIndex(imgData, startIndex, buffer);
		console.log(index);
		if (!buffer[index]){
			buffer[index] = trackedObjects.nextId;
			// var Shape = function (leftMost, rightMost, topMost, bottomMost, pixelCount)

			trackedObjects[trackedObjects.nextId+''] = new Shape();
			nextId++;

		} else {
			buffer[index] = buffer[index-1];
		}
	}
};

function toBufferIndex(imgData, startIndex, buffer){
	var ratio = imgData.data.length/buffer.length;
	// return the 
	return startIndex/ratio 

};

var Shape = function (leftMost, rightMost, topMost, bottomMost, pixelCount){
	this.leftMost:leftMost,
	this.rightMost:rightMost,
	this.topMost:topMost,
	this.bottomMost:bottomMost,
  this.pixelCount:pixelCount
};

function updateTrackedObject (){

	
};



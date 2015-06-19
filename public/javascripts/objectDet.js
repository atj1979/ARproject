var trackedObjects = {
	nextId : 1,
	removeSmallObjects: function (objSize){
		objSize = objSize || 400;
		for (var prop in this){

			if (typeof this[prop] === 'object'){
				if (this[prop].pixelCount < objSize){
					delete this[prop];
				}
				//get rid of things whose combining color is more dark than light
				//decide this by getting the average color of an object
			}
		}


		for( var i = 0; i < buffer.length; i++){
			//if the object is no longer tracked and the buffer does not contain zero
			if ( this[buffer[i]]===undefined && buffer[i] !== 0){
				// console.log("object removed ", buffer[i]);
				buffer[i]= 0;
			}
		}

	},
	resetID: function (){
		// to reset the ID's we would need to also reset the grid of tracked objects as well
		// save the prop number 
		// give it the new number 
		//search the tracked object grid and update everything with the previous number 


		//create an object with the old numbers as keys and the new numbers as values
			// loops through the grid
				// update the grid with grid[position] = object[number in grid]  
	}
	//objects will be tracked as boxes - because that is easy
	//with a calculated center for frame to frame tracking.

};


var Shape = function (ID, leftMost, rightMost, topMost, bottomMost, pixelCount){
	this.id = ID || 0,
	this.leftMost = leftMost || 0,
	this.rightMost = rightMost || 0,
	this.topMost = topMost || 0,
	this.bottomMost = bottomMost || 0,
  this.pixelCount = pixelCount || 1,
  this.redTotal = 0,
  this.greenTotal = 0,
  this.blueTotal = 0
};

Shape.prototype.updateTrackedObject = function (index, width, imgData){ 
	// console.log("updated tracked objects");
	// get the current x & y of the 
	var xy = xyTranslate(index, width, imgData);
	// console.log(xy);
	// this.id = nextId 
	//if the shape was left at an un-initialized state, then update that state
	

	this.leftMost = this.leftMost === 0 || xy.x < this.leftMost ? xy.x : this.leftMost;
	this.rightMost = this.rightMost === 0 || xy.x > this.rightMost ? xy.x : this.rightMost;
	this.topMost = this.topMost === 0 || xy.y < this.topMost ? xy.y : this.topMost;
	this.bottomMost = this.bottomMost === 0 || xy.y > this.bottomMost ? xy.y : this.bottomMost;
	this.pixelCount++;
	this.redTotal += imgData.data[index];
	this.greenTotal += imgData.data[index+1];
	this.blueTotal += imgData.data[index+2];
};

function getNearbyPx (imgData, pixelNum, radius, width){
	// Will return an array of the starting indices of the surrounding pixels.

	var maxRows = imgData.data.length / ( 4 * width); 
	// get current pixel x and y
	var xy = xyTranslate(pixelNum, width);
	// console.log(xy);
	var surrPxIndex = [];
	var radius = radius ? radius : 1;
	//skip pixels on edges.
	//is pixel near an edge ?

	if ( xy.x - radius > 0
		&& xy.x + radius < width 
		&& xy.y - radius > 0
		&& xy.y + radius < maxRows 
		) {
		// double loops here based on radius 
		// this is really a box, where the radius is the shortest distance to an edge

		for (var ry = 0; ry <= 2 * radius; ry+=radius){
			for (var rx = 0; rx <= 2 * radius; rx+=radius){
				// console.log("radius " + radius + " | " + " rx " + rx + " | " + " ry " + ry); 
				if (rx !== radius || ry !== radius ){
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

	// console.dir(buffer);

	//Method 1:  Bloom search, sense an object if it has pixels around it and search the surrounding pixels - will be recursive

	//bloom searh will be employed for existing objects

	//update image array with number correlating to the object that it is part of 
};


function linearObjSearch (imgData, startIndex, canvasWidth, radius){
	
	//Method 2:  Linear search, if each pixel around it is within the range - (all pixels near the item) see what that that object is (via majority and )
	
	//linear search will find all of the objects first.

	// this function will search each line of the image and get a simple object detection - stored in trackedObjects.
	//if the current pixel is within a color range of the previous 4 pixels (think 3x3 grid of pixels - the first 5 pixels starting top left)

	//getNearbyPx (imgData, pixelNum, radius, width)

	//if all of the nearby pixels are close (in color) to the center pixel, 
	//then label the the pixel the same as the previous 4 pixels
	//if the previous 4 pixels are matched, but they do not have an object 
	// make a new object with the new id
	var valid;
	var nearbyPx = getNearbyPx(imgData, startIndex, radius, canvasWidth);
	if (nearbyPx.length > 0){
		valid = nearbyPx.every(function (startInd){
			return colorRange(getColors(imgData, startIndex), getColors(imgData, startInd), 10);
		});
	} else {
		valid = false;
	}
	// console.dir(window.buffer);
	if (valid){
		var rowUp = toBufferIndex(imgData, nearbyPx[0], buffer);
		var index = toBufferIndex(imgData, startIndex, buffer);
		
		//If the buffer does not have an object already existing, make a new Shape to track.
		if (buffer [index-radius]){

			// see if there's a buffer for the previous pixel  the buffer number equal to the line above's buffer - because that has already been calculated
			// use the top left corner of the nearbyPx, that's easy to reason about.
			
			buffer[index] = buffer[index-radius];
			// console.log(trackedObjects[buffer[index]]);
			var something = trackedObjects[String(buffer[index])];
			if (something === undefined ) {
				console.log(index);
			}
			trackedObjects[String(buffer[index])].updateTrackedObject(startIndex, canvasWidth, imgData);
		
		} else if (buffer[rowUp]){

			// set the buffer number equal to the line above's buffer - because that has already been calculated
			// use the top left corner of the nearbyPx, that's easy to reason about.

			buffer[index] = buffer[rowUp];
			// console.log(trackedObjects[buffer[index]]);
			trackedObjects[String(buffer[index])].updateTrackedObject(startIndex, canvasWidth, imgData);

		} else {
			// console.log("new object");
			buffer[index] = trackedObjects.nextId;
			// var Shape = function (leftMost, rightMost, topMost, bottomMost, pixelCount)

			trackedObjects[String(trackedObjects.nextId)] = new Shape();
			trackedObjects[String(trackedObjects.nextId)].updateTrackedObject(startIndex, canvasWidth, imgData);
			trackedObjects.nextId++;
		}
	}
};

function toBufferIndex(imgData, startIndex, buffer){
	// console.dir(imgData.data);
	// console.dir(buffer);
	var ratio = imgData.data.length/buffer.length;
	// return the 
	return startIndex/ratio; 

};

function showBuffer(width){
	//This function only works after the buffer has been populated by snap-picture.
	var line = "";
	var temp = "";
	var numDigit = String(buffer.length);
	console.log(numDigit);
	console.log(numDigit.length);
	for (var i = 0; i < buffer.length; i++){
		//print the line if we're at the end of the row and clear the line var for the next line.
		if (i % width === 0){
			console.log(line);
			line = "";
		}
		temp = String(buffer[i]);
		// console.log(temp, temp.length, numDigit, numDigit.length);
		if (temp.length < numDigit.length){

			//add the right amount of zeros to make the numbers to make a nice grid.
			for ( var j = 0; j< (numDigit.length-temp.length); j++){
				temp = "0" + temp;
				// console.log('0');
			}
		} else {
			console.log('else');
			temp = String(buffer[i]);
		}
		line = line + "|"+ temp+"";
	}
};





//getPixelEdges will evaluate a reference pixel and the surrounding pixels to define any connections between pixels
function getPixelEdges (startInd, imgData, width, radius){
	//first, get the surrounding 8 pixels
	var colorRadius = colorRadius || 20;
	var storage = {};
	var nearby = getNearbyPx(imgData, startIndex, radius, canvasWidth);
	var valid;
	//see if there are relations to each pixel
	if (nearbyPx.length > 0){
		nearbyPx.forEach(function (compareInd){
			if (colorRange(getColors(imgData, startIndex), getColors(imgData, compareInd), colorRadius)){
				//if there are relations, add them to the pixel object.  
				storage[String(compareInd)] = storage[String(compareInd)] || [];
				storage[String(compareInd)].push(compareInd);
			}
		});
	}




	//consolidate the pixel objects into one coherent object with min x, min y, max x, max y
	 







};



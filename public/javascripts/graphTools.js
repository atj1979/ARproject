//d3Parse will take each pixel and group it into individual pixel data.
// [{r:255,g:}]



function imgDataToQuad(imgData, canvasWidth){
	//function will take image data and make nested array quad with rgba values for each one of the quads.  [[R, G, B, A],[R, G, B, A],...] i.e. [[255,255,10,255],...]
	
	
	var result = [];
	for(i = 0; i < len; i += 4) {
		var quad = [];

	  quad[0].push(data[i]);
	  quad[1].push(data[i + 1]);
	  quad[2].push(data[i + 2]);
	  quad[3].push(data[i + 3]);
	  result.push(quad);
	}

	console.dir(result);

	// an alternate method might include var pixels = new Uint8ClampedArray(64); there are some html5 benefits.
	return result;
}
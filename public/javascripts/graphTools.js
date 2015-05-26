//d3Parse will take each pixel and group it into individual pixel data.
// [{r:255,g:}]



function imgDataToQuad(imgData, canvasWidth){
	//function will take image data and make nested array quad with rgba values for each one of the quads.  [[R, G, B, A],[R, G, B, A],...] i.e. [[255,255,10,255],...]
	
	var result = [];
	for(i = 0; i < imgData.data.length; i +=320) {
		var quad = new Array(4);

	  quad[0] =imgData.data[i];
	  quad[1] =imgData.data[i + 1];
	  quad[2] =imgData.data[i + 2];
	  quad[3] =imgData.data[i + 3];
	  result.push(quad);
	}
	// an alternate method might include var pixels = new Uint8ClampedArray(64); there are some html5 benefits.
	return result;
};


function sortPxData(pixelData){
	
	function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
	}

	function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;

    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
	}

	function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
	}
	quickSort(pixelData);

};


function stackedBar(pixelData){




	var width = 960,
	    height = 900;

	var y = d3.scale.linear()
	    .range([height, 0]);

	var chart = d3.select(".chart")
	    .attr("width", width)
	    .attr("height", height);

  y.domain([0, d3.max(pixelData, function(d) { return d[0]+d[1]+d[2]; })]);

  var barWidth = width / pixelData.length;

  var bar = chart.selectAll("g")
      .data(pixelData)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d[0]); })
      .attr("height", function(d) { return height - y(d[0]); })
      .attr("width", barWidth);

  // bar.append("text")
  //     .attr("x", barWidth / 2)
  //     .attr("y", function(d) { return y(d[0]) + 3; })
  //     .attr("dy", ".75em")
  //     .text(function(d) { return d[0]; });





};
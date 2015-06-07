
function imgDataToQuad(imgData, canvasWidth){
	//function will take image data and make nested array quad with rgba values for each one of the quads.  [[R, G, B, A],[R, G, B, A],...] i.e. [[255,255,10,255],...]
	var start = new Date;
	var result = [];
	for(i = 0; i < imgData.data.length; i +=512) {
		var quad = new Array(3);
		

		//  Convert to xyz for 3d plot


		// var quad = {
		// 	x:imgData.data[i],     //Red
		// 	y:imgData.data[i + 1], //Green
		// 	z:imgData.data[i + 2], //Blue
		// 	// q:imgData.data[i + 3]
		// };

	  quad[0] =imgData.data[i];
	  quad[1] =imgData.data[i + 1];
	  quad[2] =imgData.data[i + 2];
	  // quad[3] =imgData.data[i + 3];  //commented out because I do not use it for anything.
	  result.push(quad);
	}
	// an alternate method might include var pixels = new Uint8ClampedArray(64); there are some html5 benefits.
	// console.log(result.length);
	var stop = new Date;
	console.log("Calc time imgDataToQuad",stop-start);
	return result;
};

function scatterPlot(imgData) {
	console.log($('#container').highcharts());
	if ($('#container').highcharts()){
		$('#container').highcharts().destroy();
	}
	pixelData=imgDataToQuad(imgData);
    // Give the points a 3D feel by adding a radial gradient
  Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
      return {
          radialGradient: {
              cx: 0.4,
              cy: 0.3,
              r: 0.5
          },
          stops: [
              [0, color],
              [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
          ]
      };
  });

  // Set up the chart
  var chart = new Highcharts.Chart({
      chart: {
      		showAxes: true,
          renderTo: 'container',
          margin: 100,
          type: 'scatter',
          options3d: {
              enabled: true,
              alpha: 10,
              beta: 30,
              depth: 250,
              viewDistance: 5,

              frame: {
                  bottom: { size: 2, color: 'rgba(0,0,0,0.02)' },
                  back: { size: 2, color: 'rgba(0,0,0,0.04)' },
                  side: { size: 2, color: 'rgba(0,0,0,0.06)' }
              }
          }
      },
      title: {
          text: 'Pixel Color Histogram'
      },
      subtitle: {
          text: 'Click and drag the plot area to rotate in space'
      },
      plotOptions: {
          scatter: {
              width: 255,
              height: 255,
              depth: 255
          }
      },
      yAxis: {
          min: 0,
          max: 255,
          title: "Green"
      },
      xAxis: {
          min: 0,
          max: 255,
          gridLineWidth: 1,
          title:"Red"
      },
      zAxis: {
          min: 0,
          max: 255,
          gridLineWidth: 1,
          title:"Blue"
      },
      legend: {
          enabled: true
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',
          formatter: function() {
            console.dir(this);
            return '<b>Red : ' + this.point.x + '</b><br/><b>Green : ' + this.point.y + '</b><br/><b>Blue : ' +this.point.z+'</b>'
          }, 
          shared: true
      },
      series: [{
          name: 'Color',
          colorByPoint: false,
          data: pixelData
      }]
  });

  // Add mouse events for rotation
  $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
      e = chart.pointer.normalize(e);

      var posX = e.pageX,
          posY = e.pageY,
          alpha = chart.options.chart.options3d.alpha,
          beta = chart.options.chart.options3d.beta,
          newAlpha,
          newBeta,
          sensitivity = 5; // lower is more sensitive

      $(document).bind({
          'mousemove.hc touchdrag.hc': function (e) {
              // Run beta
              newBeta = beta + (posX - e.pageX) / sensitivity;
              newBeta = Math.min(100, Math.max(-100, newBeta));
              chart.options.chart.options3d.beta = newBeta;

              // Run alpha
              newAlpha = alpha + (e.pageY - posY) / sensitivity;
              newAlpha = Math.min(100, Math.max(-100, newAlpha));
              chart.options.chart.options3d.alpha = newAlpha;

              chart.redraw(false);
          },
          'mouseup touchend': function () {
              $(document).unbind('.hc');
          }
      });
  });

};











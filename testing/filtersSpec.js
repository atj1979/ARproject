(function () {
  'use strict';
  var expect = chai.expect;
  var should = chai.should();
  var assert = chai.assert; 
  describe('Filter Spec', function() {
    describe('Helper Functions', function() {
      // imgData will be a 10 by 10 grid to keep it simple
      var imgData = {};
      imgData.data = new Uint8Array(100*4);
      var buffer = new Uint8Array(imgData.data.length/4);
      //   0 1 2 3 4 5 6 7 8 9 
      // 0|_|_|_|_|_|_|_|_|_|_|  x:0,y:0 
      // 1|_|_|_|_|_|_|_|_|_|_|
      // 2|_|_|_|_|_|_|_|_|_|_|
      // 3|_|_|_|_|_|_|_|_|_|_|
      // 4|_|_|_|_|_|_|_|_|_|_|
      // 5|_|_|_|_|_|_|_|_|_|_|
      // 6|_|_|_|_|_|_|_|_|_|_|
      // 7|_|_|_|_|_|_|_|_|_|_|
      // 8|_|_|_|_|_|_|_|_|_|_|
      // 9|_|_|_|_|_|_|_|_|_|_|

      it('xyTranslate', function() {
        assert.deepEqual(xyTranslate(0, 10),{x:0, y:0});
        assert.deepEqual(xyTranslate(4, 10),{x:1, y:0});
        assert.deepEqual(xyTranslate(8, 10),{x:2, y:0});
        assert.deepEqual(xyTranslate(40, 10),{x:0, y:1});
        assert.deepEqual(xyTranslate(180, 10),{x:5, y:4});
        assert.deepEqual(xyTranslate(200, 10),{x:0, y:5});
        assert.deepEqual(xyTranslate(396, 10),{x:9, y:9});
      });
      it('indexFromXY', function() {
        // function indexFromXY (x, y, canvasWidth)
        expect(indexFromXY(0,0,10)).to.equal(0);
        expect(indexFromXY(1,0,10)).to.equal(4);
        expect(indexFromXY(2,0,10)).to.equal(8);
        expect(indexFromXY(0,1,10)).to.equal(40);
        expect(indexFromXY(5,4,10)).to.equal(180);
        expect(indexFromXY(0,5,10)).to.equal(200);
        expect(indexFromXY(9,9,10)).to.equal(396);

      });
      it('colorRange', function (){
        var centerColor = {
          r:10,
          g:10,
          b:10
        };
        var compColor = {
          r:14,
          g:10,
          b:10
        };
        var range = 5
        // function colorRange(centerColor, compColor, range)
        expect(colorRange(centerColor, compColor, range)).to.equal(true);
        range = 3;
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        
        compColor.r = 14;
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        compColor.r = 10;
        expect(colorRange(centerColor, compColor, range)).to.equal(true);        
        compColor.g = 14;
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        compColor.g = 10;
        expect(colorRange(centerColor, compColor, range)).to.equal(true);
        compColor.b = 14; 
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        compColor.b = 10;

        centerColor.r = 14;
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        centerColor.r = 10;
        expect(colorRange(centerColor, compColor, range)).to.equal(true);        
        centerColor.g = 14;
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        centerColor.g = 10;
        expect(colorRange(centerColor, compColor, range)).to.equal(true);
        centerColor.b = 14; 
        expect(colorRange(centerColor, compColor, range)).to.equal(false);
        centerColor.b = 10;

      });
      it('getColors', function (){
        
        imgData.data[4] = 200;
        imgData.data[4+1] = 200;
        imgData.data[4+2] = 200;
        assert.deepEqual(getColors(imgData, 4), {r:200, g:200, b:200});

        imgData.data[44] = 200;
        imgData.data[44+1] = 200;
        imgData.data[44+2] = 200;
        assert.deepEqual(getColors(imgData, 44), {r:200, g:200, b:200});
      });
    });
  });
}());
(function () {
  'use strict';
  var expect = chai.expect;
  var should = chai.should();
  var assert = chai.assert; 
  describe('Object Detection Spec', function() {
    // imgData will be a 10 by 10 grid to keep it simple
    var imgData = {};
    imgData.data = new Uint8Array(100*4);
    var buffer = new Uint8Array(imgData.data.length/4);
    var thing;

    describe('Helper Functions', function() {

      thing = new Shape(1,2,3,4,5,6);
      it('Instantiates a new shape properly', function() {
        expect(thing.id).to.equal(1);
        expect(thing.leftMost).to.equal(2);
        expect(thing.rightMost).to.equal(3);
        expect(thing.topMost).to.equal(4);
        expect(thing.bottomMost).to.equal(5);
        expect(thing.pixelCount).to.equal(6);
      });

      it('toBufferIndex',function (){
        expect(toBufferIndex(imgData, 0, buffer)).to.equal(0);
        expect(toBufferIndex(imgData, 200, buffer)).to.equal(50); 
      });


      it('Shape.updateTrackedObject', function (){
        var thang = new Shape();
        imgData.data[208] = 134 ;
        imgData.data[208+1] = 135;
        imgData.data[208+2] = 136;
        thang.updateTrackedObject(208, 10, imgData);
        
        expect(thang.leftMost).to.equal(2);
        expect(thang.rightMost).to.equal(2);
        expect(thang.topMost).to.equal(5);
        expect(thang.bottomMost).to.equal(5);

        expect(thang.redTotal).to.equal(134);
        expect(thang.greenTotal).to.equal(135);
        expect(thang.blueTotal).to.equal(136);

        expect(thang.pixelCount).to.equal(2);

        imgData.data[252] = 134;
        imgData.data[252+1] = 135;
        imgData.data[252+2] = 136;
        thang.updateTrackedObject(208, 10, imgData);
        console.log(xyTranslate(252, 10, imgData));
        
        expect(thang.leftMost).to.equal(2);
        expect(thang.rightMost).to.equal(3);
        expect(thang.topMost).to.equal(5);
        expect(thang.bottomMost).to.equal(6);

        expect(thang.redTotal).to.equal(268);
        expect(thang.greenTotal).to.equal(270);
        expect(thang.blueTotal).to.equal(272);

        expect(thang.pixelCount).to.equal(3);





      });

    });
  });
}());
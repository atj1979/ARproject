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
        thang.updateTrackedObject(252, 10, imgData);
        expect(thang.leftMost).to.equal(2);
        expect(thang.rightMost).to.equal(3);
        expect(thang.topMost).to.equal(5);
        expect(thang.bottomMost).to.equal(6);
        expect(thang.redTotal).to.equal(268);
        expect(thang.greenTotal).to.equal(270);
        expect(thang.blueTotal).to.equal(272);
        expect(thang.pixelCount).to.equal(3);

        imgData.data[228] = 134;
        imgData.data[228+1] = 135;
        imgData.data[228+2] = 136;
        thang.updateTrackedObject(228, 10, imgData);
        expect(thang.leftMost).to.equal(2);
        expect(thang.rightMost).to.equal(7);
        expect(thang.topMost).to.equal(5);
        expect(thang.bottomMost).to.equal(6);
        expect(thang.redTotal).to.equal(402);
        expect(thang.greenTotal).to.equal(405);
        expect(thang.blueTotal).to.equal(408);
        expect(thang.pixelCount).to.equal(4);

      });

      it('getNearbyPx', function (){
        assert.deepEqual(getNearbyPx(imgData, 0, 1, 10),[]);
        assert.deepEqual(getNearbyPx(imgData, 36, 1, 10),[]);
        assert.deepEqual(getNearbyPx(imgData, 88, 1, 10),[44,48,52,84,92,124,128,132]);
        assert.deepEqual(getNearbyPx(imgData, 228, 1, 10),[184,188,192,224,232,264,268,272]);
        assert.deepEqual(getNearbyPx(imgData, 276, 1, 10),[]);
        assert.deepEqual(getNearbyPx(imgData, 352, 1, 10),[308,312,316,348,356,388,392,396]);
        assert.deepEqual(getNearbyPx(imgData, 360, 1, 10),[]);

      });


    });
  });
}());
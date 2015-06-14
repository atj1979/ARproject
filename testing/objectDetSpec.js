(function () {
  'use strict';
  var expect = chai.expect;
  var should = chai.should();
  var assert = chai.assert; 
  describe('Object Detection Spec', function() {
    var imgData = {};
    // imgData will be a 10 by 10 grid to keep it simple
    imgData.data = new Uint8Array(100*4);
    var buffer = new Uint8Array(imgData.data.length/4);
    describe('Helper Functions', function() {
      var thing = new Shape(1,2,3,4,5,6);
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
        // thing.updateTrackedObject()
      });
      it('Shape.updateTrackedObject', function (){
        
      });


    });
  });
}());
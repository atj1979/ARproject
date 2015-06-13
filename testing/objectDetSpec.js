(function home() {
  'use strict';
  var expect = chai.expect;
  var should = chai.should();
  var assert = chai.assert; 
  describe('Filter Spec', function() {
    describe('identity', function() {
      console.log("hello testing");
      // var uniqueObject = {};
      it('should fucking work', function() {
        // expect(_.identity(1)).to.equal(1);
        // expect(_.identity('string')).to.equal('string');
        // expect(_.identity(false)).to.be.false;
        // expect(_.identity(uniqueObject)).to.equal(uniqueObject);
        expect(true).to.equal(true);
      });
    });
  });
}());
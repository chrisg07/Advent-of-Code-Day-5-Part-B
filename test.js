var assert = require('assert');
const fs = require('fs')
var OceanFloor = require('./OceanFloor.js')

describe('Ocean Floor', function() {
  describe('board should be have 12 overlappint points after test input', function() {
    it('parse test input', function(done) {
      fs.readFile('text-input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      const lines = data.split(/\r?\n/).map(line => line.trim());
      const oceanFloor = new OceanFloor(10, 10, lines);


      // print all lines




      assert.equal(oceanFloor.floor.length, 10);
			assert.equal(oceanFloor.floor[0].length, 10);
			console.log(oceanFloor.floor)
			assert.equal(oceanFloor.getNumPointsOfOverlap(), 12);
      done();
    })
    });
  });
});
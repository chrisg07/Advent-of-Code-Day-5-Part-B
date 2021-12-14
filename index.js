const fs = require('fs')
var OceanFloor = require('./OceanFloor.js')

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

	const lines = data.split(/\r?\n/).map(line => line.trim());
	const oceanFloor = new OceanFloor(1000, 1000, lines);
	console.log(`number of tiles > 1`, oceanFloor.getNumPointsOfOverlap())
})
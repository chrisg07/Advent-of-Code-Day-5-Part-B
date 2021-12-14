var Point = require('./Point.js');

module.exports = class OceanFloor {
  floor = [];

  constructor(width, height, lines) {
		this.initializeFloor(width, height);
		for (let line of lines) {
			if (line) {
				let points = line.split(' -> ');
				console.log(points)
				const pointACoords = points[0].split(',');
				const pointBCoords = points[1].split(',');
				const pointA = new Point(pointACoords[0], pointACoords[1]);
				const pointB = new Point(pointBCoords[0], pointBCoords[1]);
				const isHorizontalOrVertical = pointA.x === pointB.x || pointA.y === pointB.y;
				if (isHorizontalOrVertical) {
					if (pointA.x <= pointB.x && pointA.y <= pointB.y) {
						this.markStraightLineOnFloor(pointA, pointB);
					} else {
						this.markStraightLineOnFloor(pointB, pointA);
					}
				} else {
					this.markDiagnonalLineOnFloor(pointA, pointB);
				}
			}
		}
  }

	initializeFloor(x, y) {
		for (let i = 0; i < x; i++) {
			this.floor[i] = [];
			for (let j = 0; j < y; j++) {
				this.floor[i][j] = 0;
			}
		}
	}
	
	// only works for lines going right or down, points must be sorted
	markStraightLineOnFloor(pointA, pointB) {
		console.log(`Drew line from ${pointA.x},${pointA.y}  to ${pointB.x},${pointB.y}`)
		for (let i = pointA.x; i <= pointB.x; i++) {
			for (let j = pointA.y; j <= pointB.y; j++) {
				this.markPointOnFloor(new Point(i, j))
			}
		}
	}

	markDiagnonalLineOnFloor(pointA, pointB) {
		console.log(`Drew line from ${pointA.x},${pointA.y}  to ${pointB.x},${pointB.y}`)
		if (pointA.x < pointB.x && pointA.y < pointB.y) {
			console.log('southeast')
			for (let i = pointA.x, j = pointA.y; i <= pointB.x && j <= pointB.y; i++, j++) {
				this.markPointOnFloor(new Point(i, j))
			}
		} else if (pointA.x < pointB.x && pointA.y > pointB.y) {
			console.log('northeast')
			for (let i = pointA.x, j = pointA.y; i <= pointB.x && j >= pointB.y; i++, j--) {
				this.markPointOnFloor(new Point(i, j))
			}
		} else if (pointA.x > pointB.x && pointA.y > pointB.y) {
			console.log('northwest')
			for (let i = pointA.x, j = pointA.y; i >= pointB.x && j >= pointB.y; i--, j--) {
				this.markPointOnFloor(new Point(i, j))
			}
		} else if (pointA.x > pointB.x && pointA.y < pointB.y) {
			console.log('southwest')
			for (let i = pointA.x, j = pointA.y; i >= pointB.x && j <= pointB.y; i--, j++) {
				this.markPointOnFloor(new Point(i, j))
			}
		}
	}

	markPointOnFloor(point) {
		this.floor[point.x][point.y] = this.floor[point.x][point.y] + 1;
	}

  getNumPointsOfOverlap() {
		let numPointsOfOverlap = 0;
		for (let i = 0; i < this.floor.length; i++) {
			for (let j = 0; j < this.floor[i].length; j++) {
				if (this.floor[i][j] > 1) {
					numPointsOfOverlap++;
				}
			}
		}
		return numPointsOfOverlap;
  }
}

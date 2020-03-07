import _ from "lodash";

export default class Util {
    static worldToLocal(coords) {
        return coords.map((n, i) => {
            if (i % 2 !== 0) n *= -1;
            n -= 10;
            return n;
        });
    }
    static localToWorld(coords) {
        return coords.map((n, i) => {
            if (i % 2 !== 0) n *= -1;
            n += 10;
            return n;
        });
    }
    static checkWin(playerCoords, goalCoords) {
        if (playerCoords.length !== goalCoords.length) return false;

        playerCoords = _.chunk(playerCoords, 2);
        goalCoords = _.chunk(goalCoords, 2);

        return _(playerCoords)
            .differenceWith(goalCoords, _.isEqual)
            .isEmpty();
    }
    // check to ensure player stays within the grid
    static checkIfInGrid(coords, gridMax) {
        return coords.every(i => Math.abs(i) <= gridMax);
    }
    // need to test thoroughly
    static pointInTri(coords, px, py) {
        const [x1, y1, x2, y2, x3, y3] = coords;
        const origArea = Math.abs(
            (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
        );
        const area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
        const area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
        const area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
        return area1 + area2 + area3 === origArea;
    }
    static getRectBounds(rectCoords) {
        let rXMin = Number.MAX_SAFE_INTEGER;
        let rXMax = Number.MIN_SAFE_INTEGER;
        let rYMin = Number.MAX_SAFE_INTEGER;
        let rYMax = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < rectCoords.length; i++) {
            if (i % 2 !== 0) {
                if (rectCoords[i] < rYMin) rYMin = rectCoords[i];
                else if (rectCoords[i] > rYMax) rYMax = rectCoords[i];
            } else {
                if (rectCoords[i] < rXMin) rXMin = rectCoords[i];
                else if (rectCoords[i] > rXMax) rXMax = rectCoords[i];
            }
        }
        return { rXMin, rXMax, rYMin, rYMax };
    }
    // Check if any points making up the triangle intersect the rect (not interpolated)
    static triPointsInRect(triCoords, rectCoords) {
        const { rXMin, rXMax, rYMin, rYMax } = this.getRectBounds(rectCoords);
        let inWidth, inHeight;
        for (let t = 0; t < triCoords.length; t += 2) {
            inHeight = false;
            inWidth = false;
            let x = triCoords[t];
            let y = triCoords[t + 1];
            if (x >= rXMin && x <= rXMax) {
                inWidth = true;
            }
            if (y >= rYMin && y <= rYMax) {
                inHeight = true;
            }
            if (inWidth && inHeight) return true;
        }
        return false;
    }
    // Transfers a value from one scale to another scale. For example, scale(.5, 0, 1, 10, 20) == 15, and scale(3, 0, 5, 100, 0) == 40.
    static scale(value, min, max, min2, max2) {
        return min2 + ((value - min) / (max - min)) * (max2 - min2);
    }

    static HORIZONTAL = "horizontal";
    static VERTICAL = "vertical";
}

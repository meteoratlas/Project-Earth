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

    static HORIZONTAL = "horizontal";
    static VERTICAL = "vertical";
}

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

        if (
            _(playerCoords)
                .differenceWith(goalCoords, _.isEqual)
                .isEmpty()
        ) {
            return true;
        }
        return false;
    }
    // check to ensure player stays within the grid
    static checkIfInGrid(coords, gridMax) {
        return coords.every(i => Math.abs(i) <= gridMax);
    }
    // need to test thoroughly
    static pointInTri(coords, px, py) {
        const [x1, y1, x2, y2, x3, y3] = this.worldToLocal(coords);
        const origArea = Math.abs(
            (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
        );
        const area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
        const area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
        const area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
        return area1 + area2 + area3 === origArea;
    }
    static HORIZONTAL = "horizontal";
    static VERTICAL = "vertical";
}

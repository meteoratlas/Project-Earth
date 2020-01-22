export default class Transforms {
    static translate(coords, dx, dy) {
        coords = coords.concat();
        for (let i = 0; i < coords.length; i += 2) {
            coords[i] += dx;
            coords[i + 1] += dy;
        }
        return coords;
    }
    static rotate(coords, angle, originX, originY) {
        angle *= Math.PI / 180;
        const angleSin = Math.sin(angle);
        const angleCos = Math.cos(angle);
        let copy = coords.concat();
        let newCoords = [];
        for (let i = 0; i < coords.length; i += 2) {
            newCoords[i] = Math.round(
                (copy[i] - originX) * angleCos +
                    (copy[i + 1] - originY) * angleSin +
                    originX
            );
            newCoords[i + 1] = Math.round(
                (copy[i + 1] - originY) * angleCos -
                    (copy[i] - originX) * angleSin +
                    originY
            );
        }
        return newCoords;
    }
    // https://math.stackexchange.com/questions/1013230/how-to-find-coordinates-of-reflected-point
    // for reflect over line ax+by+c
    static reflect(coords, a, b, c) {
        coords = coords.concat();
        let newCoords = [];
        const aSq = a * a;
        const bSq = b * b;
        for (let i = 0; i < coords.length; i += 2) {
            newCoords[i] =
                ((bSq - aSq) * coords[i] -
                    2 * a * b * coords[i + 1] -
                    2 * a * c) /
                (aSq + bSq);
            newCoords[i + 1] =
                ((aSq - bSq) * coords[i + 1] -
                    2 * a * b * coords[i] -
                    2 * b * c) /
                (aSq + bSq);
        }
        return newCoords;
    }
    static HORIZONTAL = "HORIZONTAL";
    static VERTICAL = "VERTICAL";
}

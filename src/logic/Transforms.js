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
    static reflect(coords, axis) {
        coords = coords.concat();
        const xy = axis === this.HORIZONTAL ? 0 : 1;
        for (let i = 0; i < coords.length; i += 2) {
            coords[i + xy] *= -1;
        }
        return coords;
    }
    static HORIZONTAL = "HORIZONTAL";
    static VERTICAL = "VERTICAL";
}

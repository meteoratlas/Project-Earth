import * as PIXI from "pixi.js-legacy";

export default class GridNumbers extends PIXI.Container {
    constructor(centreX, centreY, cellSize) {
        super();

        const offset = 10;
        const visOffset = 20;

        let numbers = [];
        // horizontal numbers
        for (let i = 0; i <= 20; i += 5) {
            // to skip drawing zero twice
            if (i === 10) continue;
            let t = new PIXI.Text(i - offset, {
                fontSize: 20,
                fill: 0x101010
                // align: "center"
            });
            this.addChild(t);
            t.x = i * cellSize + visOffset / 2;
            t.y = centreY;
            numbers.push(t);
        }
        for (let i = 0; i <= 20; i += 5) {
            // if (i === 10) continue;
            let t = new PIXI.Text(20 - i - offset, {
                fontSize: 20,
                fill: 0x101010
                // align: "center"
            });
            this.addChild(t);
            t.x = centreX + visOffset;
            t.y = i * cellSize - visOffset / 8;
            numbers.push(t);
        }

        this.cacheAsBitmap = true;
    }
}

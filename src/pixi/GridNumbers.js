import * as PIXI from "pixi.js-legacy";

export default class GridNumbers extends PIXI.Container {
    constructor(centreX, centreY, cellSize) {
        super();

        const offset = 10;
        const visOffset = 20;

        let numbers = [];
        // horizontal numbers
        for (let i = 0; i <= 20; i += 2) {
            // to skip drawing zero twice
            if (i === 10) continue;
            let t = new PIXI.Text(i - offset, {
                fontSize: 13,
                fill: 0x101010,
                align: "center"
            });
           t.resolution=5;
            this.addChild(t);
            t.x = i * cellSize + visOffset+1 / 2;
            t.y = centreY;
            numbers.push(t);
            var bubble = new PIXI.Graphics();
            bubble.beginFill(0xee22ee); // sets color
            bubble.drawCircle(t.x-5, t.y+16, 4); // drawCircle(x, y, radius)
            bubble.endFill();
            this.addChild(bubble);
        }
        //vertical number
        for (let i = 0; i <= 20; i += 2) {
            // if (i === 10) continue;
            let t = new PIXI.Text(20 - i - offset, {
                fontSize: 13,
                fill: 0x101010,
                align: "center"
            });
            t.resolution=5;
            this.addChild(t);
            t.x = centreX + visOffset;
            t.y = i * cellSize - visOffset / 8;
            numbers.push(t);
            var bubble = new PIXI.Graphics();
            bubble.beginFill(0xee22ee); // sets color
            bubble.drawCircle(t.x-5, t.y+19, 4); // drawCircle(x, y, radius)
            bubble.endFill();
            this.addChild(bubble);
        }

        this.cacheAsBitmap = true;
    }



}

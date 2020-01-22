import * as PIXI from "pixi.js-legacy";

export default class Grid extends PIXI.Graphics {
    constructor(x, y, width, height) {
        super();
        this.clear();
        this.beginFill(0xffffff);
        this.drawRect(x, y, width, height);
        this.endFill();

        this.lineStyle(2, 0x222222, 1);
        let count = 0;

        for (let index = 0; index <= width; index += width / 20) {
            count === 10
                ? this.lineStyle(2, 0xee22ee, 1)
                : this.lineStyle(2, 0x222222, 1);
            this.moveTo(index + x, y);
            this.lineTo(index + x, height + y);
            count++;
        }
        count = 0;
        for (let index = 0; index <= height; index += height / 20) {
            count === 10
                ? this.lineStyle(2, 0xee22ee, 1)
                : this.lineStyle(2, 0x222222, 1);
            this.moveTo(x, y + index);
            this.lineTo(width + x, index + y);
            count++;
        }
    }
}

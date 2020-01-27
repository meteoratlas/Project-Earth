import * as PIXI from "pixi.js-legacy";
import Util from "../logic/Util";

export default class Goal extends PIXI.Graphics {
    constructor(coords, cellSize) {
        super();
        this.x += 16;
        this.y += 16;
        this.coords = coords;
        this.cellSize = cellSize;
        this.draw();
    }
    setCoords(coords) {
        this.coords = coords;
        this.draw();
    }
    draw() {
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.clear();
        this.beginFill(0x666666);
        this.lineStyle(2);
        this.moveTo(c[0] * size, c[1] * size);
        this.lineTo(c[2] * size, c[3] * size);
        this.lineTo(c[4] * size, c[5] * size);
        this.closePath();
        this.endFill();
    }
}

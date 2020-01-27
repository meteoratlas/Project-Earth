import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";
import Util from "../logic/Util";

export default class Pickup extends PIXI.Graphics {
    constructor(coords, boardSize, cellSize) {
        super();
        this.coords = coords;
        this.boardSize = boardSize;
        this.cellSize = cellSize;
        this.draw();
    }
    draw() {
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.clear();
        this.beginFill(0xee4444);
        this.lineStyle(2);
        // this.moveTo(coords[0] * size, coords[1] * size);
        this.drawStar(this.coords[0], this.coords[1], 6, 6, 1);
        this.closePath();
        this.endFill();
    }
}

import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";
import Util from "../logic/Util";

export default class Pickup extends PIXI.Graphics {
    constructor(coords, boardSize, cellSize) {
        super();
        this.x = 16;
        this.y = 16;
        this.coords = coords;
        this.boardSize = boardSize;
        this.cellSize = cellSize;
        this.draw();
    }
    draw() {
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.clear();
        this.beginFill(0xeeee44);
        this.lineStyle(2);
        this.drawStar(c[0] * size, c[1] * size, 6, 6, 14);
        this.closePath();
        this.endFill();
    }
}

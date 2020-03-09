import * as PIXI from "pixi.js-legacy";
import Util from "../logic/Util";

export default class Goal extends PIXI.Container {
    constructor(cellSize) {
        super();
        this.x += 16;
        this.y += 16;
        this.coords = [];
        this.cellSize = cellSize;
        this.g = new PIXI.Graphics();
        this.addChild(this.g);
    }
    setCoords(coords) {
        this.coords = coords;
        this.draw();
    }
    draw() {
        this.g.removeChild(this.text);
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.g.clear();
        this.g.beginFill(0x666666);
        this.g.lineStyle(2);
        this.g.moveTo(c[0] * size, c[1] * size);
        this.g.lineTo(c[2] * size, c[3] * size);
        this.g.lineTo(c[4] * size, c[5] * size);
        this.g.closePath();
        this.g.endFill();
        this.text = new PIXI.Text("End", {
            fontFamily: "Snippet",
            fontSize: 20,
            fill: "white",
            align: "left"
        });
        let offset = -20;
        if (c[1] < c[5]) offset = 0;
        let x = c[0] * size;
        let y = c[1] * size + offset;
        this.text.position.set(x, y);
        this.g.addChild(this.text);
    }
}

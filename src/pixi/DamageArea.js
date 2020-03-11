import * as PIXI from "pixi.js-legacy";
// import gsap from "gsap";
import Util from "../logic/Util";
import Lava from "../resources/lava-256.png";

export default class DamageArea extends PIXI.Graphics {
    constructor(coords, boardSize, cellSize) {
        super();
        this.x = 16;
        this.y = 16;
        this.boardSize = boardSize;
        this.cellSize = cellSize;
        this.coords = coords;
        this.draw();
    }

    draw() {
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.clear();
        //this.beginFill(0xff0000);
        const lavaTexture = PIXI.Texture.from(Lava);
        this.beginTextureFill({ texture: lavaTexture });
        this.lineStyle(2);

        this.moveTo(c[0] * size, c[1] * size);
        for (let i = 0; i < c.length - 1; i += 2) {
            this.lineTo(c[i] * size, c[i + 1] * size);
        }
        this.closePath();
        this.endFill();
    }
}

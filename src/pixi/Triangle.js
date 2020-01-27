import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";
import Util from "../logic/Util";

export default class Triangle extends PIXI.Graphics {
    constructor(x, y, boardSize, cellSize) {
        super();
        this.x = x;
        this.y = y;
        this.boardSize = boardSize;
        this.cellSize = cellSize;
        this.allowMove = true;
        this.animateSpeed = 0.4;

        // x1,y1,x2,y2,x3,y3
        // change triangle size in this array
        this.coords = [0, 2, 0, 0, 2, 0];
    }
    setCoordinates(newCoords, onComplete) {
        if (!this.allowMove) return;
        this.allowMove = false;
        gsap.to(this.coords, {
            0: newCoords[0],
            1: newCoords[1],
            2: newCoords[2],
            3: newCoords[3],
            4: newCoords[4],
            5: newCoords[5],
            duration: this.animateSpeed,
            ease: "bounce.out",
            onComplete: () => {
                this.allowMove = true;
                onComplete();
            }
        });
    }
    draw() {
        let c = Util.localToWorld(this.coords);
        const size = this.cellSize;
        this.clear();
        this.beginFill(0xee4444);
        this.lineStyle(2);
        this.moveTo(c[0] * size, c[1] * size);
        this.lineTo(c[2] * size, c[3] * size);
        this.lineTo(c[4] * size, c[5] * size);
        this.closePath();
        this.endFill();
    }
}

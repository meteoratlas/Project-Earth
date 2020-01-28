
import * as PIXI from "pixi.js-legacy";
import sparkles from "../resources/sparkles.svg";

export default class CreateStars extends PIXI.Sprite {
    constructor(x, y, size, offset) {
        super();
        let star = new PIXI.Sprite.from(sparkles);
        star.scale = new PIXI.Point(size, size);
        this.delta = 0;
        this.offset = offset;
        star.position.set(x, y);
        this.addChild(star);
    }

    animateStars() {
        this.delta += 0.05;
        this.alpha = Math.sin(this.delta/2)+1+ this.offset; //OPACITY
    }
}


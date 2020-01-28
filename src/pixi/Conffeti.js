
import * as PIXI from "pixi.js-legacy";


export default class Conffeti extends PIXI.Graphics {
    constructor() {
        super();
        this.delta = 0;
    }
    createConffeti() {
        var bubble = new PIXI.Graphics();
        let width= 1024;
        let height= 576;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let radious = 5;
        bubble.beginFill(Math.random() * 0xffffff); // sets color
        bubble.drawCircle(x, y, radious); // drawCircle(x, y, radius)
        // Applies fill to lines and shapes since the last call to beginFill.
        bubble.endFill();
        this.addChild(bubble);
        bubble.speed = 2 + Math.random() * 2;
        return bubble;
    }

    animateConfetti() {
        this.delta += 0.05;
        this.alpha = Math.sin(this.delta/2)+1+ this.offset; //OPACITY
    }
}

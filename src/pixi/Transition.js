import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";

export default class Transition extends PIXI.Graphics {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.x = -width - 80;
        this.y = 0;
        this.tris = 4;
        this.triWidth = 80;
        this.triHeight = height / this.tris;
        this.time = 1;
        this.delay = 0.5;

        this.beginFill(0x000000);
        this.drawRect(0, 0, width, height);

        for (let i = 0; i < this.tris; i++) {
            this.moveTo(width, i * this.triHeight);
            this.lineTo(
                width + this.triWidth,
                this.triHeight * i + this.triHeight / 2
            );
            this.lineTo(width, this.triHeight * i + this.triHeight);
        }
        this.closePath();
        this.endFill();
    }
    transitionIn(pos) {
        gsap.to(this, {
            x: pos,
            duration: this.time,
            delay: this.delay,
            ease: "quint-inout",
            onComplete: this.transitionDone
        });
    }
    transitionOut(pos) {
        gsap.to(this, {
            x: pos,
            duration: this.time,
            delay: this.delay,
            ease: "quint-inout",
            onComplete: this.transitionDone
        });
    }
    transitionDone() {
        //
    }
}

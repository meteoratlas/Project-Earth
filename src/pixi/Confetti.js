import * as PIXI from "pixi.js-legacy";

export default class Confetti extends PIXI.Container {
    constructor() {
        super();
        this.delta = 0;
        this.ticks = 8;
        this.amount = 100;
        for (let i = 0; i < this.amount; i++) {
            this.addChild(this.createPiece());
        }
    }
    createPiece() {
        let bubble = new PIXI.Graphics();
        let width = 1024;
        let height = 576;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let radius = 5;
        bubble.beginFill(Math.random() * 0xffffff); // sets color
        bubble.drawCircle(x, y, radius);
        bubble.endFill();
        this.addChild(bubble);
        return bubble;
    }

    animateConfetti() {
        this.delta += 0.05;
        this.ticks--;
        for (let i of this.children) {
            let rand = Math.round(Math.random());
            i.y += this.ticks > 0 ? -2 : 4;
            i.x += rand + rand - 1;
        }
    }
}

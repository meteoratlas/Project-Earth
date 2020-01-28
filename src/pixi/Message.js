import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";

export default class Message extends PIXI.Graphics {
    constructor(message, x, y, timeout, width, height) {
        super();
        this.x = x;
        this.targetY = y;
        this.y = y + 64;
        this.w = width;
        this.height = height;
        this.animateSpeed = 0.3;
        this.timeout = timeout;
        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: "bold",
            fill: ["#ffffff", "#ff9922"], // gradient
            stroke: "#4a1850",
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.text = new PIXI.Text(message, this.style);
        this.addChild(this.text);
    }
    setText(message) {
        this.text.text = message;
        this.x = this.w / 2 - this.text.width / 2;
        gsap.to(this, {
            y: 50,
            duration: this.animateSpeed,
            delay: 0.3,
            ease: "bounce.out",
            onComplete: () => {}
        });
        setTimeout(() => {
            this.text.text = "";
            this.y += 64;
        }, this.timeout);
    }
}

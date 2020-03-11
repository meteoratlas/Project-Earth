import * as PIXI from "pixi.js-legacy";

export default class TutorialText extends PIXI.Graphics {
    constructor(message, width, height) {
        super();
        this.x = 64; //width / 6;
        this.y = height - 32;

        this.width = width;
        this.height = height;
        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fontStyle: "italic",
            fill: ["#ffffff"],
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: false,
            wordWrapWidth: 440,
            align: "center"
        });
        this.text = new PIXI.Text(message, this.style);
        this.addChild(this.text);
        this.setTutorialText(message);
    }
    setTutorialText(str) {
        this.text.text = str;
        if (!str) return;
        //const animateSpeed = 0.4;

        // this.x = this.width / 3 - this.text.width / 3;
        //const h = this.height - 32;
        // this.y = h;
    }
}

import * as PIXI from "pixi.js-legacy";
import gsap from "gsap";
import TestButton from "../resources/test-button.png";

class LevelComplete extends PIXI.Container {
    constructor(x, y, onReset, onNext) {
        super();
        this.x1 = x;
        this.y1 = y;
        this.y = 2000;
        this.w = 500;
        this.h = 250;
        this.allowInteract = true;
        this.dropOffset = 8;

        const dropShadow = new PIXI.Graphics();
        dropShadow.beginFill(0x000000);
        dropShadow.alpha = 0.3;
        dropShadow.drawRect(
            x - 200 + this.dropOffset,
            y - 125 + this.dropOffset,
            this.w,
            this.h
        );
        this.addChild(dropShadow);

        const backdrop = new PIXI.Graphics();
        backdrop.beginFill(0xaaaaaa);
        backdrop.drawRect(x - 200, y - 125, this.w, this.h);
        this.addChild(backdrop);

        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 38,
            fontWeight: "bold",
            fill: ["#ffffff", "#ff9922"], // gradient
            stroke: "#4a1850",
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: false,
            wordWrapWidth: 440
            // align: "center"
        });
        const LCText = new PIXI.Text("Level Complete!", this.style);

        LCText.x = this.x1 - LCText.width / 2 + 50;
        LCText.y = this.y1 - 110;
        this.addChild(LCText);

        this.scoreStyle = { align: "center" };
        this.scoreText = new PIXI.Text("", this.scoreStyle);
        this.scoreText.x = this.x1 - this.scoreText.width / 2 + 50;
        this.scoreText.y = this.y1 - 30;
        this.addChild(this.scoreText);

        this.resetbutton = new PIXI.Sprite.from(TestButton);
        this.nextButton = new PIXI.Sprite.from(TestButton);
        const buttons = [this.resetbutton, this.nextButton];

        buttons.forEach(b => {
            //b.anchor.set(0.5);
            b.interactive = true;
            b.buttonMode = true;
            b.alpha = 0.7;
            b.on("pointerover", this.onButtonOver);
            b.on("pointerout", this.onButtonOut);
            this.addChild(b);
        });
        this.resetbutton.on("pointerdown", () => {
            if (this.allowInteract) {
                this.allowInteract = false;
                onReset();
            }
        });
        this.resetbutton.x = this.x - 20 + this.resetbutton.width;
        this.resetbutton.y = this.y + this.h + this.resetbutton.height + 40;

        this.nextButton.on("pointerdown", () => {
            if (this.allowInteract) {
                this.allowInteract = false;
                onNext();
            }
        });
        this.nextButton.x = this.x + this.w - this.nextButton.width / 2 + 20;
        this.nextButton.y = this.y + this.h + this.nextButton.height + 40;
    }
    onBegin = (score, maxScore) => {
        this.y = 2000;
        this.scoreText.text = `Score: ${score} / ${maxScore}`;
        this.scoreText.x = this.x1 - this.scoreText.width / 2 + 50;
        gsap.to(this, {
            y: 0,
            duration: 0.6, //this.time,
            delay: 0, //this.delay,
            ease: "quint-inout",
            onUpdate: () => {
                this.nextButton.y =
                    this.y + this.h + this.nextButton.height + 40;
                this.resetbutton.y =
                    this.y + this.h + this.nextButton.height + 40;
            },
            onComplete: () => {
                this.allowInteract = true;
            }
        });
    };
    onEnd() {}
    onButtonOver = b => {
        b.target.alpha = 1;
    };
    onButtonOut = () => {
        this.resetbutton.alpha = this.nextButton.alpha = 0.7;
    };
}
export default LevelComplete;

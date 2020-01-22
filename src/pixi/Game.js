import * as PIXI from "pixi.js-legacy";
import Triangle from "./Triangle";
import Transition from "./Transition";
import keyboard from "../logic/Keyboard";
import Grid from "./Grid";
import GridNumbers from "./GridNumbers";
import Goal from "./Goal";
import Util from "../logic/Util";
import Transforms from "../logic/Transforms";
export default class Game {
    constructor(app, props) {
        this.app = app;
        this.entities = [];
        this.tri = undefined;
        this.goal = undefined;
        this.allowMove = true;
        this.transition = new Transition(1024, 576);
    }
    start() {
        const root = new PIXI.Container();
        const container = new PIXI.Container();
        root.addChild(container);
        this.app.stage.addChild(root);

        // this.app.stage.addChild(container);
        let totalGridSize = 500;
        let cellSize = totalGridSize / 20;
        let grid = new Grid(16, 16, totalGridSize, totalGridSize);

        container.addChild(grid);
        let gridNums = new GridNumbers(
            totalGridSize / 2,
            totalGridSize / 2,
            cellSize
        );

        this.tri = new Triangle(16, 16, totalGridSize, cellSize);
        container.addChild(gridNums);

        this.goal = new Goal([3, 5, 3, 3, 5, 3], cellSize);
        container.addChild(this.goal);
        container.addChild(this.tri);

        this.app.stage.addChild(this.transition);

        // Move container to the center
        container.x = this.app.screen.width / 3;
        container.y = this.app.screen.height / 2;

        // Center sprite in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        console.log(
            `Point is in the triangle:${Util.pointInTri(
                this.tri.coords,
                2,
                -2
            )}`
        );

        // Listen for animate update
        this.app.ticker.add(delta => {
            // use delta to create frame-independent transform
            // container.rotation -= 0.005 * delta;
            if (this.tri) {
                this.tri.draw();
            }
        });
    }
    translate(dx, dy) {
        if (!this.allowMove) return;
        const t = Transforms.translate(this.tri.coords, dx, dy);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    rotate(a, oX, oY) {
        if (!this.allowMove) return;
        const t = Transforms.rotate(this.tri.coords, a, oX, oY);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    reflect(a, b, c) {
        if (!this.allowMove) return;
        const t = Transforms.reflect(this.tri.coords, a, b, c);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    onMoveComplete = () => {
        for (let i in this.entities) {
            if (Util.pointInTri(this.tri.coords, i.x, i.y)) {
            }
        }
        if (Util.checkWin(this.tri.coords, this.goal.coords)) {
            this.allowMove = false;
            this.levelComplete();
        } else {
            this.allowMove = true;
        }
    };
    levelComplete() {
        console.log("You win!");
        this.transition.transitionIn(0);
    }
}

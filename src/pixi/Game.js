import * as PIXI from "pixi.js-legacy";
import Triangle from "./Triangle";
import Transition from "./Transition";
import Message from "./Message";
import Grid from "./Grid";
import GridNumbers from "./GridNumbers";
import Goal from "./Goal";
import Util from "../logic/Util";
import Transforms from "../logic/Transforms";
import levels from "../logic/levels.json";
import bg1 from "../resources/bg1.png";

export default class Game {
    constructor(app, props) {
        this.app = app;
        this.entities = [];
        this.tri = undefined;
        this.goal = undefined;
        this.message = undefined;
        this.allowMove = true; // reset when move turn ends
        this.allowInput = false; // only reset on level reset
        this.transition = new Transition(1024, 576);
        this.currentLevel = 1;
    }
    start() {
        const root = new PIXI.Container();

        const bg = PIXI.Sprite.from(bg1);
        bg.zIndex = -1;
        bg.scale = new PIXI.Point(1.2, 1.2);

        root.addChild(bg);

        const container = new PIXI.Container();
        root.addChild(container);
        this.app.stage.addChild(root);

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

        this.message = new Message(
            "",
            this.app.screen.width / 2 - 80,
            this.app.screen.height / 2,
            2000,
            this.app.screen.width,
            this.app.screen.height
        );
        this.app.stage.addChild(this.message);

        // Listen for animate update
        this.app.ticker.add(delta => {
            if (this.tri) {
                this.tri.draw();
            }
        });
        this.loadLevel(1);
    }
    translate(dx, dy) {
        if (!this.allowMove || !this.allowInput) return;
        this.allowMove = false;
        const t = Transforms.translate(this.tri.coords, dx, dy);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    rotate(a, oX, oY) {
        if (!this.allowMove || !this.allowInput) return;
        this.allowMove = false;
        const t = Transforms.rotate(this.tri.coords, a, oX, oY);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    reflect(a, b, c) {
        if (!this.allowMove || !this.allowInput) return;
        this.allowMove = false;
        const t = Transforms.reflect(this.tri.coords, a, b, c);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    loadLevel(levelIndex, json) {
        this.transition.transitionOut(() => {
            this.tri.coords = levels[levelIndex]["playerCoords"].concat();
            this.goal.setCoords(levels[levelIndex]["goalCoords"].concat());
            this.transition.transitionIn(() => {
                this.allowMove = true;
                this.allowInput = true;
                this.toggleUI();
            });
        });
    }
    onMoveComplete = () => {
        if (!Util.checkIfInGrid(this.tri.coords, 10)) {
            // went outside the grid
            this.allowMove = false;
            this.allowInput = false;
            this.message.setText("Went outside grid!");
            this.loadLevel(this.currentLevel, levels);
            this.toggleUI();
        }

        for (let i in this.entities) {
            if (Util.pointInTri(this.tri.coords, i.x, i.y)) {
            }
        }
        if (Util.checkWin(this.tri.coords, this.goal.coords)) {
            this.levelComplete();
        } else {
            this.allowMove = true;
        }
    };
    levelComplete() {
        this.message.setText("You Win!");
        this.allowMove = false;
        this.allowInput = false;
        if (this.currentLevel >= 3) {
            this.currentLevel = 1;
        } else {
            this.currentLevel++;
        }
        this.resetTable();
        this.toggleUI();
        this.loadLevel(this.currentLevel);
    }
}

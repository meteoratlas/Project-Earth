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
import CreateStars from "./BgAnimation";
import Conffeti from "./Conffeti";
import DamageArea from "./DamageArea";
import Pickup from "./Pickup";

export default class Game {
    constructor(app, props) {
        this.app = app;
        this.pickups = [];
        this.tri = undefined;
        this.goal = undefined;
        this.message = undefined;
        this.container = new PIXI.Container();
        this.obstacles = [];
        this.allowMove = true; // reset when move turn ends
        this.allowInput = false; // only reset on level reset
        this.transition = new Transition(1024, 576);
        this.currentLevel = 1;
        this.conffeti = undefined;
        this.star1 = undefined;
        this.star2 = undefined;
        this.star3 = undefined;
        this.endText = undefined;
    }
    start() {
        const root = new PIXI.Container();
        const bg = PIXI.Sprite.from(bg1);
        bg.zIndex = -1;
        bg.scale = new PIXI.Point(1.2, 1.2);

        root.addChild(bg);

        this.star1 = new CreateStars(600, 50, 0.4, 0.5);
        root.addChild(this.star1);
        this.star2 = new CreateStars(15, 150, 0.2, 0.4);
        root.addChild(this.star2);
        this.star3 = new CreateStars(970, 170, 0.2, 0);
        root.addChild(this.star3);

        // const container = new PIXI.Container();
        root.addChild(this.container);
        this.app.stage.addChild(root);

        let totalGridSize = 500;
        let cellSize = totalGridSize / 20;
        let grid = new Grid(16, 16, totalGridSize, totalGridSize);

        this.container.addChild(grid);
        let gridNums = new GridNumbers(
            totalGridSize / 2,
            totalGridSize / 2,
            cellSize
        );

        this.tri = new Triangle(16, 16, totalGridSize, cellSize);
        this.container.addChild(gridNums);

        this.goal = new Goal([3, 5, 3, 3, 5, 3], cellSize);
        this.container.addChild(this.goal);

        this.container.addChild(this.tri);

        const test1 = new DamageArea(
            [-10, 10, -5, 10, -5, 5, -10, 5],
            totalGridSize,
            cellSize
        );
        this.container.addChild(test1);
        this.obstacles.push(test1);

        const pickup = new Pickup([5, 5], totalGridSize, cellSize);
        this.pickups.push(pickup);
        this.container.addChild(pickup);

        this.app.stage.addChild(this.transition);

        // Move this.container to the center
        this.container.x = this.app.screen.width / 3;
        this.container.y = this.app.screen.height / 2;

        // Center sprite in local container coordinates
        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;

        this.message = new Message(
            "",
            this.app.screen.width / 2 - 80,
            this.app.screen.height / 2,
            2000,
            this.app.screen.width,
            this.app.screen.height
        );
        this.app.stage.addChild(this.message);

        this.loadLevel(this.currentLevel);

        // Listen for animate update
        this.app.ticker.add(delta => {
            if (this.tri) {
                this.tri.draw();
            }
            if (this.star1 && this.star2) {
                this.star1.animateStars();
                this.star2.animateStars();
            }
            if (this.conffeti) {
                this.conffeti.animateConfetti();
            }
        });
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
            this.resetTable();
            this.toggleUI();
        }

        // check collision with pickups
        for (let i of this.pickups) {
            if (Util.pointInTri(this.tri.coords, i.coords[0], i.coords[1])) {
                this.container.removeChild(i);
                this.pickups.splice(this.pickups.indexOf(i), 1);
            }
        }

        for (let i of this.obstacles) {
            for (let j = 0; j < i.coords.length; j += 2) {
                if (
                    Util.pointInTri(
                        this.tri.coords,
                        i.coords[j],
                        i.coords[j + 1]
                    )
                ) {
                    console.log("collide");
                }
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

        this.conffeti = new Conffeti();
        this.app.stage.addChild(this.conffeti);

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

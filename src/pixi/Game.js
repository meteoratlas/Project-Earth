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
import TutorialText from "./TutorialText";
import Intersects from "intersects";

export default class Game {
    constructor(app, props) {
        this.app = app;

        // Level objects
        this.pickups = [];
        this.obstacles = [];
        this.tri = undefined;
        this.goal = undefined;
        this.message = undefined;
        this.container = new PIXI.Container();
        this.transition = new Transition(
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.conffeti = undefined;
        this.star1 = undefined;
        this.star2 = undefined;
        this.star3 = undefined;
        this.tutorialText = new TutorialText(
            "Click the icons in the top right to add movement.",
            this.app.renderer.width,
            this.app.renderer.height
        );

        // Level vars
        this.allowMove = true; // reset when move turn ends
        this.allowInput = false; // only reset on level reset
        this.score = 0;
        this.maxMoves = Number.MAX_SAFE_INTEGER;
        this.currentMoves = 0;
        this.currentLevel = 1;
        this.allowReset = true;
        this.attempts = 0;

        this.totalGridSize = 500;
        this.cellSize = this.totalGridSize / 20;
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

        root.addChild(this.container);
        this.app.stage.addChild(root);

        let grid = new Grid(16, 16, this.totalGridSize, this.totalGridSize);

        this.container.addChild(grid);
        let gridNums = new GridNumbers(
            this.totalGridSize / 2,
            this.totalGridSize / 2,
            this.cellSize
        );
        this.container.addChild(gridNums);

        const updater = () => {
            // Triangle update during movement
            this.collideWithObstacles();
        };

        this.goal = new Goal(this.cellSize);
        this.container.addChild(this.goal);

        this.tri = new Triangle(
            16,
            16,
            this.totalGridSize,
            this.cellSize,
            updater
        );
        this.container.addChild(this.tri);

        root.addChild(this.tutorialText);

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
    collideWithObstacles = () => {
        if (this.obstacles.length > 0) {
            for (let i of this.obstacles) {
                if (Intersects.polygonPolygon(this.tri.coords, i.coords)) {
                    this.resetLevel("Hit an obstacle!");
                }
            }
        }
    };
    resetLevel = resetMsg => {
        if (!this.allowReset) return;
        this.allowReset = false;
        // this.toggleUI();
        this.allowMove = false;
        this.allowInput = false;
        this.score = 0;

        this.message.setText(resetMsg);
        this.resetTable();
        this.loadLevel(this.currentLevel, levels);
    };
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
            this.clearEntities();
            this.tri.coords = levels[levelIndex]["playerCoords"].concat();
            this.goal.setCoords(levels[levelIndex]["goalCoords"].concat());

            const damage = levels[levelIndex]["obstacles"].concat();
            damage.forEach(o => {
                const ob = new DamageArea(
                    [...o],
                    this.totalGridSize,
                    this.cellSize
                );
                this.container.addChild(ob);
                this.obstacles.push(ob);
            });

            const bonus = levels[levelIndex]["bonuses"].concat();
            bonus.forEach(p => {
                const pick = new Pickup(
                    [...p],
                    this.totalGridSize,
                    this.cellSize
                );
                this.container.addChild(pick);
                this.pickups.push(pick);
            });
            this.maxMoves = levels[levelIndex]["maxMoves"];
            this.currentMoves = 0;
            this.allowReset = true;
            this.attempts = 0;

            this.transition.transitionIn(() => {
                this.allowMove = true;
                this.allowInput = true;
                this.score = 0;
                this.toggleUI();
            });
        });
    }
    onMoveComplete = () => {
        this.attempts++;
        if (!Util.checkIfInGrid(this.tri.coords, 10)) {
            // went outside the grid
            this.resetLevel("Went outside the grid!");
        }

        // check collision with pickups
        if (this.pickups.length > 0) {
            for (let i of this.pickups) {
                if (
                    Intersects.polygonPoint(
                        this.tri.coords,
                        i.coords[0],
                        i.coords[1]
                    )
                ) {
                    this.container.removeChild(i);
                    this.pickups.splice(this.pickups.indexOf(i), 1);
                    this.score++;
                }
            }
        }

        this.collideWithObstacles();

        if (Util.checkWin(this.tri.coords, this.goal.coords)) {
            this.levelComplete();
        } else {
            this.allowMove = true;
        }
    };
    clearEntities = () => {
        for (let i of this.pickups) {
            this.container.removeChild(i);
        }
        for (let i of this.obstacles) {
            this.container.removeChild(i);
        }
        this.pickups.length = this.obstacles.length = 0;
    };
    levelComplete() {
        this.message.setText("Level Complete!");

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
        // this.toggleUI();
        this.loadLevel(this.currentLevel);
    }
    reportAttempt(user, success) {
        return {
            userID: user,
            level: this.currentLevel,
            furthestLevel: this.currentLevel, // TODO
            numberOfAttempts: this.attempts,
            numberOfMoves: this.currentMoves,
            success: success,
            score: this.score
            // assemble time-based info on server
        };
    }
}

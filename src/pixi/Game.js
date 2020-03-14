import * as PIXI from "pixi.js-legacy";
import Triangle from "./Triangle";
import Transition from "./Transition";
import Grid from "./Grid";
import GridNumbers from "./GridNumbers";
import Goal from "./Goal";
import Util from "../logic/Util";
import Transforms from "../logic/Transforms";
import levels from "../logic/levels.json";
import bg1 from "../resources/bg1.png";
import Confetti from "./Confetti";
import DamageArea from "./DamageArea";
import Pickup from "./Pickup";
import TutorialText from "./TutorialText";
import Intersects from "intersects";
import LevelComplete from "./LevelComplete";

export default class Game {
    constructor(app, props) {
        this.app = app;

        // Level vars
        this.allowMove = true; // reset when move turn ends
        this.allowInput = false; // only reset on level reset
        this.score = 0;
        this.maxScore = 0;
        this.completeLevelValue = 500;
        this.collectItemValue = 100;
        this.maxMoves = Number.MAX_SAFE_INTEGER;
        this.currentMoves = 0;
        this.currentLevel = 1;
        this.maxLevels = 5;
        this.allowReset = true;
        this.attempts = 0;

        this.totalGridSize = 500;
        this.cellSize = this.totalGridSize / 20;
        this.updater = () => {
            this.collideWithObstacles();
            this.collideWithPickups();
        };

        // Level objects
        this.pickups = [];
        this.obstacles = [];
        this.tri = new Triangle(
            16,
            16,
            this.totalGridSize,
            this.cellSize,
            this.updater
        );
        this.goal = new Goal(this.cellSize);
        this.container = new PIXI.Container();
        this.root = new PIXI.Container();
        this.transition = new Transition(
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.confetti = null;
        this.tutorialText = new TutorialText(
            "Click the icons in the top right to add movement.",
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.completeModal = new LevelComplete(
            this.app.screen.width / 3,
            this.app.screen.height / 2,
            this.userRequestsResetLevel,
            this.userRequestNextLevel
        );
    }
    start() {
        const bg = PIXI.Sprite.from(bg1);
        bg.zIndex = -1;
        bg.scale = new PIXI.Point(1.2, 1.2);

        this.root.addChild(bg);

        this.root.addChild(this.container);
        this.app.stage.addChild(this.root);

        const grid = new Grid(16, 16, this.totalGridSize, this.totalGridSize);
        this.container.addChild(grid);

        const gridNums = new GridNumbers(
            this.totalGridSize / 2,
            this.totalGridSize / 2,
            this.cellSize
        );
        this.container.addChild(gridNums);

        this.container.addChild(this.goal);
        this.container.addChild(this.tri);

        this.root.addChild(this.tutorialText);
        this.root.addChild(this.completeModal);

        this.app.stage.addChild(this.transition);

        // Move this.container to the center
        this.container.x = this.app.screen.width / 3;
        this.container.y = this.app.screen.height / 2;

        // Center sprite in local container coordinates
        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;

        this.loadLevel(this.currentLevel);

        // Listen for animate update
        this.app.ticker.add(delta => {
            if (this.tri) {
                this.tri.draw();
            }
            if (this.confetti) {
                this.confetti.animateConfetti();
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
    collideWithPickups = () => {
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
                    this.score += this.collectItemValue;
                }
            }
        }
    };
    resetLevel = () => {
        if (!this.allowReset) return;
        this.allowReset = false;
        this.allowMove = false;
        this.allowInput = false;
        this.score = 0;
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
    loadLevel(levelIndex) {
        this.completeModal.y = 2000;
        this.maxScore = 0;
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
                this.maxScore += this.collectItemValue;
            });
            this.maxMoves = Object.keys(levels).length;
            if (levels[levelIndex]["message"]) {
                this.tutorialText = new TutorialText(
                    levels[levelIndex]["message"],
                    this.app.renderer.width,
                    this.app.renderer.height
                );
                this.root.addChild(this.tutorialText);
            }
            this.currentMoves = 0;
            this.allowReset = true;
            this.attempts = 0;

            this.transition.transitionIn(() => {
                this.allowMove = true;
                this.allowInput = true;
                this.score = 0;
                this.toggleUI();
            });
            // add points for completing level
            this.maxScore += this.completeLevelValue;
        });
    }
    onMoveComplete = () => {
        this.attempts++;
        if (!Util.checkIfInGrid(this.tri.coords, 10)) {
            // went outside the grid
            this.resetLevel("Went outside the grid!");
        }
        this.collideWithPickups();
        this.collideWithObstacles();
        if (Util.checkWin(this.tri.coords, this.goal.coords)) {
            this.levelComplete();
        } else {
            this.allowMove = true;
        }
    };
    clearEntities = () => {
        this.root.removeChild(this.tutorialText);
        for (let i of this.pickups) {
            this.container.removeChild(i);
        }
        for (let i of this.obstacles) {
            this.container.removeChild(i);
        }
        this.pickups.length = this.obstacles.length = 0;
    };
    levelComplete() {
        this.score += this.completeLevelValue;

        this.confetti = new Confetti();
        this.app.stage.addChild(this.confetti);
        this.completeModal.onBegin(this.score, this.maxScore);

        this.allowMove = false;
        this.allowInput = false;
    }
    userRequestNextLevel = () => {
        if (this.currentLevel >= this.maxMoves) {
            this.currentLevel = 1;
        } else {
            this.currentLevel++;
        }
        this.resetTable();
        this.loadLevel(this.currentLevel);
    };
    userRequestsResetLevel = () => {
        this.resetTable();
        this.loadLevel(this.currentLevel);
    };
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

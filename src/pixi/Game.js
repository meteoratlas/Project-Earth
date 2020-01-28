import * as PIXI from "pixi.js-legacy";
import Triangle from "./Triangle";
import Transition from "./Transition";
import Message from "./Message";
import Grid from "./Grid";
import GridNumbers from "./GridNumbers";
import Goal from "./Goal";
import Util from "../logic/Util";
import Transforms from "../logic/Transforms";
import Pickup from "./Pickup";
import levels from "../logic/levels.json";
import bg1 from "../resources/bg1.png";
import CreateStars from "./BgAnimation";
import Conffeti from "./Conffeti";

export default class Game {
    constructor(app, props) {
        this.app = app;
        this.entities = [];
        this.tri = undefined;
        this.goal = undefined;
        this.message = undefined;
        this.allowMove = true;
        this.transition = new Transition(1024, 576);
        this.currentLevel = 1;
        this.star1 = undefined;
        this.star2 = undefined; 
        this.star3 = undefined;   
    }
    start() {
        const root = new PIXI.Container();
        const bg = PIXI.Sprite.from(bg1);
        bg.zIndex = -1;
        bg.scale = new PIXI.Point(1.2, 1.2);
        // bg.width = this.app.width;
        // bg.height = this.app.height;
        root.addChild(bg);
    
        this.star1=new CreateStars(600, 50, 0.4, 0.5);
        root.addChild(this.star1);
        this.star2=new CreateStars(15, 150, 0.2, 0.4);
        root.addChild(this.star2);
        this.star3=new CreateStars(970, 170, 0.2, 0);
        root.addChild(this.star3);
      
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

        container.addChild(new Pickup([-3, 2], totalGridSize, cellSize));

        this.app.stage.addChild(this.transition);

        // Move container to the center
        container.x = this.app.screen.width / 3;
        container.y = this.app.screen.height / 2;

        // Center sprite in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        this.message = new Message("", 300, 400, 3000);
        this.app.stage.addChild(this.message);

        // Listen for animate update
        this.app.ticker.add(delta => {
            // use delta to create frame-independent transform
            // container.rotation -= 0.005 * delta;
            if (this.tri) {
                this.tri.draw();
            };
            if (this.star1 && this.star2) {
                this.star1.animateStars();
                this.star2.animateStars();
            }

        });

       

    }
    translate(dx, dy) {
        if (!this.allowMove) return;
        this.allowMove = false;
        const t = Transforms.translate(this.tri.coords, dx, dy);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    rotate(a, oX, oY) {
        if (!this.allowMove) return;
        this.allowMove = false;
        const t = Transforms.rotate(this.tri.coords, a, oX, oY);
        this.tri.setCoordinates(t, this.onMoveComplete);
    }
    reflect(a, b, c) {
        if (!this.allowMove) return;
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
            });
        });
    }
    onMoveComplete = () => {
        if (!Util.checkIfInGrid(this.tri.coords, 10)) {
            // went outside the grid
            this.allowMove = false;
            this.loadLevel(this.currentLevel, levels);
        }

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
        this.message.setText("You Win!");

        const container = new PIXI.Container;
        this.app.stage.addChild(container);
        const conffeti= new Conffeti()
        for (let i = 0; i < 200; i++) {
            container.addChild(conffeti.createConffeti());
        }

        setTimeout(() => {
            container.removeChildren(0,200);
        }, 2000);
       

        this.allowMove = false;
        if (this.currentLevel >= 2) {
            this.currentLevel = 1;
        } else {
            this.currentLevel++;
        }


        this.loadLevel(this.currentLevel);
    }
}

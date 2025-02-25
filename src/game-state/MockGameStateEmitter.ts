import { GameStateSubject } from "./GameStateSubject";

export class MockGameStateEmitter {
    private gameState: any = {
        map: {
            daytime: false,
        },
        hero: {
            alive: true,
        }
    };

    constructor(
        private gameStateSubject: GameStateSubject
    ) {}

    start() {
        console.log("MockGameStateEmitter started");
        setInterval(() => {
            this.gameState.map.daytime = !this.gameState.map.daytime;
            this.gameStateSubject.notify(this.gameState);
        }, 10000);
        this.startRandomLife();
    }

    private startRandomLife() {
        setInterval(() => {
            this.gameState.hero.alive = false;
            this.gameStateSubject.notify(this.gameState);
            setTimeout(() => this.respawn(), 3000);
        }, 3000 + (Math.random() * 7000))
    }
    
    private respawn() {
        this.gameState.hero.alive = true;
        this.gameStateSubject.notify(this.gameState);
        this.startRandomLife();
    }
}

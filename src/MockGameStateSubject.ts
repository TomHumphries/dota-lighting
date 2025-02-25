import { GameStateSubject } from "./GameStateSubject";

export class MockGameStateSubject extends GameStateSubject {
    private gameState: any = {
        map: {
            daytime: false,
        },
        hero: {
            alive: true,
        }
    };

    start() {
        setInterval(() => {
            this.gameState.map.daytime = !this.gameState.map.daytime;
            this.notify(this.gameState);
        }, 5000);
        this.startRandomLife();
    }

    private startRandomLife() {
        setInterval(() => {
            this.gameState.hero.alive = false;
            this.notify(this.gameState);
            setTimeout(() => this.respawn(), 3000);
        }, 3000 + (Math.random() * 7000))
    }
    
    private respawn() {
        this.gameState.hero.alive = true;
        this.notify(this.gameState);
        this.startRandomLife();
    }
}

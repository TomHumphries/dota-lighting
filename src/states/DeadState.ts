import { IState } from './IState';

export class DeadState implements IState {
    public readonly priority: number = 2;
    public active: boolean = false;
    private changeCallback?: () => void;

    constructor() {
        console.log(`Adding dead-alive state with priority ${this.priority}`);
        this.spawnIn();
    }

    setChangeCallback(callback: () => void): void {
        this.changeCallback = callback;
    }

    applyState(): void {
        console.log('Applying dead effect');
    }

    private spawnIn(): void {
        console.log('Respawned');
        this.active = false;
        if (this.changeCallback) this.changeCallback();
        const timeToDead = 5 + (Math.random() * 10);
        setTimeout(() => {
            this.die();
        }, timeToDead * 1000);
    }

    private die(): void {
        console.log('Died');
        this.active = true;
        if (this.changeCallback) this.changeCallback();
        setTimeout(() => {
            this.spawnIn();
        }, 5000);
    }

}

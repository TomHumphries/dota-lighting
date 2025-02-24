import { IState } from './IState';

export class NightState implements IState {
    public readonly priority: number = 1;
    public active: boolean = false;
    private changeCallback?: () => void;

    private intervalId?: NodeJS.Timeout;
    private isNight: boolean = false;

    constructor() {
        console.log(`Creating NightState with priority ${this.priority}`);
        this.intervalId = setInterval(() => this.cycle(), 3000);
    }

    setChangeCallback(callback: () => void): void {
        this.changeCallback = callback;
    }

    applyState(): void {
        console.log(`Applying night effect`);
    }

    private cycle(): void {
        this.isNight = !this.isNight;
        this.active = this.isNight;
        if (this.changeCallback) this.changeCallback();
    }
}

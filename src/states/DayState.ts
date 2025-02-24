import { IState } from './IState';

export class DayState implements IState {
    public readonly priority: number = 1;
    public active: boolean = false;
    private changeCallback?: () => void;

    private intervalId?: NodeJS.Timeout;
    private isDay: boolean = true;
    
    setChangeCallback(callback: () => void): void {
        this.changeCallback = callback;
    }
    constructor() {
        console.log(`Creating DayState with priority ${this.priority}`);
        this.intervalId = setInterval(() => this.cycle(), 3000);
    }

    applyState(): void {
        console.log(`Applying day effect`);
    }

    private cycle(): void {
        this.isDay = !this.isDay;
        this.active = this.isDay;
        if (this.changeCallback) this.changeCallback();
    }

}

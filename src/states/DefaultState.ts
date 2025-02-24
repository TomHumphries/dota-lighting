import { IState } from './IState';

export class DefaultState implements IState {
    public readonly priority: number = 0;
    public active: boolean = true;

    constructor() {
        console.log(`Creating DefaultState with priority ${this.priority}`);
    }

    setChangeCallback(callback: () => void): void {
        
    }

    applyState(): void {
        console.log(`Applying default state`);
    }

}

import { IState } from './states/IState';

export class ActiveStateManager {
    private states: Set<IState> = new Set();
    private activeState: IState | null = null;

    constructor() {}

    addState(state: IState): void {
        this.states.add(state);
        state.setChangeCallback(() => this.handleStateChange());
        this.applyHighestActiveState();
    }

    removeState(state: IState): void {
        this.states.delete(state);
        this.applyHighestActiveState();
    }

    handleStateChange(): void {
        this.applyHighestActiveState();
    }

    private applyHighestActiveState(): void {
        let highestState: IState | null = null;

        for (const state of this.states) {
            if (!state.active) continue;
            if (!highestState || state.priority >= highestState.priority) {
                highestState = state;
            }
        }

        if (highestState && highestState !== this.activeState) {
            highestState.applyState();
        }

        this.activeState = highestState;
    }
}


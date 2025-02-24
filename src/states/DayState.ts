import { GameEventDataObserver } from './GameStateSubject';
import { StateChangeObserver } from './StateChangeObserver';

export class DaytimeStateObserver implements GameEventDataObserver {
    private isDaytime: boolean = false;
    private observers = new Set<StateChangeObserver>();

    private notifyObservers(): void {
        this.observers.forEach(observer => observer.onStateChange(this.isDaytime));
    }
    addObserver(observer: StateChangeObserver): void {
        this.observers.add(observer);
    }

    update(gameState: any): void {
        if (!gameState.map) return;

        const isDaytime = gameState.map.daytime;
        if (typeof isDaytime !== 'boolean') return;

        const stateChanged = this.isDaytime !== isDaytime;
        if (!stateChanged) return;

        this.isDaytime = isDaytime;
        this.notifyObservers();
    }
}

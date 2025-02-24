import { GameEventDataObserver } from './GameStateSubject';
import { StateChangeObserver, StateChangeSubject } from './StateChangeObserver';

export class NighttimeStateObserber implements GameEventDataObserver, StateChangeSubject {
    private isNighttime: boolean = true;
    private observers = new Set<StateChangeObserver>();

    notifyObservers(): void {
        this.observers.forEach(observer => observer.onStateChange(this.isNighttime));
    }
    addObserver(observer: StateChangeObserver): void {
        this.observers.add(observer);
    }
    removeObserver(observer: StateChangeObserver): void {
        this.observers.delete(observer);
    }

    update(gameState: any): void {
        if (!gameState.map) return;

        const isDaytime = gameState.map.daytime;
        if (typeof isDaytime !== 'boolean') return;
        
        const isNighttime = !isDaytime;
        const stateChanged = this.isNighttime !== isNighttime;
        if (!stateChanged) return;

        this.isNighttime = isNighttime;
        this.notifyObservers();
    }
}

import { GameEventDataObserver } from './GameStateSubject';
import { StateChangeObserver } from './StateChangeObserver';

export class DeadStateSubject implements GameEventDataObserver {
    
    private isAlive: boolean = false;

    update(gameState: any): void {
        const isAlive = gameState.hero.alive;
        if (typeof isAlive !== 'boolean') return;
        if (this.isAlive === isAlive) return;
        this.isAlive = isAlive;
        this.notifyObservers();
    }
    
    private observers = new Set<StateChangeObserver>();
    private notifyObservers(): void {
        this.observers.forEach(observer => observer.onStateChange(this.isAlive));
    }
    addObserver(observer: StateChangeObserver): void {
        this.observers.add(observer);
    }
}

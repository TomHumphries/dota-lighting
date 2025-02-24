
export interface GameEventDataObserver {
    update(gameEventData: any): void;
}

export class GameEventDataSubject {
    private observers: GameEventDataObserver[] = [];

    addObserver(observer: GameEventDataObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: GameEventDataObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(gameEventData: any): void {
        this.observers.forEach(observer => observer.update(gameEventData));
    }
}


export interface StateChangeObserver {
    onStateChange(isActive: boolean): void;
}

export interface StateChangeSubject {
    addObserver(observer: StateChangeObserver): void;
    removeObserver(observer: StateChangeObserver): void;
    notifyObservers(isActive: boolean): void;
}

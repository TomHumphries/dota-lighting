export interface IState {
    priority: number;
    active: boolean;
    applyState(): void;
    setChangeCallback(callback: () => void): void;
}

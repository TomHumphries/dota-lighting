export interface IState {
    priority: number;
    active: boolean;
    applyEffect(): void;
    setChangeCallback(callback: () => void): void;
}

import { GameStateObserver } from "../game-state/GameStateSubject";
import { HomeAssistantClient } from "./HomeAssistantClient";
import { ILightingEffect, ILightingSettings } from "./ILighting";

export class DeathLighting implements ILightingEffect, GameStateObserver {
    readonly priority: number = 2;

    public _active: boolean = false;
    get active(): boolean {
        return this._active;
    }

    private isAlive: boolean = false;

    constructor(
        private settings: ILightingSettings, 
        private homeAssistantClient: HomeAssistantClient,
    ) {}

    update(gameState: any): void {
        const isAlive = gameState?.hero?.alive;
        if (isAlive === undefined) return;

        const changed = this.isAlive !== isAlive;
        this.isAlive = isAlive;
        this._active = !isAlive;
        
        if (!changed) return;
        if (this.changeCallback) this.changeCallback();
    }

    private changeCallback?: () => void;
    setChangeCallback(callback: () => void): void {
        this.changeCallback = callback;
    }
    
    async applyLighting(): Promise<void> {
        const promises = this.settings.lightIds.map(lightId => 
            this.homeAssistantClient.setLightingState(lightId, {
                'brightness_pct': 100,
                'rgb_color': [255, 0, 0],
            })
        );
        await Promise.all(promises);
    }
}
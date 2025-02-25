import { GameStateObserver } from "../game-state/GameStateSubject";
import { HomeAssistantClient } from "./HomeAssistantClient";
import { ILightingEffect, ILightingSettings } from "./ILighting";

export class DayLighting implements ILightingEffect, GameStateObserver {
    readonly priority: number = 1;

    public _active: boolean = false;
    get active(): boolean {
        return this._active;
    }

    private isDaytime: boolean = false;

    constructor(
        private settings: ILightingSettings, 
        private homeAssistantClient: HomeAssistantClient,
    ) {}
    
    update(gameState: any): void {
        const isDaytime = gameState.map.daytime;

        const changed = this.isDaytime !== isDaytime;
        this.isDaytime = isDaytime;
        this._active = isDaytime;

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
                'color_temp': 250,
            })
        );
        await Promise.all(promises);
    }
}
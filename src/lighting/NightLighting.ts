import { GameStateObserver } from "../game-state/GameStateSubject";
import { HomeAssistantClient } from "./HomeAssistantClient";
import { ILightingEffect, ILightingSettings } from "./ILighting";

export class NightLighting implements ILightingEffect, GameStateObserver {
    readonly priority: number = 1;

    public _active: boolean = true;
    get active(): boolean {
        return this._active;
    }

    private isNighttime: boolean = false;

    constructor(
        private settings: ILightingSettings, 
        private homeAssistantClient: HomeAssistantClient,
    ) {}

    update(gameState: any): void {
        const isDaytime = gameState?.map?.daytime;
        const isNighttime = !isDaytime;

        const changed = this.isNighttime !== isNighttime;
        this.isNighttime = isNighttime;
        this._active = isNighttime;

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
                'brightness_pct': 5,
                'color_temp': 153,
            })
        );
        await Promise.all(promises);
    }
}
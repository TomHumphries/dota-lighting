import { StateChangeObserver } from "../states/StateChangeObserver";
import { HomeAssistantClient } from "./HomeAssistantClient";
import { ILightingEffect, ILightingSettings } from "./ILighting";

export class RespawnLighting implements ILightingEffect, StateChangeObserver {
    readonly priority: number = 3;

    public _active: boolean = false;
    get active(): boolean {
        return this._active;
    }

    constructor(
        private settings: ILightingSettings, 
        private homeAssistantClient: HomeAssistantClient,
    ) {}

    onStateChange(isAlive: boolean): void {
        if (!isAlive) return;
        this._active = true;
        if (this.changeCallback) this.changeCallback();
        setTimeout(() => {
            this._active = false;
            if (this.changeCallback) this.changeCallback();
        }, 5000);
    }

    private changeCallback?: () => void;
    setChangeCallback(callback: () => void): void {
        this.changeCallback = callback;
    }
    
    async applyLighting(): Promise<void> {
        const promises = this.settings.lightIds.map(lightId => 
            this.homeAssistantClient.setLightingState(lightId, {
                'brightness_pct': 100,
                'rgb_color': [255, 215, 0], // Gold color
            })
        );
        await Promise.all(promises);
    }
}

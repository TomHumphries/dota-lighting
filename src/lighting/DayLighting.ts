import { StateChangeObserver } from "../states/StateChangeObserver";
import { HomeAssistantClient } from "./HomeAssistantClient";
import { ILightingEffect, ILightingSettings } from "./ILighting";

export class DayLighting implements ILightingEffect, StateChangeObserver {
    readonly priority: number = 1;

    public _active: boolean = false;
    get active(): boolean {
        return this._active;
    }

    constructor(
        private settings: ILightingSettings, 
        private homeAssistantClient: HomeAssistantClient,
    ) {}
    
    onStateChange(isActive: boolean): void {
        this._active = isActive;
        if (this.changeCallback) this.changeCallback();}

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
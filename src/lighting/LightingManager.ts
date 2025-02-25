import { ILightingEffect } from './ILighting';

export class LightingManager {
    private lightingEffects: Set<ILightingEffect> = new Set();
    private activeEffect: ILightingEffect | null = null;

    constructor() {}

    addLightingEffect(effect: ILightingEffect): void {
        this.lightingEffects.add(effect);
        effect.setChangeCallback(() => this.handleLightingEffectStateChange());
        this.applyHighestActiveEffect();
    }

    handleLightingEffectStateChange(): void {
        this.applyHighestActiveEffect();
    }

    private applyHighestActiveEffect(): void {
        let highestState: ILightingEffect | null = null;

        for (const state of this.lightingEffects) {
            if (!state.active) { 
                continue;
            }
            if (!highestState || state.priority >= highestState.priority) {
                highestState = state;
            }
        }

        if (highestState && highestState !== this.activeEffect) {
            console.log(`Applying new lighting effect: ${highestState.constructor.name}`);
            highestState.applyLighting();
        }

        this.activeEffect = highestState;
    }
}


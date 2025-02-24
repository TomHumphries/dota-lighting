export interface ILightingEffect {
    get active(): boolean;
    get priority(): number;
    applyLighting(): Promise<void>;
    setChangeCallback(callback: () => void): void;
}

export interface ILightingSettings {
    lightIds: string[];
}

export function initLightingSettingsFromEnv(): ILightingSettings {
    const lightIds = process.env.LIGHT_IDS;
    if (!lightIds) {
        throw new Error('LIGHT_IDS environment variable must be set');
    }
    return {
        lightIds: lightIds.split(','),
    }
}
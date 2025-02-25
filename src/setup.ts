import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";

import { DayLighting } from "./lighting/DayLighting";
import { DeathLighting } from "./lighting/DeathLighting";
import { NightLighting } from "./lighting/NightLighting";
import { RespawnLighting } from "./lighting/RespawnLighting";
import { LightingManager } from "./lighting/LightingManager";
import { ILightingSettings, initLightingSettingsFromEnv } from "./lighting/ILighting";

import { HomeAssistantClient } from "./lighting/HomeAssistantClient";
import { MockGameStateSubject } from "./MockGameStateSubject";
import { GameStateSubject } from "./GameStateSubject";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(express.json());

// const gameStateSubject = new GameStateSubject();
const gameStateSubject = new MockGameStateSubject();
gameStateSubject.start();

app.post("/dota-gsi", (req, res) => {
    gameStateSubject.notify(req.body);
    res.send({})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening for Game State Integration messages on port ${PORT}`);
});

const lightingManager = new LightingManager();
const homeAssistantClient = HomeAssistantClient.initialiseFromEnv();

const configuredLights: ILightingSettings = initLightingSettingsFromEnv();

// init the different lighting effects
const dayLighting = new DayLighting(configuredLights, homeAssistantClient);
lightingManager.addLightingEffect(dayLighting);

const nightLighting = new NightLighting(configuredLights, homeAssistantClient);
lightingManager.addLightingEffect(nightLighting);

const deathLighting = new DeathLighting(configuredLights, homeAssistantClient);
lightingManager.addLightingEffect(deathLighting);

const respawnLighting = new RespawnLighting(configuredLights, homeAssistantClient);
lightingManager.addLightingEffect(respawnLighting);

// connect game-state observers to the game-state subject
gameStateSubject.addObserver(dayLighting);
gameStateSubject.addObserver(nightLighting);
gameStateSubject.addObserver(deathLighting);

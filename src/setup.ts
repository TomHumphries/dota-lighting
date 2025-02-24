import { ActiveStateManager } from "./StateManager";
import { DayState } from "./states/DayState";
import { DeadState } from "./states/DeadState";
import { NightState } from "./states/NightState";

const stateManager = new ActiveStateManager();
stateManager.addState(new DayState());
stateManager.addState(new NightState());
stateManager.addState(new DeadState());

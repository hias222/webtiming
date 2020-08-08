import { eventHeat } from "../types/EventHeat";

export interface BaseFrontendInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: string[];
    displayMode: string;
    runningTime: string;
}

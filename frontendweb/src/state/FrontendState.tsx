import { eventHeat } from "../types/EventHeat";

export type FrontendState = {
  startdelayms: number;
  racerunning: boolean;
  eventHeat: eventHeat;
  lanes: string[];
  runningTime: string;
  displayMode: string;
  MessageText: string;
  MessageTime: string;
  VideoVersion: string;
};


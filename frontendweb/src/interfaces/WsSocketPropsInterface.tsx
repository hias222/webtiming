import { eventHeat } from "../types/EventHeat";

export interface WsSocketPropsInterface {
    onStartStop: (startedelay: number) => void;
    onEventHeatChange: (EventHeat: eventHeat) => void;
    onLaneChange: (lane: number, lanedata: any) => void;
    onDisplayModeChange: (displayMode: string) => void;
    onRunningTimeChange: (runningTime: string) => void;
    onMessageChange: (message: string) => void;
    }

import { swimmerData } from "../types/SwimmerData";

export type LaneState = {
    lane: string;
    place: string;
    time: string;
    laptime: string;
    islaptime: boolean;
    changed: number;
    entrytime?: string;
    swimmerData: swimmerData;
};

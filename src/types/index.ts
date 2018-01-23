export interface Day {
    readonly date: string;
    readonly hours: number;
}

export interface Project {
    readonly id: number;
    readonly name: string;
    readonly active: boolean;
    readonly hourlyRate: number;
    readonly totalHoursGoal: number;
    readonly trackedDays: Day[];
}

export interface StoreState {
    readonly managingProjects: boolean;
    readonly submitted: boolean;
    readonly weekNumber: number;
    readonly currentWeek: string[];
    readonly projects: Project[];
}

export interface UpdateCurrentWeekPayload {
    readonly number: number;
}

export interface TimeTrackingChangedPayload {
    readonly projectName: string;
    readonly day: Day;
    readonly hours: number;
}

export interface ManageProjectsPayload {
    readonly managingProjects: boolean;
}

export interface ActivateProjectPayload {
    readonly project: Project;
}

export interface SubmitWeekPayload {
    readonly submitted: boolean;
}

export type Func<ParamType, ReturnType> = (p: ParamType) => ReturnType;
export type BinaryFunc<PT1, PT2, ReturnType> = (p: PT1, p2: PT2) => ReturnType;
export type CurriedBinary<PT1, PT2, ReturnType> = (p: PT1) => (pt2: PT2) => ReturnType;
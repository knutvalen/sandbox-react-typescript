export interface Day {
    readonly name: string;
    readonly date: string;
    readonly hours: number;
}

export interface Project {
    readonly name: string;
    readonly week: Day[];
}

export interface StoreState {
    readonly projects: Project[];
    readonly managingProjects: boolean;
}

export interface TimeTrackingChangedPayload {
    readonly projectName: string;
    readonly day: Day;
    readonly hours: number;
}

export interface ManageProjectsPayload {
    readonly managingProjects: boolean;
}

export type Func<ParamType, ReturnType> = (p: ParamType) => ReturnType;
export type BinaryFunc<PT1, PT2, ReturnType> = (p: PT1, p2: PT2) => ReturnType;
export type CurriedBinary<PT1, PT2, ReturnType> = (p: PT1) => (pt2: PT2) => ReturnType;
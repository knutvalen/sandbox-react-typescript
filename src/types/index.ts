export interface Project {
    readonly name: string;
    readonly week: number[];
}

export interface StoreState {
    readonly projects: Project[];
}

export interface Field {
    readonly key: number;
    readonly value: string;
}

export interface TimeTrackingChangedPayload extends Field {
    readonly name: string;
}

export type Func<ParamType, ReturnType> = (p: ParamType) => ReturnType;
export type BinaryFunc<PT1, PT2, ReturnType> = (p: PT1, p2: PT2) => ReturnType;
export type CurriedBinary<PT1, PT2, ReturnType> = (p: PT1) => (pt2: PT2) => ReturnType;
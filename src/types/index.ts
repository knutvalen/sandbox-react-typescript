export interface Project {
    name: string,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
}

export interface StoreState {
    readonly projects: Project[];
}
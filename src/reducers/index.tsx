import { StoreState, Project, TimeTrackingChangedPayload } from '../types/index';
import { TimeTrackingAction } from '../actions/index';
import {find, map} from 'ramda';
import { TIME_TRACKING_CHANGED, MANAGE_PROJECTS } from '../constants/index';

const defaultState = {
    projects: [
        {
            name: 'In-House',
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        },
        {
            name: 'Monobank',
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        }
    ]
};

const updateProject = (projects: Project[], payload: TimeTrackingChangedPayload) => {
    const project = find((project: Project) => project.name === payload.name, projects);
    if(project) {
        const updatedProj: Project = {...project, [payload.key]: parseInt(payload.value) };
        return map((project: Project) => project.name === payload.name ? updatedProj : project, projects);
    }
    return projects;
};

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    switch (action.type) {
        case TIME_TRACKING_CHANGED:
            const newProjects = updateProject(state.projects, action.payload);
            return { ...state, projects: newProjects };
        case MANAGE_PROJECTS:
            return { ...state }
        default:
            return state;
    }
}


import { StoreState, Project, TimeTrackingChangedPayload } from '../types/index';
import { TimeTrackingAction } from '../actions/index';
import { find, map } from 'ramda';
import { TIME_TRACKING_CHANGED, MANAGE_PROJECTS } from '../constants/index';

const defaultState = {
    projects: [
        {
            name: 'RainHouse',
            week: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: 'Monobank',
            week: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

const updateProject = (projects: Project[], payload: TimeTrackingChangedPayload) => {
    const project = find((project: Project) => project.name === payload.name, projects);
    if (project) {
        const newWeek = project.week.map( (day, index) => {
            if(index !== payload.key) {
                // this is not the day we want to update - keep it
                return day;
            }

            // otherwise, this is the day we want to update
            return Number(payload.value);
        });
        const updatedProj: Project = { ...project, week: newWeek };
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


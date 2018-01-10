import { StoreState, Project } from '../types/index';
import { TimeTrackingAction } from '../actions/index';
import { TIME_TRACKING_CHANGED } from '../constants/index';

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

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    switch (action.type) {
        case TIME_TRACKING_CHANGED:
            const newProjects = updateProjectInArray(state.projects, action);
            return { ...state, projects: newProjects };
        default:
            return state;
    }
}

function updateProjectInArray(projects: Project[], action: TimeTrackingAction) {
    return projects.map((project, index) => {
        if (project.name !== action.payload.name) {
            // this is not the project to update - keep it
            return project;
        }

        // this is the project to update
        return {
            ...project,
            ...action.payload
        };
    });
}
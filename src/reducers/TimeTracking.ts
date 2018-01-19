import { StoreState, Project, TimeTrackingChangedPayload, ActivateProjectPayload } from '../types/index';
import { TimeTrackingAction } from '../actions/TimeTracking';
import { find, map } from 'ramda';
import { TIME_TRACKING_CHANGED, MANAGE_PROJECTS, ACTIVATE_PROJECT } from '../constants';

const defaultState = {
    projects: [
        {
            name: 'In-House',
            active: true,
            week: [
                {
                    name: 'monday',
                    date: '2018-01-01',
                    hours: 0
                },
                {
                    name: 'tuesday',
                    date: '2018-01-02',
                    hours: 0
                },
                {
                    name: 'wednesday',
                    date: '2018-01-03',
                    hours: 0
                },
                {
                    name: 'thursday',
                    date: '2018-01-04',
                    hours: 0
                },
                {
                    name: 'friday',
                    date: '2018-01-05',
                    hours: 0
                },
                {
                    name: 'saturday',
                    date: '2018-01-06',
                    hours: 0
                },
                {
                    name: 'sunday',
                    date: '2018-01-07',
                    hours: 0
                }
            ]
        },
        {
            name: 'Monobank',
            active: true,
            week: [
                {
                    name: 'monday',
                    date: '2018-01-01',
                    hours: 0
                },
                {
                    name: 'tuesday',
                    date: '2018-01-02',
                    hours: 0
                },
                {
                    name: 'wednesday',
                    date: '2018-01-03',
                    hours: 0
                },
                {
                    name: 'thursday',
                    date: '2018-01-04',
                    hours: 0
                },
                {
                    name: 'friday',
                    date: '2018-01-05',
                    hours: 0
                },
                {
                    name: 'saturday',
                    date: '2018-01-06',
                    hours: 0
                },
                {
                    name: 'sunday',
                    date: '2018-01-07',
                    hours: 0
                }
            ]
        }
    ],
    managingProjects: false
};

const updateProjectActive = (projects: Project[], payload: ActivateProjectPayload) => {
    const project = find((project: Project) => project.name === payload.project.name, projects);

    if (project) {
        const updatedProject: Project = { ...project, active: !payload.project.active };
        return map((project: Project) => project.name === payload.project.name ? updatedProject : project, projects);
    }

    return projects;
};

const updateProjectHours = (projects: Project[], payload: TimeTrackingChangedPayload) => {
    const project = find((project: Project) => project.name === payload.projectName, projects);

    if (project) {
        const newWeek = project.week.map((day, index) => {
            if (day.name !== payload.day.name) {
                // this is not the day we want to update - keep it
                return day;
            }

            // otherwise, this is the day we want to update
            return {
                ...day,
                hours: payload.hours
            };
        });

        const updatedProject: Project = { ...project, week: newWeek };
        return map((project: Project) => project.name === payload.projectName ? updatedProject : project, projects);
    }

    return projects;
};

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    var newProjects: Project[];

    switch (action.type) {
        case TIME_TRACKING_CHANGED:
            newProjects = updateProjectHours(state.projects, action.payload);
            return { ...state, projects: newProjects };
        case MANAGE_PROJECTS:
            return { ...state, managingProjects: !action.payload.managingProjects };
        case ACTIVATE_PROJECT:
            newProjects = updateProjectActive(state.projects, action.payload);
            return { ...state, projects: newProjects };
        default:
            return state;
    }
}
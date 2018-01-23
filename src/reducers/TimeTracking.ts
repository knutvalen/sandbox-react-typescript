import { StoreState, Project, TimeTrackingChangedPayload, ActivateProjectPayload, Day } from '../types/index';
import { TimeTrackingAction } from '../actions/TimeTracking';
import { find, map } from 'ramda';
import AT from '../constants';

const defaultState = {
    managingProjects: false,
    submitted: false,
    weekNumber: 1,
    currentWeek: [

    ],
    projects: [
        {
            id: 0,
            name: 'In-House',
            active: true,
            hourlyRate: 1000,
            totalHoursGoal: 150,
            trackedDays: []
        },
        {
            id: 1,
            name: 'Monobank',
            active: true,
            hourlyRate: 1000,
            totalHoursGoal: 150,
            trackedDays: []
        }
    ]
};

const updateProjectActive = (projects: Project[], payload: ActivateProjectPayload) => {
    const project = find((existingProject: Project) => existingProject.name === payload.project.name, projects);

    if (project) {
        const updatedProject: Project = { ...project, active: !payload.project.active };
        return map((existingProject: Project) => existingProject.name === payload.project.name ? updatedProject : existingProject, projects);
    }

    return projects;
};

const updateProjectHours = (projects: Project[], weekNumber: number, payload: TimeTrackingChangedPayload) => {
    const project = find((existingProject: Project) => existingProject.name === payload.projectName, projects);

    if (project) {
        const day = find((existingDay: Day) => existingDay.date === payload.day.date, project.trackedDays);
        let newTrackedDays;
        if (day != null) {
            newTrackedDays = map(
                (existingDay: Day) => {
                if (existingDay.date !== payload.day.date) {
                    return existingDay;
                }

                return {
                    ...existingDay,
                    hours: payload.hours
                };
                }, 
                project.trackedDays);
        } else {
            newTrackedDays = project.trackedDays;
            newTrackedDays.push({
                date: payload.day.date,
                hours: payload.hours
            });
        }

        const updatedProject: Project = { ...project, trackedDays: newTrackedDays };
        return map((existingProject: Project) => existingProject.name === payload.projectName ? updatedProject : existingProject, projects);
    }

    return projects;
};

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    let updatedProjects: Project[];
    
    switch (action.type) {
        case AT.TimeTrackingChanged:
            updatedProjects = updateProjectHours(state.projects, state.weekNumber, action.payload);
            return { ...state, projects: updatedProjects };
        case AT.ManageProjects:
            return { ...state, managingProjects: !action.payload.managingProjects };
        case AT.ActiveProjects:
            updatedProjects = updateProjectActive(state.projects, action.payload);
            return { ...state, projects: updatedProjects };
        case AT.SubmitWeek:
            return { ...state, submitted: !action.payload.submitted };
        case AT.UpdateCurrentWeek:
            return {...state, weekNumber: state.weekNumber + action.payload.number};
        default:
            return state;
    }
}
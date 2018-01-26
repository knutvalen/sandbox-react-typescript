import { StoreState, Project, WeekViewChangedPayload, ActivateProjectPayload, Day } from '../types/TimeTracking';
import { TimeTrackingAction } from '../actions/TimeTracking';
import { find, map } from 'ramda';
import Constants from '../constants';
import * as moment from 'moment';
import { maybeFind } from '../lib';

const defaultState = {
    managingProjects: false,
    weekNumber: 1,
    projects: [
        {
            id: 0,
            name: 'Time off',
            active: true,
            hourlyRate: 0,
            trackedDays: []
        },
        {
            id: 1,
            name: 'Vacation',
            active: true,
            hourlyRate: 0,
            trackedDays: []
        },
        {
            id: 2,
            name: 'Monobank',
            active: true,
            hourlyRate: 150,
            trackedDays: []
        },
        {
            id: 3,
            name: 'In-House',
            active: true,
            hourlyRate: 100,
            trackedDays: []
        },
    ]
};

// interface MaybeProps {
//     readonly type: Maybe<any>;
//     readonly nothing: () => React.ReactElement;
//     readonly just: Func<any, React.ReactElement>;
// }

// const Maybe: React.SFC<MaybeProps> = ({ type, nothing, just}) =>
//     type.caseOf({
//         nothing,
//         just
//     });

// const ourMaybeType = Maybe.just(10);
//     <Maybe 
//     type={ourMaybeType}
//     nothing={() => <span> Her var det ingenting</span>}
//     just={(tallet: number) => <span>Tallet er {tallet}</span>}
//    />

const updateProjectActive = (projects: Project[], payload: ActivateProjectPayload): Project[] =>
    maybeFind((existingProject: Project) => existingProject.name === payload.project.name, projects)
        .caseOf({
            nothing: () => projects,
            just: (project: Project) => {
                const updatedProject: Project = { ...project, active: !payload.project.active };
                return map((existingProject: Project) => existingProject.name === payload.project.name ? updatedProject : existingProject, projects);
            }
    });
    
const updateProjectHours = (projects: Project[], weekNumber: number, payload: WeekViewChangedPayload) => {
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

const updateWeekNumber = (currentWeek: string[], updateNumber: number) => {
    let week;

    switch (updateNumber) {
        case 1:
            week = moment(currentWeek[0]).add(1, 'week').format('W');
            break;
        case -1:
            week = moment(currentWeek[0]).subtract(1, 'week').format('W');
            break;
        default:
            break;
    }
    
    return Number(week);
};

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    let updatedProjects: Project[];
    
    switch (action.type) {
        case Constants.WeekViewChanged:
            updatedProjects = updateProjectHours(state.projects, state.weekNumber, action.payload);
            return { ...state, projects: updatedProjects };
        case Constants.ManageProjects:
            return { ...state, managingProjects: !state.managingProjects };
        case Constants.ActiveProjects:
            updatedProjects = updateProjectActive(state.projects, action.payload);
            return { ...state, projects: updatedProjects };
        case Constants.UpdateCurrentWeek:
            return {...state, weekNumber: updateWeekNumber(action.payload.currentWeek, action.payload.updateNumber)};
        default:
            return state;
    }
}
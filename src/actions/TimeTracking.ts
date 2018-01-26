import { curry } from 'ramda';
import Constants from '../constants';
import { Func } from '../types/TimeTracking';
import * as T from '../types/TimeTracking';

export interface WeekViewChanged {
    readonly type: Constants.WeekViewChanged;
    readonly payload: T.WeekViewChangedPayload;
}

export interface ManageProjects {
    readonly type: Constants.ManageProjects;
}

export interface ActivateProject {
    readonly type: Constants.ActiveProjects;
    readonly payload: T.ActivateProjectPayload;
}

export interface UpdateCurrentWeek {
    readonly type: Constants.UpdateCurrentWeek;
    readonly payload: T.UpdateCurrentWeekPayload;
}

export type TimeTrackingAction 
= WeekViewChanged 
| ManageProjects 
| ActivateProject 
| UpdateCurrentWeek;

export const activateProjectAction = curry(
    (dispatch: Func<ActivateProject, void>, activateProjectPayload: T.ActivateProjectPayload) =>
        dispatch({ type: Constants.ActiveProjects, payload: activateProjectPayload })
);

export const WeekViewChangedAction = curry(
    (dispatch: Func<WeekViewChanged, void>, name: string, WeekViewChangedPayload: T.WeekViewChangedPayload) =>
        dispatch({ type: Constants.WeekViewChanged, payload: WeekViewChangedPayload })
);

export const manageProjectsAction = (dispatch: Func<ManageProjects, void>) => () =>
        dispatch({ type: Constants.ManageProjects});

export const updateCurrentWeekAction = curry(
    (dispatch: Func<UpdateCurrentWeek, void>, updateCurrentWeekPayload: T.UpdateCurrentWeekPayload) =>
        dispatch({ type: Constants.UpdateCurrentWeek, payload: updateCurrentWeekPayload })
);
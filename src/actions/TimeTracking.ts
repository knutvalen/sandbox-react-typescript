import { curry } from 'ramda';
import Constants from '../constants';
import { Func } from '../types/index';
import * as T from '../types/index';

export interface TimeTrackingChanged {
    readonly type: Constants.TimeTrackingChanged;
    readonly payload: T.TimeTrackingChangedPayload;
}

export interface ManageProjects {
    readonly type: Constants.ManageProjects;
    readonly payload: T.ManageProjectsPayload;
}

export interface ActivateProject {
    readonly type: Constants.ActiveProjects;
    readonly payload: T.ActivateProjectPayload;
}

export interface SubmitWeek {
    readonly type: Constants.SubmitWeek;
    readonly payload: T.SubmitWeekPayload;
}

export interface UpdateCurrentWeek {
    readonly type: Constants.UpdateCurrentWeek;
    readonly payload: T.UpdateCurrentWeekPayload;
}

export type TimeTrackingAction 
= TimeTrackingChanged 
| ManageProjects 
| ActivateProject 
| SubmitWeek 
| UpdateCurrentWeek;

export const submitWeekAction = curry(
    (dispatch: Func<SubmitWeek, void>, submitWeekPayload: T.SubmitWeekPayload) =>
        dispatch({ type: Constants.SubmitWeek, payload: submitWeekPayload })
);

export const activateProjectAction = curry(
    (dispatch: Func<ActivateProject, void>, activateProjectPayload: T.ActivateProjectPayload) =>
        dispatch({ type: Constants.ActiveProjects, payload: activateProjectPayload })
);

export const timeTrackingChangedAction = curry(
    (dispatch: Func<TimeTrackingChanged, void>, name: string, timeTrackingChangedPayload: T.TimeTrackingChangedPayload) =>
        dispatch({ type: Constants.TimeTrackingChanged, payload: timeTrackingChangedPayload })
);

export const manageProjectsAction = curry(
    (dispatch: Func<ManageProjects, void>, manageProjectsPayload: T.ManageProjectsPayload) =>
        dispatch({ type: Constants.ManageProjects, payload: manageProjectsPayload })
);

export const updateCurrentWeekAction = curry(
    (dispatch: Func<UpdateCurrentWeek, void>, updateCurrentWeekPayload: T.UpdateCurrentWeekPayload) =>
        dispatch({ type: Constants.UpdateCurrentWeek, payload: updateCurrentWeekPayload })
);
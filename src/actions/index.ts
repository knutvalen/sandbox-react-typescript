import { curry } from 'ramda';
import * as constants from '../constants';
import { TimeTrackingChangedPayload, ManageProjectsPayload } from '../types/index';

export interface ManageProjects {
    readonly type: constants.MANAGE_PROJECTS;
    readonly payload: ManageProjectsPayload;
}

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: TimeTrackingChangedPayload;
}

export type TimeTrackingAction = TimeTrackingChanged | ManageProjects;

export const timeTrackingChangedAction = curry(
    (dispatch: any, name: string, timeTrackingChangedPayload: TimeTrackingChangedPayload) =>
        dispatch({ type: constants.TIME_TRACKING_CHANGED, payload: { name: name, ...timeTrackingChangedPayload } })
);

export const manageProjectsAction = curry(
    (dispatch: any, manageProjectsPayload: ManageProjectsPayload) => 
        dispatch({ type: constants.MANAGE_PROJECTS, payload: manageProjectsPayload })
);
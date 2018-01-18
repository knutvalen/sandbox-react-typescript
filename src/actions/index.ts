import { curry } from 'ramda';
import * as constants from '../constants';
import { TimeTrackingChangedPayload, ManageProjectsPayload, ActivateProjectPayload } from '../types/index';

export interface ActivateProject {
    readonly type: constants.ACTIVATE_PROJECT;
    readonly payload: ActivateProjectPayload;
}

export interface ManageProjects {
    readonly type: constants.MANAGE_PROJECTS;
    readonly payload: ManageProjectsPayload;
}

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: TimeTrackingChangedPayload;
}

export type TimeTrackingAction = TimeTrackingChanged | ManageProjects | ActivateProject;

export const activateProjectAction = curry(
    (dispatch: any, manageProjectsListPayload: ActivateProjectPayload) =>
        dispatch({ type: constants.ACTIVATE_PROJECT, payload: manageProjectsListPayload })
);

export const timeTrackingChangedAction = curry(
    (dispatch: any, name: string, timeTrackingChangedPayload: TimeTrackingChangedPayload) =>
        dispatch({ type: constants.TIME_TRACKING_CHANGED, payload: { name: name, ...timeTrackingChangedPayload } })
);

export const manageProjectsAction = curry(
    (dispatch: any, manageProjectsPayload: ManageProjectsPayload) =>
        dispatch({ type: constants.MANAGE_PROJECTS, payload: manageProjectsPayload })
);
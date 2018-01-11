import { curry } from 'ramda';
import * as constants from '../constants';
import { Field, TimeTrackingChangedPayload } from '../types/index';

export interface ManageProjects {
    readonly type: constants.MANAGE_PROJECTS;
    readonly payload: any;
}

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: TimeTrackingChangedPayload;
}

export type TimeTrackingAction = TimeTrackingChanged | ManageProjects;

export const timeTrackingChangedAction = curry(
    (dispatch: any, name: string, field: Field) => 
    dispatch({type: constants.TIME_TRACKING_CHANGED, payload: { name: name, ...field}})
);

export const manageProjectsAction = (dispatch: any) => () => dispatch({type: constants.MANAGE_PROJECTS})
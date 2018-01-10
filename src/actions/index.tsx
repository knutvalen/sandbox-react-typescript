import { curry } from 'ramda';
import * as constants from '../constants';
import { Project } from '../types/index';

export interface ManageProjects {
    readonly type: constants.MANAGE_PROJECTS;
    readonly payload: any;
}

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: Project;
}

export type TimeTrackingAction = TimeTrackingChanged | ManageProjects;

export const timeTrackingChangedAction = curry(
    (dispatch: any, project: Project) => dispatch({type: constants.TIME_TRACKING_CHANGED, payload: project})
);

export const manageProjectsAction = (dispatch: any) => () => dispatch({type: constants.MANAGE_PROJECTS})
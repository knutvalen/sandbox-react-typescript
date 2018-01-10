import { curry } from 'ramda';
import * as constants from '../constants';
import { Project } from '../types/index';

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: Project;
}

export type TimeTrackingAction = TimeTrackingChanged;

export const timeTrackingChangedAction = curry(
    (dispatch: any, project: Project) => dispatch({type: constants.TIME_TRACKING_CHANGED, payload: project})
);
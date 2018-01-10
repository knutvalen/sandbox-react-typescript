import { curry } from 'ramda';
import * as constants from '../constants';
import { Project } from '../types/index';

export interface TimeTrackingChanged {
    readonly type: constants.TIME_TRACKING_CHANGED;
    readonly payload: Project;
}

export type TimeTrackingAction = TimeTrackingChanged;

// export function timeTrackingChanged(): TimeTrackingChanged {
//     return {
//         type: constants.TIME_TRACKING_CHANGED
//     };
// }

// export const timeTrackingChanged = () => ({type: constants.TIME_TRACKING_CHANGED});

export const timeTrackingChangedAction = curry(
    (dispatch: any, project: Project) => dispatch({type: constants.TIME_TRACKING_CHANGED, payload: project})
);
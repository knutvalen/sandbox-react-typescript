import { StoreState } from '../types/index'
import { TimeTrackingAction } from '../actions/index';
import { TIME_TRACKING_CHANGED } from '../constants/index';

const defaultState = {
    projects: [
        {
            name: 'In-House',
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        },
        {
            name: 'Monobank',
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        }
    ]
};

export function timeTracking(state: StoreState = defaultState, action: TimeTrackingAction): StoreState {
    switch (action.type) {
        case TIME_TRACKING_CHANGED:
            return { ...state, };
        default:
            return state;
    }
}
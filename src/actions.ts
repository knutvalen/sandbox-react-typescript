import {curry} from 'ramda'
import {ActionTypes} from './types'

export const firstNameChangedAction = curry(
    (dispatch: any, firstName: string) => dispatch({type: ActionTypes.FirstNameChanged, payload: firstName})
);

export const lastNameChangedAction = curry(
    (dispatch: any, lastName: string) => dispatch({type: ActionTypes.LastNameChanged, payload: lastName})
);

export const addContactAction = (dispatch: any) => () => dispatch({type: ActionTypes.AddContact});
import { Maybe } from 'tsmonad';
import { Func }  from './types/TimeTracking';
import { find } from 'ramda';

export const toMaybe = <T>(val: any) => {
    if (typeof val === 'object' && val !== null) {
        return Object.keys(val).length > 0 ? Maybe.just<T>(val) : Maybe.nothing<T>();
    }
    return !!val ? Maybe.just<T>(val) : Maybe.nothing<T>();
};

export const maybeFind = <T>(fn: Func<T, boolean>, list: T[]): Maybe<T> => 
toMaybe<T>(find(fn, list));
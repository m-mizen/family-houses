import { FunctionComponent, createContext, useReducer, useCallback, useContext } from "react";
import { ActiveLocationContext } from "./active-location.context";

const countryInitial = 'gbr';
interface CountryAction {
    type: 'COUNTRY_SET' | 'RESET';
    payload: string;
}
const countryReducer = (state: string, { type, payload }: CountryAction): string => {
    switch (type) {
        case 'COUNTRY_SET':
            return payload;
        case 'RESET':
            return countryInitial;
        default:
            return state;
    }
}

const tagInitial = '';
interface TagAction {
    type: 'TAG_SET' | 'RESET';
    payload: string;
}
const tagReducer = (state: string, { type, payload }: TagAction): string => {
    switch (type) {
        case 'TAG_SET':
            return payload;
        case 'RESET':
            return tagInitial;
        default:
            return state;
    }
}

const termInitial = '';
interface TermAction {
    type: 'TERM_SET' | 'RESET';
    payload: string;
}
const termReducer = (state: string, { type, payload }: TermAction): string => {
    switch (type) {
        case 'TERM_SET':
            return payload;
        case 'RESET':
            return termInitial;
        default:
            return state;
    }
}

export interface FilterStateType {
    term: string;
    country: string;
    tag: string;
}

export interface FilterContextType {
    state: FilterStateType;
    dispatch: (action: TagAction | TermAction | CountryAction) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: FunctionComponent = ({ children }) => {

    const [term, dispatchTerm] = useReducer(termReducer, termInitial);
    const [tag, dispatchTag] = useReducer(tagReducer, tagInitial);
    const [country, dispatchCountry] = useReducer(countryReducer, countryInitial);

    const state = { term, tag, country };

    const { setActiveLocation } = useContext(ActiveLocationContext) || {};

    const reset = useCallback(() => {
        const action = {
            type: 'RESET',
            payload: '',
        }
        dispatchTerm(action as TermAction);
        dispatchTag(action as TagAction);
        dispatchCountry(action as CountryAction);
        setActiveLocation && setActiveLocation(undefined);
    }, [
        dispatchTerm,
        dispatchTag,
        dispatchCountry,
        setActiveLocation
    ]);

    const dispatch = useCallback(
        (action: TermAction | TagAction | CountryAction) => {
            if (action.type === 'RESET') {
                reset();
            } else if (action.type.indexOf('TERM') > -1) {
                dispatchTerm(action as TermAction);
            } else if (action.type.indexOf('TAG') > -1) {
                dispatchTag(action as TagAction);
            } else if (action.type.indexOf('COUNTRY') > -1) {
                dispatchCountry(action as CountryAction);
            }
        }, [reset]);

    return <FilterContext.Provider value={{ state, dispatch }}>
        {children}
    </FilterContext.Provider>;
}
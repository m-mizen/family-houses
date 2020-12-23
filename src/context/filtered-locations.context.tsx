import { createContext, FunctionComponent, useContext, useEffect, useCallback, useState } from "react";
import { ActiveLocationContext } from "./active-location.context";
import { APIContext, APILocation } from './api.context';
import { FilterContext } from './filter.context';

export const FilteredLocationsContext = createContext<APILocation[] | undefined>(undefined);

export const FilteredLocationsProvider: FunctionComponent<{}> = ({ children }) => {

    const { locations } = useContext(APIContext) || { locations: [] };
    const filters = useContext(FilterContext);
    const { setActiveLocation } = useContext(ActiveLocationContext) || {};

    const [filteredLocations, setFilteredLocations] = useState<APILocation[]>(locations);

    const filterLocations = useCallback<(input: APILocation[]) => APILocation[]>(
        (input) => {

            setActiveLocation && setActiveLocation(undefined);

            if (!filters) {
                return input;
            }

            const { tag, country, term } = filters.state;

            let filterFunction = (item: APILocation): boolean => {
                if (tag && !item.tags?.includes(tag)) {
                    return false;
                };
                if (country && item.country !== country) {
                    return false;
                };
                if (
                    term &&
                    item.name.indexOf(term) === -1 &&
                    item.address.indexOf(term) === -1 &&
                    item.description.indexOf(term) === -1
                ) {
                    return false;
                }
                return true;
            }

            return input.filter(filterFunction);
        },
        [filters, setActiveLocation],
    );

    useEffect(() => {
        setFilteredLocations(
            filterLocations(locations)
        );
    }, [locations, filterLocations]);

    return <FilteredLocationsContext.Provider value={ filteredLocations }>
        {children}
    </FilteredLocationsContext.Provider>
}
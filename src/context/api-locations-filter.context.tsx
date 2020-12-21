import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { APIContext, APILocation } from './api.context';

export interface APILocationsFilter {
    filteredLocations: APILocation[];
    setFilteredLocations: (filteredLocations: APILocation[]) => void;
}

export const LocationsFilteredContext = createContext<APILocationsFilter | undefined>(undefined);

export const LocationsFilteredProvider: FunctionComponent<{}> = ({ children }) => {

    const { locations } = useContext(APIContext) || { locations: [] };
    const [filteredLocations, setFilteredLocations] = useState<APILocation[]>(locations);

    useEffect(() => {
        setFilteredLocations(locations.filter(loc => loc.country === 'gbr'));
    }, [locations, setFilteredLocations]);

    return <LocationsFilteredContext.Provider value={{ filteredLocations, setFilteredLocations }}>
        {children}
    </LocationsFilteredContext.Provider>
}
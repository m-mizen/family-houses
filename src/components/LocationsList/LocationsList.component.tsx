import { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { ActiveLocationContext, APILocation, FilteredLocationsContext } from '../../context';
import { LocationsListItem } from '../LocationsListItem';

import { LocationsListWrapEle, LocationsListItemEle, LocationsListEle } from './LocationsList.styles';

export const LocationsList: FunctionComponent<{}> = () => {
    const locationListRef = useRef<HTMLUListElement>(null);
    const filteredLocations = useContext(FilteredLocationsContext) || [];
    const { activeLocation, setActiveLocation } = useContext(ActiveLocationContext) || {};

    const setActive = (active: string) => {
        if (!active || !setActiveLocation) {
            return;
        }
        setActiveLocation(active === activeLocation ? undefined : active);
    }

    useEffect(() => {
        if (!locationListRef.current) {
            return;
        }
        locationListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, [locationListRef, activeLocation])

    return (
        <LocationsListWrapEle ref={locationListRef}>
            <LocationsListEle>
                {filteredLocations?.map((location: APILocation) => {
                    const isActive = location.id === activeLocation;
                    return (
                        <LocationsListItemEle
                            bringToTop={isActive}
                            key={location.id}
                        >
                            <LocationsListItem
                                isActive={isActive}
                                setActive={() => setActive(location.id)}
                                location={location}
                            />
                        </LocationsListItemEle>
                    );
                })}
            </LocationsListEle>
        </LocationsListWrapEle>
    )
}
import { FunctionComponent, useCallback, useContext, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ActiveLocationContext, APILocation, FilteredLocationsContext } from '../../context';
import { LocationsListItem } from '../LocationsListItem';

import { LocationsListWrapEle, LocationsListItemEle, LocationsListEle } from './LocationsList.styles';

export const LocationsList: FunctionComponent<{}> = () => {
    const locationListRef = useRef<HTMLUListElement>(null);
    const filteredLocations = useContext(FilteredLocationsContext) || [];
    const { activeLocation, setActiveLocation } = useContext(ActiveLocationContext) || {};
    const isSmallScreen = useMediaQuery({
        query: '(min-width:900px)'
    });

    const setActive = (active: string) => {
        if (!active || !setActiveLocation) {
            return;
        }
        setActiveLocation(active === activeLocation ? undefined : active);
    }

    const scrollToTop = useCallback(
        () => {
            if (isSmallScreen) {
                locationListRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        [isSmallScreen],
    );

    useEffect(() => {
        if (!activeLocation || !locationListRef.current) {
            return;
        }
        scrollToTop();
    }, [locationListRef, activeLocation, scrollToTop])

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
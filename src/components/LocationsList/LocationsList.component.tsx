import { FunctionComponent, useContext } from 'react';
import { ActiveLocationContext, APILocation, LocationsFilteredContext } from '../../context';
import { LocationsListItem } from '../LocationsListItem';

import { LocationsListWrapEle, LocationsListItemEle, LocationsListEle } from './LocationsList.styles';

export const LocationsList: FunctionComponent<{}> = () => {
    const { filteredLocations } = useContext(LocationsFilteredContext) || {};
    const { activeLocation, setActiveLocation } = useContext(ActiveLocationContext) || {};

    const setActive = (active: string) => {
        if (!active || !setActiveLocation) {
            return;
        }
        setActiveLocation(active === activeLocation ? undefined : active);
    }

    return (
        <LocationsListWrapEle>
            <LocationsListEle>
                {filteredLocations?.map((location: APILocation) => (
                    <LocationsListItemEle key={location.id}>
                        <LocationsListItem isActive={location.id === activeLocation} setActive={() => setActive(location.id)} location={location} />
                    </LocationsListItemEle>
                ))}
            </LocationsListEle>
        </LocationsListWrapEle>
    )
}
import { FunctionComponent } from 'react';

import { GoogleMapsProvider } from './google-maps.context';
import { APIProvider } from './api.context';
import { FilteredLocationsProvider } from './filtered-locations.context';
import { ActiveLocationProvider } from './active-location.context';
import { FilterProvider } from './filter.context';

export const CombinedProviders: FunctionComponent<{}> = ({ children }) => {
    return <GoogleMapsProvider>
        <APIProvider>
            <FilterProvider>
                <FilteredLocationsProvider>
                    <ActiveLocationProvider>
                        {children}
                    </ActiveLocationProvider>
                </FilteredLocationsProvider>
            </FilterProvider>
        </APIProvider>
    </GoogleMapsProvider>;
}

export * from './google-maps.context';
export * from './active-location.context';
export * from './api.context';
export * from './filtered-locations.context';
export * from './filter.context';
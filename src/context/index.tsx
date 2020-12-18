import { FunctionComponent } from 'react';

import { GoogleMapsProvider } from './google-maps.context';
import { APIProvider } from './api.context';
import { LocationsFilteredProvider } from './api-locations-filter.context';
import { ActiveLocationProvider } from './active-location.context';

export const CombinedProviders: FunctionComponent<{}> = ({ children }) => {
    return <GoogleMapsProvider>
        <APIProvider>
            <ActiveLocationProvider>
                <LocationsFilteredProvider>
                    {children}
                </LocationsFilteredProvider>
            </ActiveLocationProvider>
        </APIProvider>
    </GoogleMapsProvider>;
}

export * from './google-maps.context';
export * from './active-location.context';
export * from './api.context';
export * from './api-locations-filter.context';
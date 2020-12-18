import { createContext, useEffect, useState } from "react";

import { Loader } from "@googlemaps/js-api-loader";

import { FunctionComponent } from "react-dom/node_modules/@types/react";

interface MapsContext {
    loaded: boolean;
}

export const GoogleMapsContext = createContext<MapsContext | null>(null);

export const GoogleMapsProvider: FunctionComponent<{}> = ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // If already loaded do nothing
        if (loaded) {
            return;
        }
        const additionalOptions = {
            mapIds: [(process.env.REACT_APP_MAP_ID || '')]
        };
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API || '',
            version: "beta",
            ...additionalOptions,
        });
        loader.load().then(() => {
            setLoaded(true);
        });
    }, [loaded, setLoaded]);

    return <GoogleMapsContext.Provider value={{ loaded }}>
        {children}
    </GoogleMapsContext.Provider>;
}
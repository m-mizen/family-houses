import { createContext, FunctionComponent, useEffect, useState } from "react";

export interface APILocation {
    description: string;
    name: string;
    id: string;
    lat: number,
    lng: number,
    address: string,
    tags?: string[]
}

export interface APITag {
    id: string,
    name: string
}

export interface APIContextType {
    locations: APILocation[],
    tags: APITag[]
}

export const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider: FunctionComponent<{}> = ({ children }) => {

    const [state, setState] = useState<APIContextType>();

    useEffect(() => {
        async function loadData() {
            const response = await fetch('/api_mock/locations.json');
            const data = await response.json();
            setState(data);
        }
        try {
            loadData();
        } catch (error) {
            console.error(error);
        }
    }, [setState]);

    return <APIContext.Provider value={state}>
        {children}
    </APIContext.Provider>
}
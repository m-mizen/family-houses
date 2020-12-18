import React, { createContext, FunctionComponent, useState } from "react";

interface ActiveLocationContextType {
    activeLocation: string | undefined;
    setActiveLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ActiveLocationContext = createContext<ActiveLocationContextType | undefined>(undefined);

export const ActiveLocationProvider: FunctionComponent<{}> = ({ children }) => {
    const [activeLocation, setActiveLocation] = useState<string | undefined>(undefined);
    return <ActiveLocationContext.Provider value={{ activeLocation, setActiveLocation }}>{children}</ActiveLocationContext.Provider>
}

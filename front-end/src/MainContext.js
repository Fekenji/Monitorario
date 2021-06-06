import React, { useContext, useState } from 'react';

const MainContext = React.createContext();
const MainUpdateContext = React.createContext();

export function useRa() {
    return useContext(MainContext)
}

export function useRaUpdate() {
    return useContext(MainUpdateContext)
}

export function MainProvider({ children }) {
    const [ra, setRa] = useState('');

    function trocaRa(param) {
        setRa(param)
    }

    return (
        <MainContext.Provider value={ra}>
            <MainUpdateContext.Provider value={trocaRa}>
                {children}
            </MainUpdateContext.Provider>
        </MainContext.Provider>
    )
}
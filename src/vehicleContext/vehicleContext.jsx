import React, { createContext, useEffect, useContext, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const catalogData = createContext();
const isLoading = createContext();
const searchVehicleContext = createContext();

export function useCatalogData() {
    return useContext(catalogData);
}

export function useIsLoading() {
    return useContext(isLoading);
}

export function useSearchVehicle() {
    return useContext(searchVehicleContext);
}

const VehicleContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function searchVehicleFunction(keyword, setVehicles, showActivity) {
        showActivity(true);
        const keywordArray = keyword.split(" ");
        let exactMatches = [];
        let partialMatches = [];
        let isExactMatchFound = false;
    
        for (const vehicle of data) {
            if (vehicle.name && keyword && vehicle.name.toLowerCase() === keyword.toLowerCase()) {
                exactMatches.push(vehicle);
                isExactMatchFound = true;
                break; // Detiene la búsqueda si se encuentra una coincidencia exacta
            } else {
                let isPartialMatch = false;
                for (let i = 0; i < keywordArray.length; i++) {
                    if ((vehicle.model && vehicle.model.toLowerCase().includes(keywordArray[i].toLowerCase())) ||
                        (vehicle.year && vehicle.year.toLowerCase().includes(keywordArray[i].toLowerCase())) ||
                        (vehicle.price && typeof vehicle.price === 'string' && vehicle.price.toLowerCase().includes(keywordArray[i].toLowerCase()))) {
                        isPartialMatch = true;
                        break; // Detiene la búsqueda si encuentra una coincidencia parcial
                    }
                }
                if (isPartialMatch) {
                    partialMatches.push(vehicle);
                }
            }
        }
    
        setVehicles(isExactMatchFound ? exactMatches : partialMatches);
        showActivity(false);
    }
    

    async function loadData() {
        try {
            setLoading(true);
            const vehicleList = await firestore().collection('Catalog').get();
            setData(vehicleList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <searchVehicleContext.Provider value={searchVehicleFunction}>
            <isLoading.Provider value={loading}>
                <catalogData.Provider value={data}>
                    {props.children}
                </catalogData.Provider>
            </isLoading.Provider>
        </searchVehicleContext.Provider>
    );
};

export default VehicleContextProvider;

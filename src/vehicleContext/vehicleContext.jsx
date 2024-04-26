import React, { createContext, useEffect, useContext, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const catalogData = createContext()
const isLoading = createContext()
const serchVehicle = createContext()

export function useCatalogData() {
    return useContext(catalogData)
}

export function useIsLoading() {
    return useContext(isLoading)
}

export function useSearchVehicle() {
    return useContext(serchVehicle)
}

const vehicleContext = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function searchVehicleFunction(keyword, setVehicles, showActivity) {
        showActivity(true)
        await getCatalog()
        const keywordArray = keyword.split(" ")
        let exactMatches = []
        let partialMatches = []
        let isExactMatchFound = false
        for (const vehicle of catalog) {
            if (vehicle.name.toLowerCase() === keyword.toLowerCase()) {
                exactMatches.push(vehicle)
                isExactMatchFound = true
                break
            } else {
                for (let i = 0; i < keywordArray.length; i++) {
                    if (vehicle.brand == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.model == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.year == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.price == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    }
                }
            }
        }

        setVehicles(isExactMatchFound ? exactMatches : partialMatches)
        showActivity(false)
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
    <serchVehicle.Provider value={searchVehicleFunction}>
        <isLoading.Provider value={loading}>
            <catalogData.Provider value={data}>
                {props.children}
            </catalogData.Provider>
        </isLoading.Provider>
    </serchVehicle.Provider>
  )
}

export default vehicleContext

import React from "react";
import { ScrollView } from "react-native";
import Vehicle from "./Vehiculo";


const VehicleList = ({Vehicle}) =>{
    return (
        <ScrollView>
            {Vehicle.map((Vehicle) => (
                <Vehicle
                key={Vehicle.imageUrl}
                imageUrl={Vehicle.imageUrl}
                description={Vehicle.description}
                price={Vehicle.price}
                />

            ))}
        </ScrollView>
    );
};
export default VehicleList;
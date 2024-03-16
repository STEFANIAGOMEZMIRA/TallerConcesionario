import React from "react";
import VehicleList from "./VehiculoList";

const Catalog = () => {
    const Vehicle = [
        {
            id: 1,
            imageUrl:'',
            description: 'Honda civic, 2024',
            price: 250000
        },

        {
            id: 2,
            imageUrl:'',
            description: 'Honda civic, 2024',
            price: 250000

        },

        { 
            id: 3,
            imageUrl:'',
            description: 'Honda civic, 2024',
            price: 250000
        },
    ];

return <VehicleList Vehicle={Vehicle}/>;
         
};

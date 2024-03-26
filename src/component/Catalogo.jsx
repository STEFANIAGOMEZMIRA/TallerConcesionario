import React from "react";
import VehicleList from "./VehiculoList";

const Catalog = () => {
    const vehicles = [
        {
            id: 1,
            imageUrl:'https://www.autosrodando.com/wp-content/uploads/2023/10/honda-civic-hibrido-2024-02-1280x720.jpg',
            description: 'Honda civic, 2024',
            price: 250000
        },

        {
            id: 2,
            imageUrl:'https://www.autosrodando.com/wp-content/uploads/2023/10/honda-civic-hibrido-2024-02-1280x720.jpg',
            description: 'Honda civic, 2024',
            price: 250000

        },

        { 
            id: 3,
            imageUrl:'https://www.autosrodando.com/wp-content/uploads/2023/10/honda-civic-hibrido-2024-02-1280x720.jpg',
            description: 'Honda civic, 2024',
            price: 250000
        },
    ];

return <VehicleList vehicles={vehicles}/>;
         
};

export default Catalog
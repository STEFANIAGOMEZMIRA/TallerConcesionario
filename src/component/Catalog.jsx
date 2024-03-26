import React from "react";
import VehicleList from "./VehicleList";

const Catalog = () => {
    const vehicles = [
        {
            id: 1,
            description: 'ONIX-TURBO-SEDAN, 2023',
            imageUrl:'https://i.ytimg.com/vi/XPiqPbEVjEM/maxresdefault.jpg',
            price:  74990000
        },

        {
            id: 2,
            imageUrl:'https://tuautoencasa.com/img/galeria/1656530707.jpg',
            description: 'JOY, 2024',
            price: 59990000

        },

        { 
            id: 3,
            imageUrl:'https://inv.assets.sincrod.com/ChromeColorMatch/us/WHITE_cc_2023CHS090006_01_1280_GCP.jpg',
            description: 'BLAZER RS, 2023',
            price: 205990000
        },

        { 
            id: 4,
            imageUrl:'https://autodiscoveries.com/wp-content/uploads/2022/08/NEW-2023-Chevrolet-Tahoe-Z71-scaled.jpg',
            description: 'TAHOE Z71',
            price: 362990000
        },

        { 
            id: 5,
            imageUrl:'https://chevrolet.com.gt/wp-content/uploads/2020/05/Chevrolet-N400M-galer%C3%ADa-3.jpg',
            description: 'N400 PASAJEROS 2024',
            price:  87400000
        },

        
    ];

return <VehicleList vehicles={vehicles}/>;
         
};

export default Catalog
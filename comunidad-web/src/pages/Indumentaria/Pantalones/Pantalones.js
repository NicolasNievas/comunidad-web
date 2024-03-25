import './Pantalones.css';
import React, { useState, useEffect } from 'react';
import { GetPantalones } from '../../../Services/RestServices';

function Pantalones(){
    const [pantalones, setPantalones] = useState([]);

    useEffect(() => {
        const fetchPantalones = async () => {
            try {
                const pantalonesData = await GetPantalones();
                setPantalones(pantalonesData);
            } catch (error) {
                console.error('Error fetching pantalones:', error);
            }
        };

        fetchPantalones();
    }, []);

    return (
        <div>
            <div className="pants-name">
            <h2>Pants</h2>
            </div>
            <div className="pantalones-container">
                {pantalones.map(pantalon => (
                    <div key={pantalon.id} className="pantalon-item">
                        <img src={pantalon.imageUrl} alt={pantalon.name} />
                        <h3>{pantalon.name}</h3>
                        <p>{pantalon.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Pantalones;
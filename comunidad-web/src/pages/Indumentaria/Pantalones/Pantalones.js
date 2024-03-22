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
            <h2>Pants</h2>
            <div className="pantalones-container">
                {pantalones.map(pantalon => (
                    <div key={pantalon.id} className="pantalon-item">
                        <img src={pantalon.imagen} alt={pantalon.nombre} />
                        <h3>{pantalon.nombre}</h3>
                        <p>Precio: ${pantalon.precio}</p>
                        <p>{pantalon.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Pantalones;
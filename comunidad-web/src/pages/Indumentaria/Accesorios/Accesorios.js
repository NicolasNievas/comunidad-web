import React, { useState, useEffect } from 'react';
import { GetAccesorios } from '../../../Services/RestServices';
import './Accesorios.css';


function Accesorios(){
    const [accesorios, setAccesorios] = useState([]);

    useEffect(() => {
        const fetchAccesorios = async () => {
            try {
                const accesoriosData = await GetAccesorios();
                setAccesorios(accesoriosData);
            } catch (error) {
                console.error('Error fetching accesorios:', error);
            }
        };

        fetchAccesorios();
    }, []);

    return (
        <div>
            <h2>Accesorios</h2>
            <div className="accesorios-container">
                {accesorios.map(accesorio => (
                    <div key={accesorio.id} className="accesorio-item">
                        <img src={accesorio.imagen} alt={accesorio.nombre} />
                        <h3>{accesorio.nombre}</h3>
                        <p>Precio: ${accesorio.precio}</p>
                        <p>{accesorio.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accesorios;
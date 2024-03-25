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
            <div className="accesorie-name">
            <h2>Accesories</h2>
            </div>
            <div className="accesorios-container">
                {accesorios.map(accesorio => (
                    <div key={accesorio.id} className="accesorio-item">
                        <img src={accesorio.imageUrl} alt={accesorio.name} />
                        <h3>{accesorio.name}</h3>
                        <p>{accesorio.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accesorios;
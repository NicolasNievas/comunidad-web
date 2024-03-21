import React, { useState, useEffect } from 'react';
import { GetBuzos } from '../../../Services/RestServices';
import './Buzos.css';

function Buzos() {
  const [buzos, setBuzos] = useState([]);

  useEffect(() => {
    const fetchBuzos = async () => {
      try {
        const buzosData = await GetBuzos();
        setBuzos(buzosData);
      } catch (error) {
        console.error('Error fetching buzos:', error);
      }
    };

    fetchBuzos();
  }, []);

  return (
    <div>
      <h2>Divers</h2>
      <div className="buzos-container">
        {buzos.map(buzo => (
          <div key={buzo.id} className="buzo-item">
            <img src={buzo.imagen} alt={buzo.nombre} />
            <h3>{buzo.nombre}</h3>
            <p>Precio: ${buzo.precio}</p>
            <p>{buzo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buzos;

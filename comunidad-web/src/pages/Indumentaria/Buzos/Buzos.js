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
      <div className="buzos-name">
      <h2>Divers</h2>
      </div>
      <div className="buzos-container">
        {buzos.map(buzo => (
          <div key={buzo.id} className="buzo-item">
            <img src={buzo.imageUrl} alt={buzo.name} />
            <h3>{buzo.name}</h3>
            <p>{buzo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buzos;

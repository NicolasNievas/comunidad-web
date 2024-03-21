import React, { useState, useEffect } from 'react';
import { GetRemeras } from '../../../Services/RestServices';

import './Remeras.css';

function Remeras() {
  const [remeras, setRemeras] = useState([]);

  useEffect(() => {
    const fetchRemeras = async () => {
      try {
        const remerasData = await GetRemeras();
        setRemeras(remerasData);
      } catch (error) {
        console.error('Error fetching remeras:', error);
      }
    };

    fetchRemeras();
  }, []);

  return (
    <div>
      <h2>T-Shirts</h2>
      <div className="remeras-container">
        {remeras.map(remera => (
          <div key={remera.id} className="remera-item">
            <img src={remera.imagen} alt={remera.nombre} />
            <h3>{remera.nombre}</h3>
            <p>Precio: ${remera.precio}</p>
            <p>{remera.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Remeras;

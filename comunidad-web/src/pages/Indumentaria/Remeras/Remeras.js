import React, { useState, useEffect } from 'react';
import { GetRemeras } from '../../../Services/RestServices';
import Swal from 'sweetalert2';

import './Remeras.css';

function Remeras() {
  const [remeras, setRemeras] = useState([]);

  useEffect(() => {
    const fetchRemeras = async () => {
      try {
        const remerasData = await GetRemeras();
        if (remerasData.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'No se encontraron remeras',
            text: 'Lo sentimos, no hay remeras disponibles en este momento.',
          });
        } else {
          setRemeras(remerasData);
        }
      } catch (error) {
        console.error('Error fetching remeras:', error);
      }
    };

    fetchRemeras();
  }, []);

  return (
    <div>
      <div className="remera-name">
      <h2>T-Shirts</h2>
      </div>
      <div className="remeras-container">
        {remeras.map(remera => (
          <div key={remera.id} className="remera-item">
            <img src={remera.imageUrl} alt={remera.name} />
            <h3>{remera.name}</h3>
            <p>{remera.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Remeras;

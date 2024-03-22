import React, { useState } from 'react';
import { AddIndumentaria } from '../../../Services/RestServices';
import './Add.css';

function Add() {
  const [tipoIndumentaria, setTipoIndumentaria] = useState('remera'); // Valor por defecto

  const handleChange = (event) => {
    setTipoIndumentaria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes llamar a tu función de servicio para agregar la indumentaria
    AddIndumentaria(tipoIndumentaria);
  };

  return (
    <div className="add-container">
      <h2>Add Clothing</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tipoIndumentaria">Select type:</label>
        <select id="tipoIndumentaria" value={tipoIndumentaria} onChange={handleChange}>
          <option value="remera">T-Shirts</option>
          <option value="buzo">Divers</option>
          <option value="pantalon">Pants</option>
          <option value="accesorio">Accesories</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Add;

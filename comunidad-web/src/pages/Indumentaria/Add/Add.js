import React, { useState, useEffect  } from 'react';
import { AddIndumentaria, GetIndumentarias, DeleteIndumentaria, EditIndumentaria } from '../../../Services/RestServices';
import Swal from 'sweetalert2';

import {ReactComponent as PostSvg} from '../../../assets/svgs/post.svg';
import {ReactComponent as DeleteSvg} from '../../../assets/svgs/delete.svg';
import {ReactComponent as PutSvg} from '../../../assets/svgs/put.svg';


import './Add.css';

function Add() {

  const [tipo, setTipo] = useState('remeras'); 
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [indumentarias, setIndumentarias] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [ocultar, setOcultar] = useState(false);

  const loadIndumentarias = async () => {
    try {
      const data = await GetIndumentarias(tipo);
      setIndumentarias(data);
    } catch (error) {
      console.error('Error fetching indumentarias:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cargar las indumentarias. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteIndumentaria(tipo, id);
      Swal.fire({
        icon: 'success',
        title: 'Indumentaria eliminada',
        text: 'La indumentaria se ha eliminado exitosamente',
        showConfirmButton: false,
        timer: 2000
      });
      loadIndumentarias();
    } catch (error) {
      console.error('Error deleting indumentaria:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar la indumentaria. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const indumentaria = { name: nombre, imageUrl: imagen, descripcion: descripcion };
    const isValid = IsValid();
    if (isValid) {
      try {
        await AddIndumentaria(tipo, indumentaria);
        Swal.fire({
          icon: 'success',
          title: 'Indumentaria agregado',
          text: 'La indumentaria se ha agregado exitosamente',
          showConfirmButton: false,
          timer: 2000
        });
        setNombre('');
        setImagen('');
        setDescripcion('');
        CloseModal();
        loadIndumentarias();
      } catch (error) {
        console.error('Error adding product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar la indumentaria. Por favor, inténtalo de nuevo.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        });
      }
    }
  };

  const handlePutProduct = async (id) => {
    const indumentaria = {id, nombre, imagen, descripcion,};
    const isValid = IsValid();
    if (isValid) {
      try {
        await EditIndumentaria(tipo, id, indumentaria); 
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'El producto se ha actualizado exitosamente',
        });
        ClearProductInputs();
        CloseModal();
        
      } catch (error) {
        console.error('Error updating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        });
      }
    }
  }

 function IsEmpty() {
  if (nombre !== "") {
    return false
 } 
   else if (imagen !== "") {
   return false
   }
    else if (descripcion !== "") {
    return false
    }
   return true
 }

  useEffect(() => {
    loadIndumentarias();
  }, [tipo]);

  function CloseModal() {
    const closeButton = document.getElementById("btn-close-modal");
    if (closeButton) {
      closeButton.click();
    }
  }
  

  function ClearProductInputs() {
    setNombre("");
    setImagen("");
    setDescripcion("");
  }

  function RetrieveProductInputs(product) {
    setId(product.id);
    setNombre(product.name);
    setImagen(product.imageUrl);
    setDescripcion(product.description);
  }
  function IsValid() {
    if (nombre === "") {
      Swal.fire({
        icon: 'error',
        title: 'El nombre no puede estar vacío',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }).then(function () {
        setTimeout(function () {
          document.getElementById('nombre').focus();
        }, 500);
      });
      return false;
    } 
     else if (imagen === "") {
      Swal.fire({
        icon: 'error',
        title: 'La URL de la imagen no puede estar vacía',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }).then(function () {
        setTimeout(function () {
          document.getElementById('urlImagenInput').focus();
        }, 500);
      });
      return false;
    }
    return true;
  }

  return (
    <div className='global-container'>
      <div className='title-btn-container'>
        <h1>Manage clothes</h1>
        
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-select me-3">
            <option value="remeras">T-Shirts</option>
            <option value="buzos">Divers</option>
            <option value="pantalones">Pants</option>
            <option value="accesorios">Accesories</option>
          </select>
  
          <button type="button" className="btn btn-success svg-btn" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { ClearProductInputs(); setModalTitle("Registrar Producto"); setTimeout(function () { document.getElementById('nombre').focus(); }, 500);  }}>
            <PostSvg className="svg" />
          </button>
      </div>
  
      <table className="table table-striped table-bordered table-hover table-custom" align="center">
        <thead className="thead-dark">
          <tr className="table-header">
            <th className="table-title" scope="col">#</th>
            <th className="table-title" scope="col">Nombre</th>
            <th className="table-title" scope="col">Imagen</th>
            <th className="table-title" scope="col">Descripción</th>
            <th className="table-title" scope="col">Acciones</th>
          </tr>
        </thead>
  
        {indumentarias.length > 0 ? (
          <tbody>
            {indumentarias.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td><img src={product.imageUrl} className="table-img" alt="Producto" /></td>
                <td>{product.descripcion}</td> 
                <td>
                  <button type="button" className="btn btn-warning svg-btn" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { RetrieveProductInputs(product); setModalTitle("Actualizar Producto") }}>
                    <PutSvg className="svg" />
                  </button>
  
                  <button
                    type="button"
                    className="btn btn-danger svg-btn"
                    onClick={() => Swal.fire({
                      title: '¿Está seguro de que desea eliminar la siguiente producto: ' + (product.name) + '?',
                      imageUrl: `${product.imageUrl}`,
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: 'Producto a eliminar',
                      text: "Una vez eliminado, no se podrá recuperar",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#dc3545', 
                      cancelButtonColor: '#6c757d',
                      confirmButtonText: 'Aceptar',
                      cancelButtonText: 'Cancelar',
                      focusCancel: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(product.id)
                      }
                    })
                    }
                  >
                    <DeleteSvg className="svg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="table-name" colSpan={5}>Sin registros</td>
            </tr>
          </tbody>
        )}
      </table>
  
      {/* Modal con el formulario para registrar/actualizar un producto */}
      <div className="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h1 className="modal-title" id="exampleModalLabel">{modalTitle}</h1>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="id"
                      hidden
                      value={id}
                      onChange={(event) => {
                        setId(event.target.value);
                      }}
                    />
  
                    <label className="label">Nombre:</label>
                    <div className="form-group-input">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="nombre"
                        value={nombre}
                        onChange={(event) => {
                          setNombre(event.target.value);
                        }}
                      />
                    </div>
                  </div>
  
                  <div className="form-group">
                    <label id="urlImagenLabel" className="label">URL Imagen:</label>
                    <div id="urlImagen">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="urlImagenInput"
                        value={imagen}
                        onChange={(event) => {
                          setImagen(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label">Descripción:</label>
                    <div className="form-group-input">
                      <textarea
                        className="form-control mb-3"
                        id="descripcion"
                        value={descripcion}
                        onChange={(event) => {
                          setDescripcion(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {modalTitle === "Registrar Producto" ? (
                      <div id="div-btn-save">
                        <button className="btn btn-success" id="btn-save" onClick={handleSubmit}>
                          <div>
                            <p className="fw-semibold">Guardar</p>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div id="div-btn-update">
                        <button className="btn btn-warning" id="btn-update" onClick={handlePutProduct}>
                          <div>
  
                            <p className="fw-semibold text-white">Actualizar</p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                onClick={() => {
                  if (modalTitle === 'Registrar Producto') {
                    if (IsEmpty() === true) {
                      ClearProductInputs();
                      CloseModal()
                    } else {
                      Swal.fire({
                        icon: 'warning',
                        title: '¿Está seguro de que desea cerrar el formulario?',
                        text: "Se perderán todos los datos cargados",
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#f8bb86',
                        cancelButtonColor: '#6c757d',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          ClearProductInputs();
                          CloseModal();
                        }
                      })
                    }
                  } else if (modalTitle === 'Actualizar Producto') {
                    Swal.fire({
                      icon: 'warning',
                      title: '¿Está seguro de que desea cerrar el formulario?',
                      text: "Se perderán todos los datos modificados",
                      confirmButtonText: 'Aceptar',
                      showCancelButton: true,
                      cancelButtonText: 'Cancelar',
                      confirmButtonColor: '#f8bb86',
                      cancelButtonColor: '#6c757d',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        ClearProductInputs();
                        CloseModal();
                      }
                    })
                  }
                }}
              >
                <div>
                  <p className="fw-semibold">Cerrar</p>
                </div>
              </button>
              <button type="button" hidden className="btn-close-modal" id="btn-close-modal" data-bs-dismiss="modal"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Add;
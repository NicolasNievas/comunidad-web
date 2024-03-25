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
      console.error('Error fetching products:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error loading the products. Please try again.',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteIndumentaria(tipo, id);
      Swal.fire({
        icon: 'success',
        title: 'eliminated product',
        text: 'Product has been successfully removed',
        showConfirmButton: false,
        timer: 2000
      });
      loadIndumentarias();
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error deleting the product. Please try again.',
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
          title: 'Product added',
          text: 'Product has been added successfully',
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
          text: 'There was an error registering the product. Please try again.',
          confirmButtonText: 'Accept',
          confirmButtonColor: '#f27474',
        });
      }
    }
  };

  const handlePutProduct = async (e) => {
    e.preventDefault();
    const indumentaria = { name: nombre, imageUrl: imagen, descripcion: descripcion };
    const isValid = IsValid();
    if (isValid) {
      try {
        await EditIndumentaria(tipo, id, indumentaria); 
        Swal.fire({
          icon: 'success',
          title: 'Updated product',
          text: 'The product has been successfully upgraded',
          showConfirmButton: false,
          timer: 2000
        });
        CloseModal();
        loadIndumentarias(); 
      } catch (error) {
        console.error('Error updating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the product. Please try again.',
          confirmButtonText: 'Accept',
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
        title: 'The name cannot be empty',
        text: 'Complete the field',
        confirmButtonText: 'Accept',
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
        title: 'The URL of the image cannot be empty',
        text: 'Complete the field',
        confirmButtonText: 'Accept',
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
        <div className="table-container">
        <thead className="thead-dark">
          <tr className="table-header">
            <th className="table-title" scope="col">#</th>
            <th className="table-title" scope="col">Name</th>
            <th className="table-title" scope="col">Imagen</th>
            <th className="table-title" scope="col">Description</th>
            <th className="table-title" scope="col">Shares</th>
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
                      title: 'Are you sure you want to remove the following product: ' + (product.name) + '?',
                      imageUrl: `${product.imageUrl}`,
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: 'Producto a eliminar',
                      text: "Once deleted, it cannot be recovered",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#dc3545', 
                      cancelButtonColor: '#6c757d',
                      confirmButtonText: 'Accept',
                      cancelButtonText: 'Cancel',
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
              <td className="table-name" colSpan={5}>No records</td>
            </tr>
          </tbody>
        )}
        </div>
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
  
                    <label className="label">Name:</label>
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
                    <label id="urlImagenLabel" className="label">URL Image:</label>
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
                    <label className="label">Descriptión:</label>
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
                            <p className="fw-semibold">Save</p>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div id="div-btn-update">
                        <button className="btn btn-warning" id="btn-update" onClick={handlePutProduct}>
                          <div>
  
                            <p className="fw-semibold text-white">Update</p>
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
                        title: 'Are you sure you want to close the form?',
                        text: "All uploaded data will be lost",
                        confirmButtonText: 'Accept',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
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
                      title: 'Are you sure you want to close the form?',
                      text: "All modified data will be lost",
                      confirmButtonText: 'Accept',
                      showCancelButton: true,
                      cancelButtonText: 'Cancel',
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
                  <p className="fw-semibold">Close</p>
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
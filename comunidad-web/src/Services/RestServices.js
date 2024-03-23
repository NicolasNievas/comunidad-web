async function GetRemeras() {
  return fetch("http://localhost:3001/remeras").then((response) =>
    response.json()
  );
}

async function GetBuzos(){
  return fetch("http://localhost:3001/buzos").then((response) =>
    response.json()
  );
}

async function GetPantalones(){
  return fetch("http://localhost:3001/pantalones").then((response) =>
    response.json()
  );
}

async function GetAccesorios(){
  return fetch("http://localhost:3001/accesorios").then((response) =>
    response.json()
  );
}

async function GetIndumentarias(tipo) {
  return fetch(`http://localhost:3001/${tipo}`).then((response) =>
    response.json()
  );
}

async function AddIndumentaria(tipo, indumentaria) {
  return fetch(`http://localhost:3001/${tipo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(indumentaria),
  }).then((response) => response.json());
}

async function EditIndumentaria(tipo, id, indumentaria) {
  return fetch(`http://localhost:3001/${tipo}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(indumentaria),
  }).then((response) => response.json());
}

async function DeleteIndumentaria(tipo, id) {
  return fetch(`http://localhost:3001/${tipo}/${id}`, {
    method: "DELETE",
  });
}

export { GetRemeras, GetBuzos, GetPantalones, GetAccesorios, AddIndumentaria, EditIndumentaria, DeleteIndumentaria, GetIndumentarias};

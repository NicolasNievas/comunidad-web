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

async function AddIndumentaria(indumentaria){
  return fetch("http://localhost:3001/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(indumentaria),
  }).then((response) => response.json());
}

export { GetRemeras, GetBuzos, GetPantalones, GetAccesorios, AddIndumentaria};

async function GetRemeras() {
  return fetch("http://localhost:3001/remeras").then((response) =>
    response.json()
  );
}

export { GetRemeras };

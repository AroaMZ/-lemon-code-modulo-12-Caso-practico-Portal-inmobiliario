import Axios from "axios";

const url = `${process.env.BASE_API_URL}/properties`;

export const getPropertyDetail = (propertyId) => Axios.get(`${url}`, {
  params: {
    id: propertyId 
  }
}).then(response =>{
  return response.data
});

const equipmentListUrl = `${process.env.BASE_API_URL}/equipments`;

export const getEquipmentList = () =>
  Axios.get(equipmentListUrl).then((response) => {
  return response.data;
  });

  const urlForm = `${process.env.BASE_API_URL}/contact`;

  export const insertForm = (form) =>
  Axios.post(`${url}/${properties.id}`, form).then((response) => response.data);
  //Axios.post(`${url}/${account.id}`, account).then(({ data }) => data);

// const messageUrl = `${process.env.BASE_API_URL}/contact`;

// export const insertMessage = (message) =>
//   Axios.post(`${messageUrl}`, message).then(({ data }) => data);

//Para formulario
// var time, position, resultados;
// var x1,v1,a1,x2,v2,a2; // variables Globales

// function obtenerDatos(){
//  x1 = document.getElementById("email").value;
//  v1 = document.getElementById("message").value;


//     var r = [x1, v1];
//     return r;
// }

// var input = document.getElementsByTagName("INPUT");

// for (i=0; i<input.length; i++) {
//  input[i].addEventListener("change",  function(){
//   resultados = obtenerDatos();
//   console.log(resultados);
//  });
// };
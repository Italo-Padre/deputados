import axios from "axios";

const ApiDeputados = axios.create({
  baseURL: "https://dadosabertos.camara.leg.br/api/v2/",
});

export default ApiDeputados;
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9898/biblioteca/v1/",
  headers: {
    "Content-type": "application/json"
  }
});
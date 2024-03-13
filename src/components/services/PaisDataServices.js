import http from "../../http-common";

class PaisDataServices {

    getAll() {
        return http.get("pais/get/all");
    }

    create(data) {
        return http.post("pais/create", data);
    }

    deleteById(id) {
        return http.delete(`pais/delete/${id}`);
    }
    getById(id) {
        console.log('pais por id', id);
        return http.get(`pais/${id}`);
    }

}

export default new PaisDataServices();
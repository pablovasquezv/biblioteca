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


}

export default new PaisDataServices();
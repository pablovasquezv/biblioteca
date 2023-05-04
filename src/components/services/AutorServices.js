import http from "../../http-common";

class AutorServices {

    getAll() {
        return http.get("autor/get/all");
    }

    deleteById(id) {
        return http.delete(`autor/delete/${id}`);
    }


}

export default new AutorServices();
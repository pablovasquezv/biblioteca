import http from "../../http-common";

class EditorialDataServices {
    getAll() {
        return http.get('editorial/get/all');
    }

    create(data) {
        return http.post('editorial/create', data);
    }

    update(id, data) {
        return http.put(`editorial/update/${id}`, data);
      }

    deleteById(id) {
        return http.delete(`editorial/delete/${id}`);
    }

}

export default new EditorialDataServices();
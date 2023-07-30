import http from "../../http-common";

class AutorDataServices {

    getAll() {
        return http.get('autor/get/all');
    }

    create(data) {
        return http.post('autor/create', data);
    }

    update(id,data){
        return http.put(`autor/update/${id}`, data)
    }

    deleteById(id) {
        return http.delete(`autor/delete/${id}`);
    }


}

export default new AutorDataServices();
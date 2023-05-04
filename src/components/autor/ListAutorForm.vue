<template>
  <div class="container">
    <div class="form-group">
      <router-link to="/listaAutores"
        ><b>Crear un nuevo Apoderado</b></router-link
      >
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="text-center"><b>ID</b></th>
                <th class="text-center"><b>Nombres</b></th>
                <th class="text-center"><b>Apellidos</b></th>
                <th class="text-center"><b>País</b></th>
                <th class="text-center"><b>Botón</b></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="autor in Autores" :key="autor.key">
                <td>hola</td>
                <td>{{ autor.id_autor }}</td>
                <td>{{ autor.nombres_autor }}</td>
                <td>{{ autor.apellidos_autor }}</td>
                <td>{{ autor.pais.nombre_pais }}</td>
                <td>
                  <button v-on:click="deleteAutorClicked(autor.id_autor)">
                    <b>Eliminar</b>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AutorServices from "../services/AutorServices";

export default {
  name: "Autor-list",
  data() {
    return {
      Autores: [],
      autor: null,
      currentIndex: -1,
    };
  },
  methods: {
    retriveAutorService() {
      AutorServices.getAll()
        .then((response) => {
          this.Autores = response.data;
          alert( response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retriveAutorService();
      this.autor = null;
      this.currentIndex = -1;
    },
    deleteAutorClicked(id) {
      if (window.confirm("¿Realmente quiere borrar?")) {
        AutorServices.deleteById(id)
          .then((response) => {
            console.log("¡Registro eliminado", response.data);
            this.message = `Delete of Apoderado ${id} Successful`;
            alert("¡Eliminado correctamente!");
            this.refreshList();
          })
          .catch((e) => {
            console.log("Error", e);
          });
      }
    },
    mounted() {
      this.retriveAutorService();
    },
  },
};
</script>
<style>
.btn-primary {
  margin-right: 12px;
}
</style>
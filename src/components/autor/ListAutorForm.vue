<template>
  <div class="container">
    <div class="form-group">
      <router-link to="/createAutores"><b>Crear un nuevo autor</b></router-link>
    </div>
    <div class="row">
      <div class="col-md-12 table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="text-center"><b>ID</b></th>
              <th class="text-center"><b>Nombres</b></th>
              <th class="text-center"><b>Apellidos</b></th>
              <th class="text-center"><b>Nacionalidad</b></th>
              <th class="text-center"><b>Botón</b></th>
              <th class="text-center"><b>Botón</b></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in Autores" :key="autor.key">
              <td class="text-center">{{ autor.id_autor }}</td>
              <td class="text-center">{{ autor.nombres_autor }}</td>
              <td class="text-center">{{ autor.apellidos_autor }}</td>
              <td class="text-center">{{ autor.pais.nombre_pais }}</td>
            
              <td class="text-center">
                <router-link :to="{name: 'editautor', params: { id: autor.id_autor }}" class="btn btn-warning"><b>Editar</b>
                            </router-link>
              </td>
              <td class="text-center">
                <button
                  v-on:click="deleteAutorClicked(autor.id_autor)"
                  class="btn btn-danger"
                >
                  <b>Borrar</b>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AutorDataService from "../services/AutorDataServices";

export default {
  name: "autor-list",
  data() {
    return {
      Autores: [],
      autor: null,
      currentIndex: -1,
    };
  },
  methods: {  
    retrieveAutorDataService() {
      AutorDataService.getAll()
        .then((response) => {
          this.Autores = response.data;
          // alert(response.data);
          console.log("Lista de Autores: "+JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log("¡Ocurrio un error!"+e);
        });
    },
    refreshList() {
      this.retrieveAutorDataService();
      this.autor = null;
      this.currentIndex = -1;
    },
    
    deleteAutorClicked(id) {
      if (window.confirm("¿Realmente quiere borrar? "+id)) {
        AutorDataService.deleteById(id)
          .then((response) => {
            console.log("¡Registro borrado!", response.data);
            this.message = `Delete of autor ${id} Successful`;
            alert("¡Eliminado correctamente!");
            this.refreshList();
            // this.$router.push({ name: "tutorials" });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.retrieveAutorDataService();
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>
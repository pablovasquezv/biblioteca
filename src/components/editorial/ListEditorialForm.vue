<template>
    <div class="container">
      <div class="form-group">
        <router-link to="/createEditoriales"><b>Crear un nuevo editorial</b></router-link>
      </div>
      <div class="row">
        <div class="col-md-12 table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="text-center"><b>ID</b></th>
                <th class="text-center"><b>Nombre</b></th>
                <th class="text-center"><b>Descripción</b></th>
                <th class="text-center"><b>Botón</b></th>
                <th class="text-center"><b>Botón</b></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="editorial in Editoriales" :key="editorial.key">
                <td class="text-center">{{ editorial.id_editorial }}</td>
                <td class="text-center">{{ editorial.nombre_editorial }}</td>
                <td class="text-center">{{ editorial.descripcion_editorial }}</td>
                <td class="text-center">
                  <router-link :to="{name: 'editeditorial', params: { id: editorial.id_editorial }}" class="btn btn-warning"><b>Editar</b>
                              </router-link>
                </td>
                <td class="text-center">
                  <button
                    v-on:click="deleteEditorialClicked(editorial.id_editorial)"
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
  import EditorialDataService from "../services/EditorialDataServices";
  
  export default {
    name: "editorial-list",
    data() {
      return {
        Editoriales: [],
        editorial: null,
        currentIndex: -1,
      };
    },
    methods: {  
      retrieveEditorialDataService() {
        EditorialDataService.getAll()
          .then((response) => {
            this.Editoriales = response.data;
            // alert("Datos a Editar"+JSON.stringify (response.data));
            console.log("Datos a Editar"+JSON.stringify (response.data));
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveEditorialDataService();
        this.editorial = null;
        this.currentIndex = -1;
      },
      
      deleteEditorialClicked(id) {
        if (window.confirm("¿Realmente quiere borrar? "+id)) {
          EditorialDataService.deleteById(id)
            .then((response) => {
              console.log("¡Registro borrado!", response.data);
              this.message = `Delete of editorial ${id} Successful`;
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
      this.retrieveEditorialDataService();
    },
  };
  </script>
  
  <style>
  .btn-primary {
    margin-right: 12px;
  }
  </style>
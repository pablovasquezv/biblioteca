<template>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center mb-3"><b>Actualizar Autor</b></h3>
        <form @submit.prevent="onUpdateForm">
          <input
            type="text"
            class="form-control"
            v-model="autor.id_autor"
            disabled="true"
            hidden="true"
          />
          <div class="row mb-3">
            <div class="col">
              <div class="form-group">
                <label><b>Nombres</b></label>
                <input
                  type="text"
                  class="form-control"
                  v-model="autor.nombres_autor"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label><b>Rut</b></label>
                <input
                  type="text"
                  class="form-control"
                  v-model="autor.apellidos_autor"
                  disabled="true"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block"><b>Actualizar</b></button>
          </div>
        </form>
      </div>
    </div>
  </template>
    
    <script>
  import AutorService from "../services/AutorDataServices";
  
  export default {
    data() {
      return {
        autor: [],
      };
    },
    created() {
      let dbRef = AutorService.getAll().doc(this.$route.params.id);
      dbRef
        .get()
        .then((doc) => {
          this.autor = doc.data();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
      updateTutorial() {
        AutorService.update(this.autor.id_autor, this.autor)
          .then((response) => {
            console.log(response.data);
            this.message = "The tutorial was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    mounted() {
      this.retrieveAutorService();
    },
  };
  </script>
  
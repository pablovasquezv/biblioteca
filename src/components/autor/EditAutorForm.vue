<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center mb-3"><b>Actualizar Autor</b></h3>
      <form @submit.prevent="updateAutor" class="was-validated">
        <input type="number" class="form-control" v-model="autor.id_autor" name="id_autor" disabled />
        <div class="row mb-3">
          <div class="col">
            <div class="form-group">
              <label for="nombres_autor"><b>Nombres</b></label>
              <input type="text" class="form-control" v-model="autor.nombres_autor" name="nombres_autor" required />
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="apellidos_autor"><b>Apellidos Autor</b></label>
              <input type="text" class="form-control" v-model="autor.apellidos_autor" name="apellidos_autor" required />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="id_pais"><b>Seleccione un País</b></label>
          <select class="custom-select" id="id_pais" v-model="autor.id_pais" name="id_pais" required>
            <option v-for="pais in Paises" :key="pais.id_pais" :value="pais.id_pais">{{ pais.nombre_pais }}</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block"><b>Actualizar</b></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AutorDataService from "../services/AutorDataServices";
import PaisDataService from "../services/PaisDataServices";

export default {
  name: "edit-autor",
  data() {
    return {
      Paises: [],
      autor: {
        id_autor: 0,
        nombres_autor: "",
        apellidos_autor: "",
        id_pais: 0,
      },
    };
  },
  mounted() {
    this.retrievePaisDataService();
    this.retrieveAutorDataService();
  },
  methods: {
    retrieveAutorDataService() {
      AutorDataService.getIdAutor(this.$route.params.id)
        .then((response) => {
          this.autor = response.data;
          const selectedPais = this.Paises.find((pais) => pais.id_pais === response.data.id_pais);
          this.autor.pais = selectedPais;
          console.log("Autor desde BD :" + JSON.stringify(this.autor));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    retrievePaisDataService() {
      PaisDataService.getAll()
        .then((response) => {
          this.Paises = response.data;
        })
        .catch((e) => {
          console.log("¡Error en la lista de paises!" + e);
        });
    },
    updateAutor() {
      AutorDataService.update(this.$route.params.id, this.autor)
        .then((response) => {
          this.autor = response.data;
          console.log("Enviando Data a la bd: " + JSON.stringify(response.data));
          this.$router.push("/listaAutores");
        })
        .catch((e) => {
          alert("¡Ocurrió un error al guardar los datos en la BD!" + JSON.stringify(this.autor));
          console.log(e);
        });
    },
  },
};
</script>

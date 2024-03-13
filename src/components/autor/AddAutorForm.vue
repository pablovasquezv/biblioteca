<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center mb-3"><b>Nuevo Autor</b></h3>
      <form @submit.prevent="saveAutor" class="was-validated">
        <div class="row mb-3">
          <div class="col">
            <div class="form-group">
              <label><b>Nombres</b></label>
              <input
                type="text"
                class="form-control"
                minlength="4"
                maxlength="50"
                required
                v-model="autor.nombres_autor"
                name="nombres_autor"
                placeholder=""
              />
              <div class="invalid-feedback">
                El nombre debe tener entre 4 y 50 caracteres.
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label><b>Apellidos</b></label>
              <input
                type="text"
                class="form-control"
                minlength="4"
                maxlength="50"
                required
                v-model="autor.apellidos_autor"
                name="apellidos_autor"
                placeholder=""
              />
              <div class="invalid-feedback">
                Los apellidos deben tener entre 4 y 50 caracteres.
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label><b>Seleccione un País</b></label>
          <select
            class="custom-select"
            id="id_pais"
            required
            v-model="autor.id_pais"
            name="id_pais"
          >
            <option disabled value="">Seleccione el país del autor...</option>
            <option
              v-for="pais in Paises"
              :key="pais.id_pais"
              :value="pais.id_pais"
            >
              {{ pais.nombre_pais }}
            </option>
          </select>
          <div class="invalid-feedback">
            Por favor, seleccione un país.
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">
            <b>Crear</b>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import AutorDataService from "../services/AutorDataServices";
import PaisDataService from "../services/PaisDataServices";

export default {
  name: "add-autor",
  data() {
    return {
      Paises: [],
      select: 'Seleccione el país del autor.....',
      autor: {
        id: null,
        nombres_autor: "",
        apellidos_autor: "",
        id_pais: null,
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    retrievePaisDataService() {
      PaisDataService.getAll()
        .then((response) => {
          this.Paises = response.data;
          console.log("Lista de Países: " + JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log("Error en la lista de países: " + e);
        });
    },
    saveAutor() {
      AutorDataService.create(this.autor)
        .then((response) => {
          this.autor.id = response.data.id;
          console.log(
            "Datos del Autor enviados a la base de datos: " +
              JSON.stringify(response.data)
          );
          this.submitted = true;
          this.$router.push("/listaAutores");
        })
        .catch((e) => {
          alert("Ocurrió un error al guardar los datos: " + JSON.stringify(e));
          console.log(e);
        });
    },
    newAutor() {
      this.submitted = false;
      this.autor = {
        id: null,
        nombres_autor: "",
        apellidos_autor: "",
        id_pais: null,
        published: false,
      };
    },
  },
  mounted() {
    this.retrievePaisDataService();
  },
};
</script>
<style>
.form-container {
  max-width: 300px;
  margin: auto;
}
</style>

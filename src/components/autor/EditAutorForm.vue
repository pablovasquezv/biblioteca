<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center mb-3"><b>Actualizar Autor</b></h3>
      <form @submit.prevent="updateAutor" class="was-validated">
        <input
          type="number"
          class="form-control"
          v-model="autor.id_autor"
          name="id_autor"
          disabled
        />
        <div class="row mb-3">
          <div class="col">
            <div class="form-group">
              <label><b>Nombres</b></label>
              <input
                type="text"
                class="form-control"
                v-model="autor.nombres_autor"
                name="nombres_autor"
                placeholder=""
                required
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label><b>apellidos Autor</b></label>
              <input
                type="text"
                class="form-control"
                v-model="autor.apellidos_autor"
                name="apellidos_autor"
                placeholder=""
                required
              />
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
            <option
            v-for="pais in Paises"
            :key="pais.id_Pais"
            :value="pais.id_pais">
              {{ pais.nombre_pais }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">
            <b>Actualizar</b>
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
  name: "edit-autor",
  data() {
    return {
      Paises: [],
      pais: null,
      currentIndex: -1,
      id_Autor: this.$route.params.id,
      id_Pais: this.$route.params.id,
      autor: {
        id_autor: 0,
        nombres_autor: "",
        apellidos_autor: "",
        id_pais: 0,
        published: false,
      },
      submitted: false,
    };
  },

  mounted() {
    this.retrievePaisDataService();
    //
    this.retrieveAutorDataService();
    //this.retrievePaisIdDataService();
  },

  methods: {
    retrieveAutorDataService() {
      AutorDataService.getIdAutor(this.id_Autor)
        .then((response) => {
          this.autor.id_autor = response.data.id_autor;
          this.autor.nombres_autor = response.data.nombres_autor;
          this.autor.apellidos_autor = response.data.apellidos_autor;
          this.autor.id_pais = response.data.id_pais
          // Busca el objeto de país correspondiente y asígnalo a autor.pais
          const selectedPais = this.Paises.find(
            (pais) => pais.id_pais === response.data.pais.id_pais
          );
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
          // alert(response.data);
          // console.log("Lista de Países: " + JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log("¡Error en la lista de paises!" + e);
        });
    },
    updateAutor() {
      var data = {
        id_autor: this.autor.id_autor,
        nombres_autor: this.autor.nombres_autor,
        apellidos_autor: this.autor.apellidos_autor,
        id_pais: this.autor.id_pais
      };
      console.log("Datos del Id del Autor enviados a la BD: " + JSON.stringify(this.id_Autor));
      console.log("Datos del Autor enviados a la BD: " + JSON.stringify(data));
      AutorDataService.update(this.id_Autor, data)
        .then((response) => {
          this.autor.id_autor = response.data;
          console.log(
            "Enviando Data a la bd: " + JSON.stringify(response.data)
          );
          this.submitted = true;
          this.$router.push("/listaAutores");
        })
        .catch((e) => {
          alert(
            "¡Ocurrió un error al guardar los datos en la BD!" +
              JSON.stringify(data)
          );
          console.log(e);
        });
    },
  },
  refreshList() {
    this.retrievePaisDataService();
    this.pais = null;
    this.currentIndex = -1;
  },
};
</script>


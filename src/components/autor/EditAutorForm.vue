<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center mb-3"><b>Actualizar Autor</b></h3>
      <form @submit.prevent="updateAutor" class="was-validated">
        <input
          type="text"
          class="form-control"
          v-model="autor.id_autor"
          name="id_autor"
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
                name="nombres_autor"
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
            <option>
              <b>Selecciona el país del autor...</b>
            </option>
            <option
              v-for="pais in Paises"
              :key="pais.id_pais"
              :value="pais.id_pais"
            >
              {{ pais.nombre_pais }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <button  @click="updateAutor"  class="btn btn-primary btn-block"><b>Actualizar</b></button>
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
      autor: {
        id: null,
        nombres_autor: "",
        apellidos_autor: "",
        id_pais: 0,
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
          // alert(response.data);
          console.log("Lista de Países: "+JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log("¡Error en la lista de paises!"+e);
        });
    },
    updateAutor() {
      var data = {
        nombres_autor: this.autor.nombres_autor,
        apellidos_autor: this.autor.apellidos_autor,
        pais: {
          id_pais: this.autor.id_pais
        }  
      };
      console.log("Datos Autor: "+JSON.stringify(data));
      AutorDataService.update(id, data)
        .then((response) => {
          this.autor.id = response.data.id;
          console.log("Enviando Data a la bd: "+JSON.stringify(response.data));
          this.submitted = true;
          this.$router.push("/listaAutores");
        })
        .catch((e) => {
          alert("¡Ocurrío un erro al guardar los datos!"+JSON.stringify(data));
          console.log(e);
        });
    },
    newAutor() {
      this.submitted = false;
      this.autor = {};
    },
  },
  refreshList() {
    this.retrievePaisDataService();
    this.pais = null;
    this.currentIndex = -1;
  },
  mounted() {
    this.retrievePaisDataService();
  },
};
</script>
  
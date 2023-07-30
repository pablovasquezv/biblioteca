<template>
  <div class="submit-form was-validated">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nombres_autor"><b>Nombres</b></label>
        <input
          type="text"
          class="form-control"
          id="nombres_autor"
          required
          v-model="autor.nombres_autor"
          name="nombres_autor"
          value="Amanda"
        />
      </div>

      <div class="form-group">
        <label for="apellidos_autor">Apellidos</label>
        <input
          class="form-control"
          id="apellidos_autor"
          required
          v-model="autor.apellidos_autor"
          name="apellidos_autor"
          value="Vásquez"
        />
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

      <button @click="saveAutor" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAutor">Add</button>
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
    saveAutor() {
      var data = {
        nombres_autor: this.autor.nombres_autor,
        apellidos_autor: this.autor.apellidos_autor,
        pais: {
          id_pais: this.autor.id_pais
        }  
      };
      console.log("Datos Autor: "+JSON.stringify(data));
      AutorDataService.create(data)
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
  
  <style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
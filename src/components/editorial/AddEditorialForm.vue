<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nombre_editorial"><b>Nombres</b></label>
        <input
          type="text"
          class="form-control"
          id="nombre_editorial"
          required
          v-model="editorial.nombre_editorial"
          name="nombre_editorial"
        />
      </div>

      <div class="form-group">
        <label for="descripcion_editorial">Descripción</label>
        <input
          class="form-control"
          id="descripcion_editorial"
          required
          v-model="editorial.descripcion_editorial"
          name="descripcion_editorial"
        />
      </div>

      <button @click="saveEditorial" class="btn btn-success"><b>Submit</b></button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEditorial">Add</button>
    </div>
  </div>
</template>
    
<script>
import EditorialDataService from "../services/EditorialDataServices";
export default {
  name: "add-editorial",
  data() {
    return {
      pais: null,
      currentIndex: -1,
      editorial: {
        id: null,
        nombre_editorial: "",
        descripcion_editorial: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveEditorial() {
      var data = {
        nombre_editorial: this.editorial.nombre_editorial,
        descripcion_editorial: this.editorial.descripcion_editorial,
      };

      EditorialDataService.create(data)
        .then((response) => {
          this.editorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push("/listaEditoriales");
        })
        .catch((e) => {
          alert(data);
          console.log(e);
        });
    },
    newEditorial() {
      this.submitted = false;
      this.editorial = {};
    },
  },
};
</script>
    
    <style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
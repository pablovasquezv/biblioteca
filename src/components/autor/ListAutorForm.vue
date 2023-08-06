<template>
  <div class="container">
 
    
    <div class="form-group">
      <router-link class="btn btn-primary" to="/createAutores"
        ><b>Crear un nuevo autor</b></router-link
      >
    </div>


    <div class="row mt-3">
      <div class="col-md-12 table-responsive">
        <table
          class="table table-striped table-bordered display"
          id="tablaAutores"
        >
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
                <router-link
                  :to="{ name: 'editAutor', params: { id: autor.id_autor } }"
                  class="btn btn-warning"
                  ><b>Editar</b>
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
import $ from "jquery";

require("datatables.net-buttons/js/dataTables.buttons");
require("datatables.net-buttons/js/buttons.html5");
require("datatables.net-buttons/js/buttons.print");
//import print from "";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake.vfs = pdfFonts.pdfMake.vfs; //exportar a pdf
import "datatables.net-responsive-bs4";
import JSZip from "jszip";
window.JSZip = JSZip;

import AutorDataService from "../services/AutorDataServices";

export default {
  name: "autor-list",
  //components: { DataTable },
  data() {
    return {
      Autores: [],
      autor: null,
      currentIndex: -1,
    };
  },
  mounted() {
    this.retrieveAutorDataService();
    //this.tabla();
    //
  },
  methods: {
    
 cargarModalAgregarAlumnos() {
  alert("Botón modal");
  $('#exampleModal').modal('show')

    $('#frmAgregar').load('../autor/AddAutorForm.vue');
  },
    tabla() {
      this.$nextTick(() => {
        $("#tablaAutores").DataTable({
          "order":[[0,"asc"]],
          responsive: true,
          autoWidth: false,
          dom: "Bfrtip",
          language: {
            info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
            lengthMenu: 'Mostrar _MENU_ entradas',
            search: "Buscar",
            emptyTable: 'No hay datos disponibles en la tabla',
            zeroRecords: 'No se encontraron registros coincidentes',
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(Filtros de _MAX_ registros.)",
            paginate: {
              firt: "Primero",
              previous: "Anterior",
              next: "Siguiente",
              last: "Último",
            },
          },
          buttons: [
            {
              title: "Reporte Autores",
              extends: "exelHtml5",
              text: '<i class="fa-solid fa-file-excel"></i> Excel',
              className: "btn btn-success",
            },
            {
              title: "Reporte Autores",
              extends: "pdfHtml5",
              text: '<i class="fa-solid fa-file-pdf"></i> PDF',
              className: "btn btn-danger",
            },
            {
              title: "Reporte Autores",
              extends: "exelHtml5",
              text: '<i class="fa-solid fa-print"></i> Imprimir',
              className: "btn btn-dark",
            },
            {
              title: "Reporte Autores",
              extends: "copy",
              text: '<i class="fa-solid fa-copy"></i> Copiar Texto',
              className: "btn btn-dark",
            },
          ],

        });
      });
    },
    retrieveAutorDataService() {
      AutorDataService.getAll()
        .then((response) => {
          this.Autores = response.data;
          this.tabla();
          
          // alert(response.data);
          console.log("Lista de Autores: " + JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log("¡Ocurrio un error!" + e);
        });
    },
    refreshList() {
      this.retrieveAutorDataService();
      this.autor = null;
      this.currentIndex = -1;
    },

    deleteAutorClicked(id) {
      if (window.confirm("¿Realmente quiere borrar? " + id)) {
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
};

</script>

<style>
.btn-primary {
  margin-right: 12px;
}
@import "datatables.net-bs4";
</style>
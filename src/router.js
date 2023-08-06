import Vue from 'vue'
import VueRouter from 'vue-router'

import ListAutorForm  from  './components/autor/ListAutorForm.vue';
import AddAutorForm  from  './components/autor/AddAutorForm.vue';
import EditAutorForm  from  './components/autor/EditAutorForm.vue';
import AddEditorialForm  from  './components/editorial/AddEditorialForm.vue';
import ListEditorialForm  from  './components/editorial/ListEditorialForm.vue';

Vue.use(VueRouter)
const routes =[
    {path: '/listaAutores', component:ListAutorForm},
    {path: '/createAutores', component:AddAutorForm},
    { path: '/editAutor/:id', name: 'editAutor', component: EditAutorForm},
    {path: '/createEditoriales', component:AddEditorialForm},
    {path: '/listaEditoriales', component:ListEditorialForm}
]
export default new VueRouter({mode: 'history', routes})


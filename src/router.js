import Vue from 'vue'
import VueRouter from 'vue-router'

import ListAutorForm  from  './components/autor/ListAutorForm.vue';
import AddAutorForm  from  './components/autor/AddAutorForm.vue';
import AddEditorialForm  from  './components/editorial/AddEditorialForm.vue';
import ListEditorialForm  from  './components/editorial/ListEditorialForm.vue';

Vue.use(VueRouter)
const routes =[
    {path: '/listaAutores', component:ListAutorForm},
    {path: '/createAutores', component:AddAutorForm},
    {path: '/createEditoriales', component:AddEditorialForm},
    {path: '/listaEditoriales', component:ListEditorialForm}
]
export default new VueRouter({mode: 'history', routes})


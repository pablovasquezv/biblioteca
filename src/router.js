import Vue from 'vue'
import VueRouter from 'vue-router'

import ListAutorForm  from  './components/autor/ListAutorForm.vue';
import AddAutorForm  from  './components/autor/AddAutorForm.vue';

Vue.use(VueRouter)
const routes =[
    {path: '/listaAutores', component:ListAutorForm},
    {path: '/createAutores', component:AddAutorForm},
]
export default new VueRouter({mode: 'history', routes})


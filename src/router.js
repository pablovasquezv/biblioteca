import Vue from 'vue'
import VueRouter from 'vue-router'

import ListAutorForm  from  './components/autor/ListAutorForm.vue';


Vue.use(VueRouter)
const routes =[
    {path: '/listaAutores', component:ListAutorForm}
]
export default new VueRouter({mode: 'history', routes})


<template>
<div class="container">
  <app-header/>
  <router-view></router-view>
</div>
</template>

<script>
import HeaderBiblioteca from './components/header/HeaderBiblioteca.vue';

export default {
  name: 'App',
  components: {
    'app-header':HeaderBiblioteca
  }
}
</script>


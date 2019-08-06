<template>
  <div class="home">
    <h1>Trabajadores</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <UsuarioTrabajadorGrid :trabajadores="getUsuariosTrabajadores" :unidades="getUnidades"></UsuarioTrabajadorGrid>
    </v-container>
  </div>
</template>

<script>
import UsuarioTrabajadorGrid from '@/components/grids/UsuarioTrabajadorGrid.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'app-usuario-trabajador',
  components: { UsuarioTrabajadorGrid },

  created () {
    this.$store.dispatch('fetchUsuariosTrabajadores')
    this.$store.dispatch('fetchUnidades')
  },
  computed: {
    ...mapGetters(['getUsuariosTrabajadores', 'getUnidades'])
  }
}
</script>

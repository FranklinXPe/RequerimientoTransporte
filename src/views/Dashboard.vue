<template>
  <div class="home">
    <h1>Motor de Busqueda</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <UsuarioGrid :muestras="getUsuarios"></UsuarioGrid>
    </v-container>
  </div>
</template>

<script>
import UsuarioGrid from '@/components/grids/UsuarioGrid';
import { mapGetters } from 'vuex';
export default {
  name: 'app-dashboard',
  components: { UsuarioGrid },

  created () {
    this.$store.dispatch('fetchUsuarios')
  },
  computed: {
    ...mapGetters(['getUsuarios'])
  }
}
</script>

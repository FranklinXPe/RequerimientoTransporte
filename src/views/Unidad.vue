<template>
  <div class="home">
    <h1>Unidades</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <UnidadGrid :unidades="getUnidades"></UnidadGrid>
    </v-container>
  </div>
</template>

<script>
import UnidadGrid from '@/components/grids/UnidadGrid';
import { mapGetters } from 'vuex';

export default {
  name: 'app-unidad',
  components: { UnidadGrid },

  created () {
    this.$store.dispatch('fetchUnidades')
  },
  computed: {
    ...mapGetters(['getUnidades'])
  }
}
</script>

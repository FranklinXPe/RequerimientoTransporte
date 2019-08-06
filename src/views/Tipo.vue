<template>
  <div class="home">
    <h1>Tipos</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <TipoGrid :tipos="getTipos"></TipoGrid>
    </v-container>
  </div>
</template>

<script>
import TipoGrid from '@/components/grids/TipoGrid';
import { mapGetters } from 'vuex';
export default {
  name: 'app-tipo',
  components: { TipoGrid },

  created () {
    this.$store.dispatch('fetchTipos')
  },
  computed: {
    ...mapGetters(['getTipos'])
  }
}
</script>

<template>
  <div class="home">
    <h1>Destinos</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <DestinoGrid :destinos="getDestinos"></DestinoGrid>
    </v-container>
  </div>
</template>

<script>
import DestinoGrid from '@/components/grids/DestinoGrid';
import { mapGetters } from 'vuex';
export default {
  name: 'app-destino',
  components: { DestinoGrid },

  created () {
    this.$store.dispatch('fetchDestinos')
  },
  computed: {
    ...mapGetters(['getDestinos'])
  }
}
</script>

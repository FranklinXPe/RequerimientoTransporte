<template>
  <div class="home">
    <h1>Trabajadores</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <TrabajadorGrid :trabajadores="getTrabajadores" :unidades="getUnidades"></TrabajadorGrid>
    </v-container>
  </div>
</template>

<script>
import TrabajadorGrid from '@/components/grids/TrabajadorGrid';
import { mapGetters } from 'vuex';
export default {
  name: 'app-trabajador',
  components: { TrabajadorGrid },

  created () {
    this.$store.dispatch('fetchTrabajadores')
    this.$store.dispatch('fetchUnidades')
  },
  computed: {
    ...mapGetters(['getTrabajadores', 'getUnidades'])
  }
}
</script>

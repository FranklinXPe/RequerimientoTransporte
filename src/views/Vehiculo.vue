<template>
  <div class="home">
    <h1>Vehiculos</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <VehiculoGrid :vehiculos="getVehiculos" :tipos="getTipos"></VehiculoGrid>
    </v-container>
  </div>
</template>

<script>
import VehiculoGrid from '@/components/grids/VehiculoGrid';
import { mapGetters } from 'vuex';
export default {
  name: 'app-vehiculo',
  components: { VehiculoGrid },

  created () {
    this.$store.dispatch('fetchVehiculos')
    this.$store.dispatch('fetchTipos')
  },
  computed: {
    ...mapGetters(['getVehiculos', 'getTipos'])
  }
}
</script>

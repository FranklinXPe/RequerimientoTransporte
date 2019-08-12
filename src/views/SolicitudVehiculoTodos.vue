<template>
  <div class="home">
    <h1>Lista de todas las solicitudes</h1>

    <FiltroBusqueda v-on:process="filtrar($event)"></FiltroBusqueda>

    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <SolicudVehiculoGrid :requerimiento="formatDateRequerimientos"></SolicudVehiculoGrid>
    </v-container>
  </div>
</template>

<script>
import format from 'date-fns/format';
import SolicudVehiculoGrid from '@/components/grids/SolicudVehiculoGrid.vue';
import { mapGetters } from 'vuex';
import FiltroBusqueda from '@/components/filtro/FiltroBusquedaSolicitudes.vue';
export default {
  name: 'app-solicitud-vehiculo-todos',
  components: { SolicudVehiculoGrid, FiltroBusqueda },

  methods: {
    filtrar (event) {
      if (event.evento !== 'todos') {
        this.$store
          .dispatch('fetchRequerimientosEntreFechas', event)
          .then(response => {
            this.terrenos = response.data.terrenos
          })
          .catch(error => {
            console.log('Hubo un error al retornar los datos', error.message)
          })
      } else {
        this.$store.dispatch('fetchRequerimientos')
      }
    }
  },
  created () {
    this.$store.dispatch('fetchRequerimientos')
  },
  mounted () {
    this.$store.dispatch('fetchRequerimientos')
  },
  computed: {
    formatDateRequerimientos () {
      var requerimientos = []
      var item = null
      for (var i = 0; i < this.getRequerimientos.length; i++) {
        item = Object.assign({}, this.getRequerimientos[i])
        item.fechaRequerimiento = format(item.fechaRequerimiento, 'DD-MM-YYYY')
        item.fechaIda = format(item.fechaIda, 'DD-MM-YYYY')
        item.fechaRetorno = format(item.fechaRetorno, 'DD-MM-YYYY')
        item.destino.nombre =
          item.destino.provincia + ' - ' + item.destino.distrito

        requerimientos.push(item)
      }

      return requerimientos
    },
    ...mapGetters(['getRequerimientos', 'getUsuario'])
  }
}
</script>

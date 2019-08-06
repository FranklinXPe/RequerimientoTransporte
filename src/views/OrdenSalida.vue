<template>
  <div class="home">
    <h1>Orden Salida de Vehículos Aprobados</h1>
    <!-- Este componente es usado para enfocar y centrar la pagina o el contenido que lleva (patron doble container)
    o darle un prop fluid que se extiende por completo en todo el ancho-->
    <v-container class="my-1">
      <OrdenSalidaGrid :requerimiento="formatDateRequerimientos"></OrdenSalidaGrid>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import OrdenSalidaGrid from "@/components/grids/OrdenSalidaGrid.vue";
import { mapGetters } from "vuex";
export default {
  name: "app-orden-salida",
  components: { OrdenSalidaGrid },

  created() {
    this.$store.dispatch("fetchRequerimientosByAprobados");
  },
  mounted() {
    this.$store.dispatch("fetchRequerimientosByAprobados");
  },
  computed: {
    formatDateRequerimientos() {
      var requerimientos = [];
      var item = null;
      for (var i = 0; i < this.getRequerimientos.length; i++) {
        item = Object.assign({}, this.getRequerimientos[i]);
        item.fechaRequerimiento = format(item.fechaRequerimiento, "DD-MM-YYYY");
        item.fechaIda = format(item.fechaIda, "DD-MM-YYYY");
        item.fechaRetorno = format(item.fechaRetorno, "DD-MM-YYYY");
        item.destino.nombre =
          item.destino.provincia + " - " + item.destino.distrito;

        requerimientos.push(item);
      }

      return requerimientos;
    },

    ...mapGetters(["getRequerimientos", "getUsuario"])
  }
};
</script>

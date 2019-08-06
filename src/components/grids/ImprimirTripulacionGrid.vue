<template>
  <div>
    <v-card>
      <v-card-title class="my-1">
        <span class="text-uppercase font-weight-bold subheading">Tripulación</span>

        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="tripulacion"
      :loading="loading"
      class="elevation-1"
      hide-actions="true"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.idTrabajador }}</td>
        <td class="text-xs-center">{{ props.item.dni }}</td>
        <td class="text-xs-center">{{ props.item.nombres }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Tu busqueda para "{{ search }}" no muestra resultados.</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'imprimir-tripulacion-grid',
  props: {
    tripulacion: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Codigo', value: 'idTrabajador', align: 'center' },
        { text: 'DNI', value: 'dni', align: 'center' },
        { text: 'Empleado', value: 'nombres', align: 'center' }
      ],

      loading: false,

      // Para el dialog
      editItem: {},
      dialog: false,
      selectTripulante: { idTrabajador: '', nombres: '' }
    }
  }
}
</script>

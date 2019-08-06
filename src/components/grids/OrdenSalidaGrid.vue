<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Salidas Vehiculos</span>
        <!-- Busqueda -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Busqueda"
          single-line
          hide-details
        ></v-text-field>
        <!-- Botón NUEVO -->
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="this.requerimiento"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.idRequerimiento }}</td>
        <td class="text-xs-left">{{ props.item.usuario.trabajador.nombres }}</td>
        <td class="text-xs-left">{{ props.item.destino.nombre }}</td>
        <td class="text-xs-center">{{ props.item.fechaRequerimiento }}</td>
        <td class="text-xs-center">{{ props.item.fechaIda }}</td>
        <td class="text-xs-center">{{ props.item.fechaRetorno }}</td>
        <td class="text-xs-left">{{ props.item.vehiculo.placa }}</td>
        <td class="text-xs-left">{{ props.item.vehiculo.clase }}</td>
        <td class="text-xs-left">
          <v-chip color="blue" dark>{{ props.item.aprobado }}</v-chip>
        </td>

        <td class="justify-text text-xs-center">
          <v-icon @click="verItem(props.item)">visibility</v-icon>
        </td>
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
  name: 'orden-salida-grid',

  props: {
    requerimiento: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Código', value: 'idRequerimiento', align: 'center' },
        {
          text: 'Responsable',
          value: 'usuario.trabajador.nombres',
          align: 'center'
        },
        { text: 'Destino', value: 'destino.nombre', align: 'center' },
        {
          text: 'Fecha Solicitud',
          value: 'fechaRequerimiento',
          align: 'center'
        },
        { text: 'Fecha Salida', value: 'fechaIda', align: 'center' },
        { text: 'Fecha Retorno', value: 'fechaRetorno', align: 'center' },

        { text: 'Placa', value: 'vehiculo.placa', align: 'center' },
        { text: 'Clase', value: 'vehiculo.clase', align: 'center' },
        { text: 'Estado', value: 'aprobado', align: 'center' },
        { text: 'Ver', value: 'name', sortable: false }
      ],
      items: this.requerimiento,
      loading: false,
      search: '',
      // Para el dialog
      editItem: {}
    }
  },
  methods: {
    verItem (item) {
      this.showItemIndex = this.requerimiento.indexOf(item)
      this.editItem = Object.assign({}, item)
      // REdireccionamos el requerimiento
      this.$router.push({
        name: 'imprimir-requerimiento-form',
        params: { idRequerimiento: this.editItem.idRequerimiento }
      })
    }
  }
}
</script>

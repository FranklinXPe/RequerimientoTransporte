<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Solicitud Vehículo</span>
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
        <v-btn color="primary" dark class="mb-2" @click="addNewItem()">
          <v-icon left small>add</v-icon>Nuevo
        </v-btn>
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="this.requerimiento"
      :loading="loading"
      class="elevation-1"
      :search="search"
      :custom-sort="customSort"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.idRequerimiento }}</td>
        <td class="text-xs-center">{{ props.item.fechaRequerimiento }}</td>
        <td class="text-xs-left">{{ props.item.usuario.trabajador.nombres }}</td>
        <td class="text-xs-left">{{ props.item.destino.nombre }}</td>

        <td class="text-xs-center">{{ props.item.fechaIda }}</td>
        <td class="text-xs-center">{{ props.item.fechaRetorno }}</td>
        <td class="text-xs-left">{{ props.item.vehiculo.placa }}</td>
        <td class="text-xs-left">{{ props.item.vehiculo.clase }}</td>
        <td class="text-xs-left">
          <v-chip
            v-if="props.item.aprobado==='APROBADO'"
            color="blue"
            dark
          >{{ props.item.aprobado }}</v-chip>
          <v-chip
            v-else-if="props.item.aprobado==='ANULADO'"
            color="red"
            dark
          >{{ props.item.aprobado }}</v-chip>
          <v-chip v-else dark>{{ props.item.aprobado }}</v-chip>
        </td>

        <td class="justify-text text-xs-center">
          <v-icon @click="editarItem(props.item)">edit</v-icon>
          <v-icon @click="deleteItem(props.item)">delete</v-icon>
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
  name: 'solicitud-vehiculo-grid',

  props: {
    requerimiento: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Código',
          value: 'idRequerimiento',
          align: 'center'
        },
        {
          text: 'Fecha Solicitud',
          value: 'fechaRequerimiento',
          align: 'center'
        },
        {
          text: 'Responsable',
          value: 'usuario.trabajador.nombres',
          align: 'center'
        },
        { text: 'Destino', value: 'destino.nombre', align: 'center' },

        { text: 'Fecha Salida', value: 'fechaIda', align: 'center' },
        { text: 'Fecha Retorno', value: 'fechaRetorno', align: 'center' },

        { text: 'Placa', value: 'vehiculo.placa', align: 'center' },
        { text: 'Clase', value: 'vehiculo.clase', align: 'center' },
        { text: 'Estado', value: 'aprobado', align: 'center' },
        { text: 'Acciones', value: 'name', sortable: false }
      ],
      items: this.requerimiento,
      loading: false,
      search: '',
      // Para el dialog
      editItem: {}
    }
  },
  methods: {
    customSort (items, index, isDescending) {
      // The following is informations as far as I researched.
      // items: 'food' items
      // index: Enabled sort headers value. (black arrow status).
      // isDescending: Whether enabled sort headers is desc
      items.sort((a, b) => {
        if (index === 'idRequerimiento') {
          if (isDescending) {
            return a.idRequerimiento - b.idRequerimiento
          } else {
            return b.idRequerimiento - a.idRequerimiento
          }
        }
      })

      return items
    },
    addNewItem () {
      // REdireccionamos el requerimiento
      this.$router.push({
        name: 'crear-requerimiento-form'
      })
    },
    editarItem (item) {
      this.showItemIndex = this.requerimiento.indexOf(item)
      this.editItem = Object.assign({}, item)
      // REdireccionamos el requerimiento
      this.$router.push({
        name: 'editar-requerimiento-form',
        params: { idRequerimiento: this.editItem.idRequerimiento }
      })
    },
    deleteItem (item) {
      const index = this.requerimiento.indexOf(item)
      if (confirm('Estas seguro que deseas eliminar este Requerimiento?')) {
        this.$store
          .dispatch('deleteRequerimiento', item.idRequerimiento)
          .then(response => {
            this.requerimiento.splice(index, 1)
          })
          .catch(error => {
            alert(
              'Algo sucesio al momento de eliminar el Requerimiento',
              error.message
            )
          })
      }
    }
  }
}
</script>

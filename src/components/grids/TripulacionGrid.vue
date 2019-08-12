<template>
  <div>
    <v-card>
      <v-card-title class="my-1">
        <span class="text-uppercase font-weight-bold subheading">Tripulación</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-select
                  v-model="selectTripulante"
                  :items="this.trabajadores"
                  item-text="nombres"
                  item-value="idTrabajador"
                  label="Tripulación"
                  return-object
                  single-line
                ></v-select>

                <v-btn color="primary" @click="agregarTripulante">Elegir</v-btn>
                <v-btn flat color="red" @click="cancel">Cancelar</v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>
        <!-- FIN: DialogForm para CRUD -->

        <!-- Botón NUEVO -->
        <v-spacer></v-spacer>
        <v-btn outline color="teal" class="mb-0" @click="showNewItem()">
          <v-icon left small>add</v-icon>Nuevo tripulante
        </v-btn>
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="tripulacion"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.idTrabajador }}</td>
        <td class="text-xs-center">{{ props.item.dni }}</td>
        <td class="text-xs-center">{{ props.item.nombres }}</td>
        <td class="text-xs-center">{{ props.item.unidad.nombre }}</td>

        <td class="justify-text text-xs-left">
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
  name: 'tripulacion-grid',
  props: {
    trabajadores: {
      type: Array
    },
    tripulacion: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Codigo', value: 'idTrabajador', align: 'center' },
        { text: 'DNI', value: 'dni', align: 'center' },
        { text: 'Empleado', value: 'nombres', align: 'center' },
        { text: 'Unidad', value: 'unidad', align: 'center' },
        { text: 'Mostrar', value: 'name', sortable: false }
      ],
      items: this.trabajadores,
      loading: false,
      search: '',
      // Para el dialog
      editItem: {},
      dialog: false,
      selectTripulante: { idTrabajador: '', nombres: '', unidad: '' }
    }
  },
  methods: {
    showNewItem (item) {
      this.dialog = true
    },
    cancel () {
      this.dialog = false
    },
    agregarTripulante () {
      this.tripulacion.push(this.selectTripulante)
      this.cancel()
    },
    deleteItem (item) {
      const index = this.tripulacion.indexOf(item)
      confirm('Estas seguro que deseas eliminar a este tripulante?') &&
        this.tripulacion.splice(index, 1)
    }
  }
}
</script>

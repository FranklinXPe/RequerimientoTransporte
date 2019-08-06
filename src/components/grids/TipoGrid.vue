<template>
  <div>
    <!-- Busqueda -->
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Tipos de Vehiculos Registrados</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-text-field
                  label="Código"
                  v-model="modelItem.idTipo"
                  disabled
                  v-show="modelItem.idTipo==''?false:true"
                ></v-text-field>
                <v-text-field label="Nombre" v-model="modelItem.nombre"></v-text-field>

                <v-btn @click="save" color="primary">Guardar</v-btn>
                <v-btn @click="close" flat color="red">Cancelar</v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>
        <!-- FIN: DialogForm para CRUD -->

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
        <v-btn color="primary" dark class="mb-2" @click="showNewItem()">
          <v-icon left small>add</v-icon>Nuevo
        </v-btn>
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="tipos"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.idTipo }}</td>
        <td class="text-xs-center">{{ props.item.nombre }}</td>

        <td class="justify-text">
          <v-icon @click="showItem(props.item)">edit</v-icon>
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
// import TasacionTerrenoDialogFormView from "@/components/tasaciones/TasacionTerrenoDialogFormView.vue";

export default {
  name: 'tipo-grid',
  // components: {
  //   TasacionTerrenoDialogFormView
  // },
  props: {
    tipos: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Código', value: 'codigo', align: 'center' },
        { text: 'Nombre', value: 'nombre', align: 'center' },
        { text: 'Editar', value: 'name', sortable: false }
      ],
      items: this.tipos,
      loading: false,
      search: '',
      // Para el dialog
      showItemIndex: -1,
      editItem: {},
      dialog: false
    }
  },
  methods: {
    showNewItem () {
      this.editItem = this.createFreshTipoObject()
      this.dialog = true
    },
    showItem (item) {
      this.showItemIndex = this.tipos.indexOf(item)
      this.editItem = Object.assign({}, item)
      this.dialog = true
    },
    fetchTipo (id) {
      this.item = this.$store.dispatch('getTipoById', this.id)
    },
    // BOTONES PARA EL DIALOG
    close () {
      this.dialog = !this.dialog
    },
    save () {
      if (this.modelItem.idTipo === 0) {
        // ES UN CREAR NUEVO USUARIO

        this.$store
          .dispatch('createTipo', this.modelItem)
          .then(() => {
            this.editItem = this.createFreshTipoObject()
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close()
          })
          .catch(error => {
            console.log(
              'Hubo un problema al momento de crear el Tipo',
              error.message
            )
          })
      } else {
        // ES UN MODIFICAR USUARIO
        this.$store
          .dispatch('updateTipo', this.modelItem)
          .then(() => {
            this.editItem = this.createFreshTipoObject()

            this.close()
          })
          .catch(() =>
            console.log(
              'Hubo un problema tratando de actualizar el Tipo de Vehiculo'
            )
          )
      }
    },
    createFreshTipoObject () {
      return {
        idTipo: 0,
        nombre: ''
      }
    }
  },
  computed: {
    modelItem: function () {
      return this.editItem
    }
  }
}
</script>

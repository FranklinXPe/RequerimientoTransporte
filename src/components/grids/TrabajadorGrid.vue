<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Trabajadores Registrados</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-text-field
                  label="Código"
                  v-model="this.editItem.idTrabajador"
                  disabled
                  v-show="this.editItem.idTrabajador==''?false:true"
                ></v-text-field>
                <v-text-field label="DNI" v-model="editItem.dni"></v-text-field>
                <v-text-field label="Nombres" v-model="editItem.nombres"></v-text-field>
                <v-select label="Sexo" :items="itemsSexo" v-model="editItem.sexo"></v-select>
                <v-text-field label="Direccion" v-model="editItem.direccion"></v-text-field>
                <v-text-field label="Teléfono" v-model="editItem.telefono"></v-text-field>
                <v-text-field label="Email" v-model="editItem.email"></v-text-field>
                <v-text-field label="Cargo" v-model="editItem.cargo"></v-text-field>

                <v-select
                  label="Unidad"
                  :items="this.unidadItem"
                  v-model="editItem.unidad.nombre"
                  data-vv-name="editItem.unidad.nombre"
                ></v-select>

                <v-btn @click="save" color="primary">Guardar</v-btn>
                <v-btn @click="cancel" flat color="red">Cancelar</v-btn>
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
      :items="trabajadores"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.idTrabajador }}</td>
        <td class="text-xs-left">{{ props.item.nombres }}</td>
        <td class="text-xs-left">{{ props.item.dni }}</td>
        <td class="text-xs-left">{{ props.item.sexo }}</td>
        <td class="text-xs-left">{{ props.item.direccion }}</td>
        <td class="text-xs-left">{{ props.item.telefono }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.cargo }}</td>

        <td class="text-xs-right">{{ props.item.unidad.nombre }}</td>

        <td class="justify-text text-xs-right">
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
export default {
  name: 'trabajador-grid',
  props: {
    trabajadores: {
      type: Array
    },
    unidades: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Código', value: 'idTrabajador', align: 'center' },
        { text: 'Nombres', value: 'nombres', align: 'center' },

        { text: 'DNI', value: 'dni', align: 'center' },
        { text: 'Sexo', value: 'sexo', align: 'center' },
        { text: 'Dirección', value: 'direccion', align: 'center' },
        { text: 'Teléfono', value: 'telefono', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Cargo', value: 'cargo', align: 'center' },
        { text: 'Unidad', value: 'unidad.nombre', align: 'center' },
        { text: 'Editar', value: 'name', sortable: false }
      ],

      loading: false,
      search: '',
      // Para el dialog
      showItemIndex: -1,
      editItem: {
        idTrabajador: 0,
        nombres: '',
        sexo: '',
        dni: '',
        direccion: '',
        telefono: '',
        email: '',
        cargo: '',
        unidad: {
          idUnidad: 0,
          nombre: ''
        }
      },
      dialog: false,
      itemsSexo: ['F', 'M']
    }
  },
  methods: {
    cancel () {
      this.$store.dispatch('fetchTrabajadores')
      this.close()
    },

    showNewItem () {
      this.editItem = this.createFreshTrabajadorObject()
      this.dialog = true
    },
    showItem (item) {
      this.showItemIndex = this.trabajadores.indexOf(item)
      this.editItem = Object.assign({}, item)
      this.dialog = true
    },

    // BOTONES PARA EL DIALOG
    close () {
      this.dialog = !this.dialog
    },
    save () {
      // Hacemos la conversion del valor seleccionado en el ComboBox Unidad. Necestiamos su ID.
      var idUnidad = this.unidades.find(
        item => item.nombre === this.editItem.unidad.nombre
      ).idUnidad
      this.editItem.unidad.idUnidad = idUnidad

      //Ahora verificamos si es un GUARDAR o un MODIFICAR
      if (this.editItem.idTrabajador === 0) {
        // ES UN CREAR NUEVO TRABAJADOR

        this.$store
          .dispatch('createTrabajador', this.editItem)
          .then(() => {
            this.editItem = this.createFreshTrabajadorObject()
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close()
          })
          .catch(error => {
            console.log(
              'Hubo un problema al momento de crear el Trabajador',
              error.message
            )
          })
      } else {
        // ES UN MODIFICAR TRABAJADOR
        this.$store
          .dispatch('updateTrabajador', this.editItem)
          .then(() => {
            this.editItem = this.createFreshTrabajadorObject()
            // this.$store.dispatch('fetchTrabajadores')
            this.close()
          })
          .catch(error =>
            console.log(
              'Hubo un problema tratando de actualizar la información del Trabajador',
              error.message
            )
          )
      }
    },
    createFreshTrabajadorObject () {
      return {
        idTrabajador: 0,
        nombres: '',
        sexo: '',
        dni: '',
        direccion: '',
        telefono: '',
        email: '',
        cargo: '',
        unidad: {
          idUnidad: 0,
          nombre: ''
        }
      }
    }
  },
  computed: {
    modelItem: function () {
      return this.editItem
    },
    unidadItem: function () {
      let unidadItem = []
      for (var i = 0; i < this.unidades.length; i++) {
        unidadItem.push(this.unidades[i].nombre)
      }

      return unidadItem
    }
  }
}
</script>

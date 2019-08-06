<template>
  <div>
    <!-- Busqueda -->
    <v-card>
      <v-card-title class="my-3">
        <span class="text-uppercase font-weight-bold subheading">Usuarios Registrados</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-text-field
                  label="Código"
                  v-model="modelItem.idUsuario"
                  disabled
                  v-show="modelItem.idUsuario==0?false:true"
                ></v-text-field>
                <v-text-field label="Email" v-model="modelItem.email" type="email"></v-text-field>
                <v-text-field label="Password" v-model="modelItem.password" type="password"></v-text-field>
                <v-select
                  label="Tipo"
                  :items="itemsTipo"
                  v-model="modelItem.tipo"
                  data-vv-name="modelItem.tipo"
                ></v-select>
                <v-checkbox label="Habilitado" v-model="modelItem.habilitado"></v-checkbox>

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
        <!-- <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="showNewItem()">
          <v-icon left small>add</v-icon>Nuevo
        </v-btn>-->
      </v-card-title>
    </v-card>

    <!-- Grid de datos -->
    <v-data-table
      :headers="headers"
      :items="usuarios"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.idUsuario }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.tipo }}</td>

        <!-- <td class="text-xs-center">{{ props.item.habilitado }}</td> -->
        <td class="text-xs-center">
          <v-chip :color="props.item.habilitado?'blue':'red'" dark>{{ props.item.habilitado }}</v-chip>
        </td>
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
export default {
  name: 'usuario-grid',

  props: {
    usuarios: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'Código', value: 'idUsuario', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Tipo', value: 'distrito', align: 'center' },
        { text: 'Estado', value: 'habilitado', align: 'center' },
        { text: 'Editar', value: 'name', sortable: false }
      ],
      items: this.usuarios,

      loading: false,
      search: '',
      // Para el dialog
      showItemIndex: -1,
      editItem: {
        idUsuario: 0,
        email: '',
        password: '',
        tipo: '',
        habilitado: false
      },
      dialog: false,
      itemsTipo: ['ADMINISTRADOR', 'OPERADOR', 'TRABAJADOR']
    }
  },
  methods: {
    showNewItem () {
      this.editItem = this.createFreshUsuarioObject()
      this.dialog = true
    },
    showItem (item) {
      this.showItemIndex = this.usuarios.indexOf(item)
      this.editItem = Object.assign({}, item)
      this.dialog = true
    },
    fetchUsuario (id) {
      this.item = this.$store.dispatch('getUsuarioById', this.id)
    },
    // BOTONES PARA EL DIALOG
    close () {
      this.dialog = !this.dialog
    },
    save () {
      if (this.modelItem.idUsuario === '') {
        // ES UN CREAR NUEVO USUARIO

        this.$store
          .dispatch('createUsuario', this.modelItem)
          .then(() => {
            this.editItem = this.createFreshUsuarioObject()
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close()
          })
          .catch(error => {
            console.log(
              'Hubo un problema al momento de crear el Usuario',
              error.message
            )
          })
      } else {
        // ES UN MODIFICAR USUARIO
        this.$store
          .dispatch('updateUsuario', this.modelItem)
          .then(() => {
            this.editItem = this.createFreshUsuarioObject()
            this.$store.dispatch('fetchUsuarios')
            this.close()
          })
          .catch(() =>
            console.log('Hubo un problema tratando de actualizar el usuario')
          )
      }
    },
    createFreshUsuarioObject () {
      return {
        idUsuario: 0,
        email: '',
        password: '',
        tipo: '',
        habilitado: false
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

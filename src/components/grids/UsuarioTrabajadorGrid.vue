<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-container>
            <template>
              <v-tabs v-model="model" color="primary" centered slider-color="yellow">
                <v-tab :href="`#tab-1`" class="white--text">Trabajador</v-tab>
                <v-tab :href="`#tab-2`" class="white--text">Usuario</v-tab>
              </v-tabs>
            </template>

            <!-- Inicio TabItem Trabajador-->
            <v-tabs-items v-model="model">
              <v-tab-item :value="`tab-1`">
                <v-card flat>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs3 sm3 md3>
                          <v-text-field
                            label="Código"
                            v-model="this.editItem.trabajador.idTrabajador"
                            disabled
                            v-show="this.editItem.trabajador.idTrabajador===0?false:true"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm4 md4>
                          <v-text-field label="DNI" v-model="editItem.trabajador.dni"></v-text-field>
                        </v-flex>
                        <v-text-field label="Nombres" v-model="editItem.trabajador.nombres"></v-text-field>
                        <v-select
                          label="Sexo"
                          :items="itemsSexo"
                          v-model="editItem.trabajador.sexo"
                        ></v-select>
                        <v-text-field label="Direccion" v-model="editItem.trabajador.direccion"></v-text-field>
                        <v-text-field label="Teléfono" v-model="editItem.trabajador.telefono"></v-text-field>

                        <v-text-field label="Cargo" v-model="editItem.trabajador.cargo"></v-text-field>

                        <v-select
                          label="Unidad"
                          :items="this.unidadItem"
                          v-model="editItem.trabajador.unidad.nombre"
                          data-vv-name="editItem.trabajador.unidad.nombre"
                        ></v-select>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <!-- fin de TabItem Trabajador -->
              <!-- Inicio de TabItem Usuario -->
              <v-tab-item :value="`tab-2`">
                <v-card flat>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs2 sm2 md2>
                          <v-text-field
                            label="Código"
                            v-model="editItem.idUsuario"
                            disabled
                            v-show="editItem.idUsuario==0?false:true"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs3 sm5 md5>
                          <v-text-field label="Email" v-model="editItem.email" type="email"></v-text-field>
                        </v-flex>
                        <v-flex xs3 sm5 md5>
                          <v-text-field
                            label="Password"
                            v-model="editItem.password"
                            type="password"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs3 sm6 md6>
                          <v-select
                            label="Tipo"
                            :items="itemsTipoUsuario"
                            v-model="editItem.tipo"
                            data-vv-name="editItem.tipo"
                          ></v-select>
                        </v-flex>
                        <v-flex xs3 sm6 md6>
                          <v-checkbox label="Habilitado" v-model="editItem.habilitado"></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="close">Cerrar</v-btn>
            <v-btn color="blue darken-1 white--text" depressed @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- FIN DEL DIALOG --->
    <v-card>
      <v-card-title class="my-3">
        <span class="text-uppercase font-weight-bold subheading">Usuarios Registrados</span>

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
        <td class="text-xs-left">{{ props.item.trabajador.idTrabajador }}</td>
        <td class="text-xs-left">{{ props.item.trabajador.nombres }}</td>
        <td class="text-xs-left">{{ props.item.trabajador.dni }}</td>

        <td class="text-xs-left">{{ props.item.trabajador.direccion }}</td>
        <td class="text-xs-left">{{ props.item.trabajador.telefono }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.tipo }}</td>
        <td class="text-xs-center">{{ props.item.trabajador.cargo }}</td>
        <td class="text-xs-center">
          <v-chip :color="props.item.habilitado?'blue':'red'" dark>{{ props.item.habilitado }}</v-chip>
        </td>

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
  props: {
    trabajadores: {
      type: Array
    },
    unidades: {
      type: Array
    }
  },
  data() {
    return {
      model: "tab-1",
      dialog: false,
      editItem: this.createFreshUsuarioTrabajadorObject(),
      // Propiedades que usan los formaularios
      itemsSexo: ["F", "M"],
      itemsTipoUsuario: ["ADMINISTRADOR", "OPERADOR", "TRABAJADOR"],
      headers: [
        { text: "Código", value: "idTrabajador", align: "center" },
        { text: "Nombres", value: "nombres", align: "center" },

        { text: "DNI", value: "dni", align: "center" },

        { text: "Dirección", value: "direccion", align: "center" },
        { text: "Teléfono", value: "telefono", align: "center" },
        { text: "Usuario", value: "email", align: "center" },
        { text: "Tipo Usuario", value: "tipo", align: "center" },
        { text: "Cargo", value: "cargo", align: "center" },
        { text: "Estado", value: "habilitado", align: "center" },
        { text: "Editar", value: "name", sortable: false }
      ],
      loading: false,
      search: ""
    };
  },
  methods: {
    createFreshUsuarioTrabajadorObject() {
      return {
        idUsuario: 0,
        email: "",
        password: "",
        tipo: "",
        habilitado: false,
        trabajador: {
          idTrabajador: 0,
          nombres: "",
          sexo: "",
          dni: "",
          direccion: "",
          telefono: "",
          email: "",
          cargo: "",
          unidad: {
            idUnidad: 0,
            nombre: ""
          }
        }
      };
    },
    // EVENTOS DE LOS FORMULARIOS
    showNewItem() {
      this.editItem = this.createFreshUsuarioTrabajadorObject();
      this.dialog = true;
    },
    showItem(item) {
      this.showItemIndex = this.trabajadores.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = !this.dialog;
    },
    save() {
      // Hacemos la conversion del valor seleccionado en el ComboBox Unidad. Necestiamos su ID.
      var idUnidad = this.unidades.find(
        item => item.nombre === this.editItem.trabajador.unidad.nombre
      ).idUnidad;
      this.editItem.trabajador.unidad.idUnidad = idUnidad;

      // Asignamos el mismo email de la tabla Trabjador  al username de la tabla Usuario
      this.editItem.trabajador.email = this.editItem.email;

      // Ahora verificamos si es un GUARDAR o un MODIFICAR
      if (this.editItem.idUsuario === 0) {
        // ES UN CREAR NUEVO TRABAJADOR

        this.$store
          .dispatch("createUsuarioTrabajador", this.editItem)
          .then(() => {
            this.editItem = this.createFreshUsuarioTrabajadorObject();
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close();
          })
          .catch(error => {
            console.log(
              "Hubo un problema al momento de crear el Usuario-Trabajador",
              error.message
            );
          });
      } else {
        // ES UN MODIFICAR TRABAJADOR
        this.$store
          .dispatch("updateUsuarioTrabajador", this.editItem)
          .then(() => {
            this.editItem = this.createFreshUsuarioTrabajadorObject();
            // this.$store.dispatch('fetchTrabajadores')
            this.close();
          })
          .catch(error =>
            console.log(
              "Hubo un problema tratando de actualizar la información del Usuario-Trabajador",
              error.message
            )
          );
      }
    }
  },
  computed: {
    unidadItem: function() {
      let unidadItem = [];
      for (var i = 0; i < this.unidades.length; i++) {
        unidadItem.push(this.unidades[i].nombre);
      }

      return unidadItem;
    }
  }
};
</script>

<template>
  <div>
    <!-- <TasacionTerrenoDialogFormView
      :item="editItem"
      :dialog="dialog"
    ></TasacionTerrenoDialogFormView>-->
    <!-- Busqueda -->
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Vehiculos Registrados</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-text-field
                  label="Código"
                  v-model="this.editItem.idVehiculo"
                  disabled
                  v-show="this.editItem.idVehiculo==0 ?false:true"
                ></v-text-field>
                <v-text-field label="Clase" v-model="editItem.clase"></v-text-field>
                <v-text-field label="Placa" v-model="editItem.placa"></v-text-field>
                <v-text-field label="Nro. Asientos" v-model="editItem.nroAsientos"></v-text-field>
                <v-text-field label="Capacidad Carga" v-model="editItem.capacidadCarga"></v-text-field>
                <v-select
                  label="Nombre"
                  :items="this.tipoItem"
                  v-model="editItem.tipo.nombre"
                  data-vv-name="editItem.tipo.nombre"
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
      :items="vehiculos"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.idVehiculo }}</td>
        <td class="text-xs-left">{{ props.item.clase }}</td>
        <td class="text-xs-center">{{ props.item.placa }}</td>
        <td class="text-xs-center">{{ props.item.nroAsientos }}</td>
        <td class="text-xs-center">{{ props.item.capacidadCarga }}</td>
        <td class="text-xs-center">{{ props.item.tipo.nombre }}</td>

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
  name: "vehiculo-grid",
  props: {
    vehiculos: {
      type: Array
    },
    tipos: {
      type: Array
    }
  },
  data() {
    return {
      headers: [
        { text: "Código", value: "idVehiculo", align: "center" },
        { text: "Clase", value: "clase", align: "center" },
        { text: "Placa", value: "placa", align: "center" },
        { text: "Nº Asientos", value: "nroAsientos", align: "center" },
        { text: "Capac. Carga", value: "capacidadCarga", align: "center" },
        { text: "Tipo", value: "tipo.nombre", align: "center" },

        { text: "Editar", value: "name", sortable: false }
      ],

      loading: false,
      search: "",
      // Para el dialog
      showItemIndex: -1,
      editItem: this.createFreshVehiculoObject(),
      dialog: false
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch("fetchVehiculos");
      this.close();
    },
    showNewItem() {
      this.editItem = this.createFreshVehiculoObject();
      this.dialog = true;
    },
    showItem(item) {
      this.showItemIndex = this.vehiculos.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
    },

    // BOTONES PARA EL DIALOG
    close() {
      this.dialog = !this.dialog;
    },

    save() {
      // Hacemos la conversion del valor seleccionado en el ComboBox Tipo. Necestiamos su ID.
      var idTipo = this.tipos.find(
        item => item.nombre === this.editItem.tipo.nombre
      ).idTipo;
      this.editItem.tipo.idTipo = idTipo;

      if (this.editItem.idVehiculo === 0) {
        // ES UN CREAR NUEVO VEHICULO

        this.$store
          .dispatch("createVehiculo", this.editItem)
          .then(() => {
            this.editItem = this.createFreshVehiculoObject();
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close();
          })
          .catch(error => {
            console.log(
              "Hubo un problema al momento de crear el Vehiculo",
              error.message
            );
          });
      } else {
        // ES UN MODIFICAR VEHICULO
        this.$store
          .dispatch("updateVehiculo", this.editItem)
          .then(() => {
            this.editItem = this.createFreshVehiculoObject();
            // this.$store.dispatch('fetchTrabajadores')
            this.close();
          })
          .catch(error =>
            console.log(
              "Hubo un problema tratando de actualizar la información del Vehiculo",
              error.message
            )
          );
      }
    },
    createFreshVehiculoObject() {
      return {
        idVehiculo: 0,
        clase: "",
        placa: "",
        nroAsientos: "",
        capacidadCarga: "",
        tipo: {
          idTipo: 0,
          nombre: ""
        }
      };
    }
  },
  computed: {
    modelItem: function() {
      return this.editItem;
    },
    tipoItem: function() {
      let tipoItem = [];
      for (var i = 0; i < this.tipos.length; i++) {
        tipoItem.push(this.tipos[i].nombre);
      }

      return tipoItem;
    }
  }
};
</script>

<template>
  <div>
    <!-- <TasacionTerrenoDialogFormView
      :item="editItem"
      :dialog="dialog"
    ></TasacionTerrenoDialogFormView>-->
    <!-- Busqueda -->
    <v-card>
      <v-card-title>
        <span class="text-uppercase font-weight-bold subheading">Destinos Registrados</span>

        <!-- DialogForm para CRUD -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-form color="white" ref="form">
                <v-text-field
                  label="Código"
                  v-model="modelItem.idDestino"
                  disabled
                  v-show="modelItem.idDestino==''?false:true"
                ></v-text-field>
                <v-text-field label="Provincia" v-model="modelItem.provincia"></v-text-field>
                <v-text-field label="Distrito" v-model="modelItem.distrito"></v-text-field>

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
      :items="destinos"
      :loading="loading"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.provincia }}</td>
        <td class="text-xs-left">{{ props.item.distrito }}</td>

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
  name: "destino-grid",
  // components: {
  //   TasacionTerrenoDialogFormView
  // },
  props: {
    destinos: {
      type: Array
    }
  },
  data() {
    return {
      headers: [
        { text: "Provincia", value: "provincia", align: "center" },
        { text: "Distrito", value: "distrito", align: "center" },
        { text: "Mostrar", value: "name", sortable: false }
      ],
      items: this.destinos,
      loading: false,
      search: "",
      // Para el dialog
      showItemIndex: -1,
      editItem: {},
      dialog: false
    };
  },
  methods: {
    showNewItem() {
      this.editItem = this.createFreshDestinoObject();
      this.dialog = true;
    },
    showItem(item) {
      this.showItemIndex = this.destinos.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
    },
    fetchDestino(id) {
      this.item = this.$store.dispatch("getDestinoById", this.id);
    },
    // BOTONES PARA EL DIALOG
    close() {
      this.dialog = !this.dialog;
    },
    save() {
      if (this.modelItem.idDestino === 0) {
        // ES UN CREAR NUEVO DESTINO

        this.$store
          .dispatch("createDestino", this.modelItem)
          .then(() => {
            this.editItem = this.createFreshDestinoObject();
            // Actualizamos la lista de Usuarios en el grid
            // this.$store.dispatch('fetchUsuarios')
            this.close();
          })
          .catch(error => {
            console.log(
              "Hubo un problema al momento de crear el Destino",
              error.message
            );
          });
      } else {
        // ES UN MODIFICAR USUARIO
        this.$store
          .dispatch("updateDestino", this.modelItem)
          .then(() => {
            this.editItem = this.createFreshDestinoObject();

            this.close();
          })
          .catch(() =>
            console.log("Hubo un problema tratando de actualizar la Unidad")
          );
      }
    },
    createFreshDestinoObject() {
      return {
        idDestino: 0,
        provincia: "",
        distrito: ""
      };
    }
  },
  computed: {
    modelItem: function() {
      return this.editItem;
    }
  }
};
</script>

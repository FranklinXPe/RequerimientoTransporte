<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div class="text-uppercase font-weight-bold subheading">Filtro de Busqueda</div>
        </template>
        <v-card>
          <v-card-text>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <!-- Filtro Zonificacion-->
                <v-flex xs6 md4>
                  <v-menu>
                    <v-text-field
                      :value="formattedDateFechaInicio"
                      slot="activator"
                      label="Fecha Inicio"
                      prepend-icon="date_range"
                    ></v-text-field>
                    <v-date-picker v-model="selectFechaInicio"></v-date-picker>
                  </v-menu>
                </v-flex>

                <!-- Filtro Zonificacion-->
                <v-flex xs6 md4>
                  <v-menu>
                    <v-text-field
                      :value="formattedDateFechaFin"
                      slot="activator"
                      label="Fecha Fin"
                      prepend-icon="date_range"
                    ></v-text-field>
                    <v-date-picker v-model="selectFechaFin"></v-date-picker>
                  </v-menu>
                </v-flex>
                <!-- Filtro Precio por m2-->

                <v-flex xs12 md4>
                  <v-btn large color="cyan" class="white--text" @click="submit()">
                    <v-icon>filter_list</v-icon>Filtrar
                  </v-btn>
                  <v-btn large color="yellow" dark class="black--text" @click="todos()">Todos</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import format from "date-fns/format";
export default {
  data() {
    return {
      selectFechaInicio: "",
      selectFechaFin: ""
    };
  },
  methods: {
    submit() {
      this.$emit("process", {
        fechaInicio: format(this.selectFechaInicio, "DD-MM-YYYY"),
        fechaFin: format(this.selectFechaFin, "DD-MM-YYYY")
      });
    },
    todos() {
      this.selectFechaInicio = "";
      this.selectFechaFin = "";
      this.$emit("process", {
        evento: "todos"
      });
    }
  },
  computed: {
    formattedDateFechaInicio() {
      return this.selectFechaInicio
        ? format(this.selectFechaInicio, "DD-MM-YYYY")
        : "";
    },
    formattedDateFechaFin() {
      return this.selectFechaFin
        ? format(this.selectFechaFin, "DD-MM-YYYY")
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <!-- DialogForm para DESTINO -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-container>
          <v-form color="white" ref="form">
            <v-select v-model="selectDestino" :items="formatItemDestinos" label="Destino"></v-select>
            <v-btn color="primary" @click="asignarDestino">Elegir</v-btn>
            <v-btn @click="cancelar" flat color="red">Cancelar</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN: DialogForm para DESTINO -->

    <form>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs2 sm1>
            <v-text-field v-model="this.editItem.idRequerimiento" label="Código" readonly></v-text-field>
          </v-flex>
          <!--INICIO: FECHA REQUERIMIENTO -->
          <v-flex xs3 sm3>
            <v-menu>
              <v-text-field
                :value="formattedDateRequerimiento"
                slot="activator"
                label="Requerimiento"
                prepend-icon="date_range"
              ></v-text-field>
              <v-date-picker v-model="editItem.fechaRequerimiento"></v-date-picker>
            </v-menu>
          </v-flex>
          <!--FIN : FECHA REQUERIMIENTO -->

          <!--INICIO: FECHA IDA -->
          <v-flex xs3 sm3>
            <v-menu>
              <v-text-field
                :value="formattedDateIda"
                slot="activator"
                label="Partida"
                prepend-icon="date_range"
              ></v-text-field>
              <v-date-picker v-model="editItem.fechaIda"></v-date-picker>
            </v-menu>
          </v-flex>
          <!--FIN : FECHA IDA -->

          <!--INICIO: FECHA RETORNO -->
          <v-flex xs3 sm3>
            <v-menu>
              <v-text-field
                :value="formattedDateRetorno"
                slot="activator"
                label="Retorno"
                prepend-icon="date_range"
              ></v-text-field>
              <v-date-picker v-model="editItem.fechaRetorno"></v-date-picker>
            </v-menu>
          </v-flex>
          <!--FIN : FECHA RETORNO -->

          <!-- INICIO: DESCRIPCION -->
          <v-flex xs12 sm6>
            <v-textarea
              v-model="editItem.descripcion"
              auto-grow
              box
              color="deep-purple"
              label="Descripción"
              rows="1"
              :readonly="getUsuario.tipo==='ADMINISTRADOR'"
            ></v-textarea>
          </v-flex>
          <!-- FIN: DESCRIPCION-->
          <!-- INICIO: OBSERVACIONES -->
          <v-flex xs12 sm6>
            <v-textarea
              v-if="getUsuario.tipo==='TRABAJADOR'"
              v-model="editItem.observaciones"
              auto-grow
              box
              color="deep-purple"
              label="Observaciones"
              rows="1"
              readonly
            ></v-textarea>
            <v-textarea
              v-else
              v-model="editItem.observaciones"
              auto-grow
              box
              color="deep-purple"
              label="Observaciones"
              rows="1"
            ></v-textarea>
          </v-flex>
          <!-- FIN: OBSERVACIONES-->

          <!-- INICIO: OBSERVACIONES -->
          <v-flex xs3 sm3>
            <v-text-field
              v-if="getUsuario.tipo!=='ADMINISTRADOR'"
              v-model="editItem.aprobado"
              label="Estado"
              readonly
            ></v-text-field>
            <v-select
              v-else
              label="Estado"
              :items="itemsEstado"
              v-model="editItem.aprobado"
              data-vv-name="editItem.aprobado"
            ></v-select>
          </v-flex>

          <!-- FIN: OBSERVACIONES-->

          <!-- INICIO: ORDEN SE SERVICIO -->
          <v-flex xs3 sm3>
            <v-text-field v-model="editItem.ordenServicio" label="O. S."></v-text-field>
          </v-flex>
          <!-- FIN: ORDEN DE SERVICIO-->

          <!-- INICIO: DESTINO -->

          <v-text-field
            v-model="this.selectDestino"
            append-icon="place"
            label="Destino"
            @click:append="dialog=!dialog"
            readonly
          ></v-text-field>
          <!-- FIN: DESTINO -->
          <!-- INICIO: VEHICULO -->
          <v-flex xs12 sm6>
            <v-select
              v-model="editItem.vehiculo"
              :items="formattedItemVehiculos"
              item-text="descripcion"
              item-value="idVehiculo"
              label="Vehículo"
              return-object
              single-line
            ></v-select>
          </v-flex>
          <!-- FIN: VEHICULO -->

          <!-- INICIO: GRID DE TRIPULACION -->
          <v-flex xs12 sm12>
            <TripulacionGrid
              :trabajadores="getTrabajadores"
              :tripulacion="this.editItemRequerimiento.tripulacion"
            ></TripulacionGrid>
          </v-flex>
          <!-- FIN: GRID DE TRIPULACION -->

          <v-flex xs12 sm>
            <v-spacer></v-spacer>
            <v-btn @click="save" color="primary" v-if="puedeEditarse">Guardar</v-btn>
            <v-btn @click="cancelar">Cancelar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { mapGetters } from 'vuex';
import TripulacionGrid from '@/components/grids/TripulacionGrid.vue';

export default {
  name: 'app-edit-requerimiento-form',
  components: { TripulacionGrid },
  props: ['idRequerimiento'],

  data () {
    return {
      editItem: this.createFreshRequerimientoObject(),
      dialog: false,
      selectDestino: '',
      itemsEstado: ['PENDIENTE', 'APROBADO', 'ANULADO']
    }
  },
  methods: {
    createFreshRequerimientoObject () {
      return {
        idRequerimiento: 0,
        fechaRequerimiento: null,
        fechaIda: null,
        fechaRetorno: null,
        descripcion: '',
        observaciones: '',
        aprobado: 'PENDIENTE',
        ordenServicio: '',
        destino: {
          idDestino: 0,
          provincia: '',
          distrito: ''
        },

        vehiculo: {
          idVehiculo: 0,
          clase: '',
          placa: '',
          nroAsientos: 0
        },
        usuario: {
          idUsuario: 0,
          email: ''
        },
        tripulacion: []
      }
    },

    asignarDestino () {
      // Primero detectamos el idDestino
      var idDestino = this.getDestinos.find(
        item => item.provincia + ' - ' + item.distrito === this.selectDestino
      ).idDestino
      this.editItem.destino.idDestino = idDestino

      this.dialog = !this.dialog
    },
    cancelar () {
      this.selectDestino =
        this.editItem.destino.provincia +
        ' - ' +
        this.editItem.destino.distrito
      this.dialog = !this.dialog
      // REdireccionamos el requerimiento a la tabla Solicitudes
      if (this.getUsuario.tipo !== 'ADMINISTRADOR') {
        this.$router.push({
          name: 'solicitar-vehiculo'
        })
      } else {
        this.$router.push({
          name: 'solicitar-vehiculo-todos'
        })
      }
    },
    save () {
      if (
        this.editItem.aprobado === 'PENDIENTE' ||
        this.getUsuario.tipo === 'ADMINISTRADOR'
      ) {
        // Asignamos el texto del Destino por si modifico

        this.editItem.destino.provincia = this.selectDestino.split(' - ')[0]
        this.editItem.destino.distrito = this.selectDestino.split(' - ')[1]
        // Asignamos los valores de placa y clase vehiculo
        this.editItem.vehiculo.clase = this.editItem.vehiculo.descripcion.split(
          ' | '
        )[1]
        this.editItem.vehiculo.placa = this.editItem.vehiculo.descripcion.split(
          ' | '
        )[0]

        // ES UN MODIFICAR REQUERIMIENTO
        this.$store
          .dispatch('updateRequerimiento', this.editItem)
          .then(() => {
            this.editItem = this.createFreshRequerimientoObject()
            // REdireccionamos el requerimiento a la tabla Solicitudes
            if (this.getUsuario.tipo !== 'ADMINISTRADOR') {
              this.$router.push({
                name: 'solicitar-vehiculo'
              })
            } else {
              this.$router.push({
                name: 'solicitar-vehiculo-todos'
              })
            }
          })
          .catch(error =>
            console.log(
              'Hubo un problema tratando de actualizar la información del Requerimiento',
              error.message
            )
          )
      } else {
        alert(
          'No puede modificar este Requerimiento debido a que ya fue aprobado'
        )
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchVehiculos')
    this.$store.dispatch('fetchTrabajadores')

    this.$store.dispatch('fetchRequerimiento', this.idRequerimiento)
    this.$store.dispatch('fetchDestinos')
  },
  computed: {
    formattedDateRequerimiento () {
      return this.editItem.fechaRequerimiento
        ? format(this.editItem.fechaRequerimiento, 'DD-MM-YYYY')
        : '';
    },
    formattedDateIda () {
      return this.editItem.fechaIda
        ? format(this.editItem.fechaIda, 'DD-MM-YYYY')
        : '';
    },
    formattedDateRetorno () {
      return this.editItem.fechaRetorno
        ? format(this.editItem.fechaRetorno, 'DD-MM-YYYY')
        : '';
    },

    formattedItemVehiculos () {
      this.editItem.vehiculo.descripcion =
        this.getRequerimiento.vehiculo.placa +
        ' | ' +
        this.getRequerimiento.vehiculo.clase +
        ' | ' +
        this.getRequerimiento.vehiculo.tipo.nombre +
        ' | ' +
        this.getRequerimiento.vehiculo.nroAsientos

      var vehiculos = []
      for (var i = 0; i < this.getVehiculos.length; i++) {
        vehiculos.push({
          idVehiculo: this.getVehiculos[i].idVehiculo,
          descripcion:
            this.getVehiculos[i].placa +
            ' | ' +
            this.getVehiculos[i].clase +
            ' | ' +
            this.getVehiculos[i].tipo.nombre +
            ' | ' +
            this.getVehiculos[i].nroAsientos +
            ' asiento(s)'
        })
      }
      return vehiculos
    },
    editItemRequerimiento () {
      this.editItem = this.getRequerimiento
      // Destinos
      //this.selectDestino.idDestino = this.getRequerimiento.destino.idDestino
      this.selectDestino =
        this.getRequerimiento.destino.provincia +
        ' - ' +
        this.getRequerimiento.destino.distrito
      return this.editItem
    },
    formatItemDestinos () {
      var destinos = []
      for (var i = 0; i < this.getDestinos.length; i++) {
        destinos.push(
          this.getDestinos[i].provincia + ' - ' + this.getDestinos[i].distrito
        )
      }
      return destinos
    },
    puedeEditarse () {
      return (
        this.editItem.aprobado === 'PENDIENTE' ||
        this.getUsuario.tipo === 'ADMINISTRADOR'
      )
    },
    ...mapGetters([
      'getVehiculos',
      'getTrabajadores',
      'getUsuario',
      'getRequerimiento',
      'getDestinos'
    ])
  }
}
</script>

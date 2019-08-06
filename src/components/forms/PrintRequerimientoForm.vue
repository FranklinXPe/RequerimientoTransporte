<template>
  <div>
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
                readonly
              ></v-text-field>
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
                readonly
              ></v-text-field>
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
                readonly
              ></v-text-field>
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
              readonly
            ></v-textarea>
          </v-flex>
          <!-- FIN: DESCRIPCION-->
          <!-- INICIO: OBSERVACIONES -->
          <v-flex xs12 sm6>
            <v-textarea
              v-model="editItem.observaciones"
              auto-grow
              box
              color="deep-purple"
              label="Observaciones"
              rows="1"
              readonly
            ></v-textarea>
          </v-flex>
          <!-- FIN: OBSERVACIONES-->

          <!-- INICIO: ESTADO -->
          <v-flex xs3 sm3>
            <v-text-field :value="editItem.aprobado" label="Estado" readonly></v-text-field>
          </v-flex>

          <!-- FIN: ESTADO-->

          <!-- INICIO: ORDEN SE SERVICIO -->
          <v-flex xs3 sm3>
            <v-text-field v-model="editItem.ordenServicio" label="O. S." readonly></v-text-field>
          </v-flex>
          <!-- FIN: ORDEN DE SERVICIO-->

          <!-- INICIO: DESTINO -->
          <v-flex xs5 sm6>
            <v-text-field v-model="this.selectDestino" label="Destino" readonly></v-text-field>
          </v-flex>
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
              readonly
            ></v-select>
          </v-flex>
          <!-- FIN: VEHICULO -->

          <!-- INICIO: RESPONSABLE -->
          <v-flex xs12 sm6>
            <v-text-field
              v-model="this.editItem.usuario.trabajador.nombres"
              label="Responsable"
              readonly
            ></v-text-field>
          </v-flex>
          <!-- FIN: RESPONSABLE -->

          <!-- INICIO: GRID DE TRIPULACION -->
          <v-flex xs12 sm12>
            <ImprimirTripulacionGrid :tripulacion="this.editItemRequerimiento.tripulacion"></ImprimirTripulacionGrid>
          </v-flex>
          <!-- FIN: GRID DE TRIPULACION -->

          <v-flex xs12 sm>
            <v-spacer></v-spacer>
            <v-btn @click="print" color="primary" v-show="this.visibility">Imprimir</v-btn>
            <v-spacer></v-spacer>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { mapGetters } from 'vuex';
import ImprimirTripulacionGrid from '@/components/grids/ImprimirTripulacionGrid.vue';

export default {
  name: 'app-print-requerimiento-form',

  components: { ImprimirTripulacionGrid },
  props: ['idRequerimiento'],
  data () {
    return {
      editItem: this.createFreshRequerimientoObject(),
      dialog: false,
      selectDestino: '',
      itemsEstado: ['PENDIENTE', 'APROBADO', 'ANULADO'],
      visibility: true
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
          email: '',
          trabajador: {
            nombres: ''
          }
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
    print () {
      this.visibility = false
      window.print()
    }
  },
  created () {
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
      // this.selectDestino.idDestino = this.getRequerimiento.destino.idDestino
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

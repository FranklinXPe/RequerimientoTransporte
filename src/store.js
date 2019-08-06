import Vue from 'vue'
import Vuex from 'vuex'

// Importamos los demas modulos
import usuarioModule from '@/modules/usuarios.js'
import destinoModule from '@/modules/destino.js'
import tipoModule from '@/modules/tipo.js'
import unidadModule from '@/modules/unidad.js'
import trabajadorModule from '@/modules/trabajador.js'
import usuariosTrabajador from '@/modules/usuariosTrabajador.js'
import vehiculoModule from '@/modules/vehiculo.js'
import requerimientoModule from '@/modules/requerimiento.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Para saber si se esta procesando nuestra transaccion y mostrar un loader
    processing: false,
    loaded: false,
    // Mostrar mensajes en la App deacuerdo a las acciones que se vayan realizando
    alerta: {
      type: 'success',
      show: false,
      message: ''
    }

  },
  mutations: {
    SET_LOADED: (state, loaded) => {
      state.loaded = loaded
    },
    SET_MENSAJE_ALERTA: (state, data) => {
      state.alerta.type = data.type
      state.alerta.show = data.show
      state.alerta.message = data.mesage

      // Hacemos que la alerta figure un tiempo determinado
      setTimeout(() => {
        // Cuando pasen X segundos se resetea los valores por defecto
        state.alerta.type = 'success'
        state.alerta.show = false
        state.alerta.message = ''
      }, data.timeout)
    }

  },
  actions: {

  },
  // LOS GETTERS DE ESTAN EL LOS RESPECTIVOS ARCHIVOS INDIVIDULAES
  modules: {
    usuarioModule,
    destinoModule,
    tipoModule,
    unidadModule,
    trabajadorModule,
    vehiculoModule,
    requerimientoModule,
    usuariosTrabajador
  }
})

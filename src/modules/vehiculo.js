import ApiService from '../services/ApiService'

export default {
  state: {
    vehiculos: [],
    vehiculo: {}
  },
  mutations: {
    ADD_VEHICULO (state, vehiculo) {
      state.vehiculos.push(vehiculo)
    },
    SET_VEHICULOS (state, vehiculos) {
      state.vehiculos = vehiculos
    },
    SET_VEHICULO (state, vehiculo) {
      state.vehiculo = vehiculo
    },
    // LA PRECONDICION ES QUE EL parametro 'vehiculo' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_VEHICULOS (state, vehiculo) {
      // Actualiza la data del array 'Trabajadores' en base al vehiculo
      for (var i = 0; i < state.vehiculos.length; i++) {
        //  console.log('Contador:' + i)
        if (state.vehiculos[i].idVehiculo === vehiculo.idVehiculo) {
          state.vehiculos.splice(i, 1, vehiculo)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los vehiculos
    fetchVehiculos ({
      commit
    }) {
      ApiService.getVehiculos()
        .then(response => {
          // console.log(response.data)
          commit('SET_VEHICULOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un vehiculo dependiendo del Id
    fetchVehiculo ({
      commit,
      getters
    }, id) {
      var vehiculo = ApiService.getVehiculo(id)
      if (vehiculo) {
        commit('SET_VEHICULO', vehiculo)
      } else {
        ApiService.getVehiculo(id).then(response => {
          commit('SET_VEHICULO', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },
    // Crear un nuevo Vehiculo
    createVehiculo ({
      commit
    }, vehiculo) {
      ApiService.postVehiculo(vehiculo).then((response) => {
        vehiculo.idVehiculo = response.data.idVehiculo // retorna el nuevo identificador creado por el servidor

        commit('ADD_VEHICULO', vehiculo)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un Vehiculo
    updateVehiculo ({
      commit
    }, vehiculo) {
      ApiService.putVehiculo(vehiculo).then(() => {
        commit('SET_VEHICULO', vehiculo)
        commit('UPDATE_VEHICULOS', vehiculo)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar este Vehiculo.', error.message)
      })
    }
  },
  getters: {
    getVehiculoById: state => id => {
      return state.events.find(event => event.id === id)
    },
    getVehiculos: state => {
      return state.vehiculos
    },
    getVehiculo: state => {
      return state.vehiculo
    }
  }
}

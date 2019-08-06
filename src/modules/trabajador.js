import ApiService from '../services/ApiService'

export default {
  state: {
    trabajadores: [],
    trabajador: {}
  },
  mutations: {
    ADD_TRABAJADOR (state, trabajador) {
      state.trabajadores.push(trabajador)
    },
    SET_TRABAJADORES (state, trabajadores) {
      state.trabajadores = trabajadores
    },
    SET_TRABAJADOR (state, trabajador) {
      state.trabajador = trabajador
    },
    // LA PRECONDICION ES QUE EL parametro 'trabajador' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_TRABAJADORES (state, trabajador) {
      // Actualiza la data del array 'Trabajadores' en base al trabajador
      for (var i = 0; i < state.trabajadores.length; i++) {
        //  console.log('Contador:' + i)
        if (state.trabajadores[i].idTrabajador === trabajador.idTrabajador) {
          state.trabajadores.splice(i, 1, trabajador)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los trabajadores
    fetchTrabajadores ({
      commit
    }) {
      ApiService.getTrabajadores()
        .then(response => {
          //  console.log(response.data)
          commit('SET_TRABAJADORES', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un trabajador dependiendo del Id
    fetchTrabajador ({
      commit,
      getters
    }, id) {
      var trabajador = getters.getTrabajador(id)
      if (trabajador) {
        commit('SET_TRABAJADOR', trabajador)
      } else {
        ApiService.getTrabajador(id).then(response => {
          commit('SET_TRABAJADOR', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },
    // Crear un nuevo Trabajador
    createTrabajador ({
      commit
    }, trabajador) {
      ApiService.postTrabajador(trabajador).then((response) => {
        trabajador.idTrabajador = response.data.idTrabajador // retorna el nuevo identificador creado por el servidor

        commit('ADD_TRABAJADOR', trabajador)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un Trabajador
    updateTrabajador ({
      commit
    }, trabajador) {
      ApiService.putTrabajador(trabajador).then(() => {
        commit('SET_TRABAJADOR', trabajador)
        commit('UPDATE_TRABAJADORES', trabajador)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar este Trabajador.', error.message)
      })
    }
  },
  getters: {
    getTrabajadorById: state => id => {
      return state.trabajadores.find(trabajador => trabajador.id === id)
    },
    getTrabajadores: state => {
      return state.trabajadores
    },
    getTrabajador: state => {
      return state.trabajador
    }
  }
}

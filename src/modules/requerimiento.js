import ApiService from '../services/ApiService'

export default {
  state: {
    requerimientos: [],
    requerimiento: {}
  },
  mutations: {
    ADD_REQUERIMIENTO (state, requerimiento) {
      state.requerimientos.push(requerimiento)
    },
    SET_REQUERIMIENTOS (state, requerimientos) {
      state.requerimientos = requerimientos
    },
    SET_REQUERIMIENTO (state, requerimiento) {
      state.requerimiento = requerimiento
    },
    // LA PRECONDICION ES QUE EL parametro 'requerimiento' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_REQUERIMIENTOS (state, requerimiento) {
      // Actualiza la data del array 'Trabajadores' en base al trabajador
      for (var i = 0; i < state.requerimientos.length; i++) {
        //  console.log('Contador:' + i)
        if (state.requerimientos[i].idRequerimiento === requerimiento.idRequerimiento) {
          state.requerimientos.splice(i, 1, requerimiento)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los requerimientos
    fetchRequerimientos ({
      commit
    }) {
      ApiService.getRequerimientosOrdenadoIdRequerimientoDescendente()
        .then(response => {
          // console.log(response.data)
          commit('SET_REQUERIMIENTOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    fetchRequerimientosEntreFechas ({
      commit
    }, data) {
      ApiService.getRequerimientosEntreFechas(data.fechaInicio, data.fechaFin)
        .then(response => {
          // console.log(response.data)
          commit('SET_REQUERIMIENTOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },
    // Para listar un requerimiento dependiendo del Id
    fetchRequerimiento ({
      commit,
      getters
    }, id) {
      var requerimiento = getters.getRequerimientoById(id)

      if (requerimiento) {
        commit('SET_REQUERIMIENTO', requerimiento)
      } else {
        ApiService.getRequerimiento(id).then(response => {
          commit('SET_REQUERIMIENTO', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },

    // Para listar todos los requerimientos por USUARIO
    fetchRequerimientosByUsuario ({
      commit
    }, idUsuario) {
      ApiService.getRequerimientosByUsuario(idUsuario)
        .then(response => {
          // console.log(response.data)
          commit('SET_REQUERIMIENTOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },
    // Para listar todos los requerimientos por USUARIO en un rango de fechas
    fetchRequerimientosByUsuarioEntreFechas ({
      commit

    }, eventoUsuarioFecha) {
      ApiService.getRequerimientosPorUsuarioEntreFechas(eventoUsuarioFecha.usuario, eventoUsuarioFecha.data.fechaInicio, eventoUsuarioFecha.data.fechaFin)
        .then(response => {
          // console.log(response.data)
          commit('SET_REQUERIMIENTOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },
    // Para listar todos los requerimientos por USUARIO
    fetchRequerimientosByAprobados ({
      commit,
      getters
    }) {
      ApiService.getRequerimientosByAprobados()
        .then(response => {
          // console.log(response.data)
          commit('SET_REQUERIMIENTOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Actualizar los datos de un Requerimiento
    updateRequerimiento ({
      commit
    }, requerimiento) {
      ApiService.putRequerimiento(requerimiento).then(() => {
        commit('SET_REQUERIMIENTO', requerimiento)
        commit('UPDATE_REQUERIMIENTOS', requerimiento)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar este requerimiento.', error.message)
      })
    },

    // Crear los datos de un Requerimiento
    createRequerimiento ({
      commit
    }, requerimiento) {
      ApiService.postRequerimiento(requerimiento).then((response) => {
        requerimiento.idRequerimiento = response.data.idRequerimiento // retorna el nuevo identificador creado por el servidor
        commit('SET_REQUERIMIENTO', requerimiento)
        commit('ADD_REQUERIMIENTO', requerimiento)
      }).catch(error => {
        console.log('Hubo un error al momento de crear este requerimiento.', error.message)
      })
    }

  },
  getters: {
    getRequerimientoById: state => id => {
      return state.requerimientos.find(requerimiento => requerimiento.idRequerimiento === id)
    },
    getRequerimientos: state => {
      return state.requerimientos
    },
    getRequerimiento: state => {
      return state.requerimiento
    }
  }
}

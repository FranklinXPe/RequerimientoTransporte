import ApiService from '../services/ApiService'

export default {
  state: {
    tipos: [],
    tipo: {}
  },
  mutations: {
    ADD_TIPO (state, tipo) {
      state.tipos.push(tipo)
    },
    SET_TIPOS (state, tipos) {
      state.tipos = tipos
    },
    SET_TIPO (state, tipo) {
      state.tipo = tipo
    },
    // LA PRECONDICION ES QUE EL parametro 'Tipo' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_TIPOS (state, tipo) {
      // Actualiza la data del array 'Unidades' en base al trabajador
      for (var i = 0; i < state.tipos.length; i++) {
        //  console.log('Contador:' + i)
        if (state.tipos[i].idTipo === tipo.idTipo) {
          state.tipos.splice(i, 1, tipo)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los tipos
    fetchTipos ({
      commit
    }) {
      ApiService.getTipos()
        .then(response => {
          console.log(response.data)
          commit('SET_TIPOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un tipo dependiendo del Id
    fetchTipo ({
      commit,
      getters
    }, id) {
      var tipo = ApiService.getTipo(id)
      if (tipo) {
        commit('SET_TIPO', tipo)
      } else {
        ApiService.gettipo(id).then(response => {
          commit('SET_TIPO', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },
    // Crear un nuevo Tipo
    createTipo ({
      commit
    }, tipo) {
      ApiService.postTipo(tipo).then((response) => {
        tipo.idTipo = response.data.idTipo // retorna el nuevo identificador creado por el servidor

        commit('ADD_TIPO', tipo)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un Tipo Vehiculo
    updateTipo ({
      commit
    }, tipo) {
      ApiService.putTipo(tipo).then(() => {
        commit('SET_TIPO', tipo)
        commit('UPDATE_TIPOS', tipo)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar este Tipo.', error.message)
      })
    }
  },
  getters: {
    getTipoById: state => id => {
      return state.events.find(event => event.id === id)
    },
    getTipos: state => {
      return state.tipos
    },
    getTipo: state => {
      return state.tipo
    }
  }
}

import ApiService from '../services/ApiService'

export default {
  state: {
    destinos: [],
    destino: {}
  },
  mutations: {
    ADD_DESTINO (state, destino) {
      state.destinos.push(destino)
    },
    SET_DESTINOS (state, destinos) {
      state.destinos = destinos
    },
    SET_DESTINO (state, destino) {
      state.destino = destino
    },
    // LA PRECONDICION ES QUE EL parametro 'Destinos' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_DESTINOS (state, destino) {
      // Actualiza la data del array 'Unidades' en base al trabajador
      for (var i = 0; i < state.destinos.length; i++) {
        //  console.log('Contador:' + i)
        if (state.destinos[i].idDestino === destino.idDestino) {
          state.destinos.splice(i, 1, destino)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los destinos
    fetchDestinos ({
      commit
    }) {
      ApiService.getDestinos()
        .then(response => {
          // console.log(response.data)
          commit('SET_DESTINOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un destino dependiendo del Id
    fetchDestino ({
      commit,
      getters
    }, id) {
      var destino = ApiService.getDestino(id)
      if (destino) {
        commit('SET_DESTINO', destino)
      } else {
        ApiService.getdestinoById(id).then(response => {
          commit('SET_DESTINO', response.data)
        }).catch(error => {
          console.log('Hubo un error al listar los destinos', error.response)
        })
      }
    },
    // Crear un nuevo Destino
    createDestino ({
      commit
    }, destino) {
      ApiService.postDestino(destino).then((response) => {
        destino.idDestino = response.data.idDestino // retorna el nuevo identificador creado por el servidor

        commit('ADD_DESTINO', destino)
      }).catch(error => {
        console.log('Hubo un error al crear el destino', error.message)
      })
    },

    // Actualizar los datos de un Destino
    updateDestino ({
      commit
    }, destino) {
      ApiService.putDestino(destino).then(() => {
        commit('SET_DESTINO', destino)
        commit('UPDATE_DESTINOS', destino)
      }).catch(error => {
        console.log('Hubo un error al actualizar el destino', error.response)
      })
    }

  },
  getters: {
    getDestinoById: state => id => {
      return state.events.find(event => event.id === id)
    },
    getDestinos: state => {
      return state.destinos
    },
    getDestino: state => {
      return state.destino
    }
  }
}

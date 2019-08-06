import ApiService from '../services/ApiService'

export default {
  state: {
    unidades: [],
    unidad: {}
  },
  mutations: {
    ADD_UNIDAD (state, unidad) {
      state.unidades.push(unidad)
    },
    SET_UNIDADES (state, unidades) {
      state.unidades = unidades
    },
    SET_UNIDAD (state, unidad) {
      state.unidad = unidad
    },
    // LA PRECONDICION ES QUE EL parametro 'Unidad' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_UNIDADES (state, unidad) {
      // Actualiza la data del array 'Unidades' en base al trabajador
      for (var i = 0; i < state.unidades.length; i++) {
        //  console.log('Contador:' + i)
        if (state.unidades[i].idUnidad === unidad.idUnidad) {
          state.unidades.splice(i, 1, unidad)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos las unidades
    fetchUnidades ({
      commit
    }) {
      ApiService.getUnidades()
        .then(response => {
          // console.log(response.data)
          commit('SET_UNIDADES', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar una unidad dependiendo del Id
    fetchUnidad ({
      commit,
      getters
    }, id) {
      var unidad = ApiService.getUnidad(id)
      if (unidad) {
        commit('SET_UNIDAD', unidad)
      } else {
        ApiService.getUnidad(id).then(response => {
          commit('SET_UNIDAD', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },
    // Crear un nuevo unidad
    createUnidad ({
      commit
    }, unidad) {
      ApiService.postUnidad(unidad).then((response) => {
        unidad.idUnidad = response.data.idUnidad // retorna el nuevo identificador creado por el servidor

        commit('ADD_UNIDAD', unidad)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un unidad
    updateUnidad ({
      commit
    }, unidad) {
      ApiService.putUnidad(unidad).then(() => {
        commit('SET_UNIDAD', unidad)
        commit('UPDATE_UNIDADES', unidad)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar esta Unidad.', error.message)
      })
    }
  },
  getters: {
    getUnidadById: state => id => {
      return state.unidades.find(unidad => unidad.idUnidad === id)
    },
    getUnidades: state => {
      return state.unidades
    },
    getUnidad: state => {
      return state.unidad
    }
  }
}

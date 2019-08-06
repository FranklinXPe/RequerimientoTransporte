import ApiService from '../services/ApiService'

export default {
  state: {
    usuarioTrabajadores: [],
    usuarioTrabajador: {}
  },
  mutations: {
    ADD_USUARIO_TRABAJADOR (state, usuarioTrabajador) {
      state.usuarioTrabajadores.push(usuarioTrabajador)
    },
    SET_USUARIOS_TRABAJADORES (state, usuariosTrabajadores) {
      state.usuarioTrabajadores = usuariosTrabajadores
    },
    SET_USUARIO_TRABAJADOR (state, usuarioTrabajador) {
      state.usuarioTrabajador = usuarioTrabajador
    },
    // LA PRECONDICION ES QUE EL parametro 'USUARIO' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_USUARIOS_TRABAJADORES (state, usuarioTrabajador) {
      // Actualiza la data del array 'Trabajadores' en base al trabajador
      for (var i = 0; i < state.usuarioTrabajadores.length; i++) {
        //  console.log('Contador:' + i)
        if (state.usuarioTrabajadores[i].idUsuario === usuarioTrabajador.idUsuario) {
          state.usuarioTrabajadores.splice(i, 1, usuarioTrabajador)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los usuarios-trabajadores
    fetchUsuariosTrabajadores ({
      commit
    }) {
      ApiService.getUsuariosTrabajadores()
        .then(response => {
          // console.log(response.data)
          commit('SET_USUARIOS_TRABAJADORES', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un usuario-trabajador dependiendo del Id
    fetchUsuarioTrabajador ({
      commit,
      getters
    }, id) {
      var usuarioTrabajador = ApiService.getUsuarioTrabajador(id)
      if (usuarioTrabajador) {
        commit('SET_USUARIO_TRABAJADOR', usuarioTrabajador)
      } else {
        ApiService.getUsuarioTrabajador(id).then(response => {
          commit('SET_USUARIO_TRABAJADOR', response.data)
        }).catch(error => {
          console.log('There was an error with this usuario-trabajador', error.response)
        })
      }
    },
    // Crear un nuevo usuario-trabajador
    createUsuarioTrabajador ({
      commit
    }, usuarioTrabajador) {
      ApiService.postUsuarioTrabajador(usuarioTrabajador).then((response) => {
        usuarioTrabajador.idUsuario = response.data.idUsuario // retorna el nuevo identificador creado por el servidor

        commit('ADD_USUARIO_TRABAJADOR', usuarioTrabajador)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un usuario-trabajador
    updateUsuarioTrabajador ({
      commit
    }, usuarioTrabajador) {
      ApiService.putUsuario(usuarioTrabajador).then(() => {
        commit('SET_USUARIO_TRABAJADOR', usuarioTrabajador)
        commit('UPDATE_USUARIOS_TRABAJADORES', usuarioTrabajador)
      }).catch(error => {
        console.log('Hubo un error al momento de actualizar este Usuario-Trabajador.', error.message)
      })
    }

  },
  getters: {
    getUsuarioTrabajadorById: state => id => {
      return state.usuarioTrabajadores.find(ut => ut.idUsuario === id)
    },
    getUsuariosTrabajadores: state => {
      return state.usuarioTrabajadores
    },
    getUsuarioTrabajador: state => {
      return state.usuarioTrabajador
    }
  }
}

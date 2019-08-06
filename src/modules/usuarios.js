import ApiService from '../services/ApiService'
// import {} from 'date-fns'

export default {
  state: {
    usuarios: [],
    usuario: {
      idUsuario: 0,
      user: '',
      tipo: 'TRABAJADOR',
      logged: false
    }
  },
  mutations: {
    ADD_USUARIO (state, usuario) {
      state.usuarios.push(usuario)
    },
    SET_USUARIOS (state, usuarios) {
      state.usuarios = usuarios
    },
    SET_USUARIO (state, usuario) { // Cuando logro loguearse el usuario
      state.usuario = usuario
      if (usuario.idUsuario !== 0) {
        state.usuario.logged = true
      } else {
        // state.usuario = null
        state.usuario.logged = false
      }
    },
    // LA PRECONDICION ES QUE EL parametro 'USUARIO' EXISTA EN EL ARRAY (solo se unsa en caso de Actualizar (PUT))
    UPDATE_USUARIOS (state, usuario) {
      // Actualiza la data del array 'Trabajadores' en base al trabajador
      for (var i = 0; i < state.usuarios.length; i++) {
        //  console.log('Contador:' + i)
        if (state.usuarios[i].idUsuario === usuario.idUsuario) {
          state.usuarios.splice(i, 1, usuario)
          break
        }
      }
    }
  },
  actions: {
    // Para listar todos los usuarios  x ya no se usa
    fetchUsuarios ({
      commit
    }) {
      ApiService.getUsuarios()
        .then(response => {
          // console.log(response.data)
          commit('SET_USUARIOS', response.data)
        })
        .catch(error => {
          console.log('There was an error', error.message)
        })
    },

    // Para listar un usuario dependiendo del Id  x ya no se usa
    fetchUsuario ({
      commit
    }, id) {
      var usuario = ApiService.getUsuario(id)
      if (usuario) {
        commit('SET_USUARIO', usuario)
      } else {
        ApiService.getUsuario(id).then(response => {
          commit('SET_USUARIO', response.data)
        }).catch(error => {
          console.log('There was an error with this event', error.response)
        })
      }
    },
    // Para autenticar a un usuario dependiendo del correo y password
    fetchAutenticarUsuario ({
      commit
    }, {
      mail,
      pass
    }) {
      return ApiService.getAutenticarUsuario(mail, pass)
    },
    // Para cerrar sesion
    fetchLogout: () => {

    },

    // Crear un nuevo usuario  x ya no se usa
    createUsuario ({
      commit
    }, usuario) {
      ApiService.postUsuario(usuario).then((response) => {
        usuario.idUsuario = response.data.idUsuario // retorna el nuevo identificador creado por el servidor

        commit('ADD_USUARIO', usuario)
      }).catch(error => {
        console.log('ERROR:', error.message)
      })
    },

    // Actualizar los datos de un usuario
    updateUsuario ({
      commit
    }, usuario) {
      commit('SET_USUARIO', usuario) // si usuario != null entonces la variable logged sera TRUE
    }

  },
  getters: {
    getUsuarioById: state => id => {
      return state.usuarios.find(usuario => usuario.idUsuario === id)
    },
    getUsuarios: state => {
      return state.usuarios
    },
    getUsuario: state => {
      return state.usuario
    },
    getLogged: state => {
      return !!state.usuario.logged
    },
    isAdministrador: (state) => {
      return state.usuario.tipo === 'ADMINISTRADOR'
    },
    isOperador: (state) => {
      return state.usuario.tipo === 'OPERADOR'
    },
    isTrabajador: (state) => {
      return state.usuario.tipo === 'TRABAJADOR'
    }

  }
}

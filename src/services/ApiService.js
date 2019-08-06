import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: false,
  // mode: 'no-cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',

    'Access-Control-Allow-Origin': '*'
  }
})

export default {
  /* == Recursos del controlador de Ususarios === */
  getUsuarios () {
    return apiClient.get('/usuario/all')
  },
  getUsuario (id) {
    return apiClient.get('/usuario/' + id)
  },
  getAutenticarUsuario (mail, password) {
    return apiClient.get('/usuario/autenticar?user=' + mail + '&pass=' + password)
  },
  postUsuario (usuario) {
    return apiClient.post('/usuario', usuario)
  },
  putUsuario (usuario) {
    return apiClient.put('/usuario/' + usuario.idUsuario, usuario)
  },

  /* == Recursos del controlador de Tipo (Vehiculo) === */
  getTipos () {
    return apiClient.get('/tipo/all')
  },
  getTipo (id) {
    return apiClient.get('/tipo/' + id)
  },
  postTipo (tipo) {
    return apiClient.post('/tipo', tipo)
  },
  putTipo (tipo) {
    return apiClient.put('/tipo/' + tipo.idTipo, tipo)
  },
  /* == Recursos del controlador de Unidad (oficinas) === */
  getUnidades () {
    return apiClient.get('/unidad/all')
  },
  getUnidad (id) {
    return apiClient.get('/unidad/' + id)
  },
  postUnidad (unidad) {
    return apiClient.post('/unidad', unidad)
  },
  putUnidad (unidad) {
    return apiClient.put('/unidad/' + unidad.idUnidad, unidad)
  },

  /* == Recursos del controlador de Destino === */
  getDestinos () {
    return apiClient.get('/destino/all')
  },
  getDestino (id) {
    return apiClient.get('/destino/' + id)
  },
  postDestino (destino) {
    return apiClient.post('/destino', destino)
  },
  putDestino (destino) {
    return apiClient.put('/destino/' + destino.idDestino, destino)
  },

  /* == Recursos del controlador de Vehiculo === */
  getVehiculos () {
    return apiClient.get('/vehiculo/all')
  },
  getVehiculo (id) {
    return apiClient.get('/vehiculo/' + id)
  },
  postVehiculo (vehiculo) {
    return apiClient.post('/vehiculo', vehiculo)
  },
  putVehiculo (vehiculo) {
    return apiClient.put('/vehiculo/' + vehiculo.idVehiculo, vehiculo)
  },

  /* == Recursos del controlador de Trabajadores === */
  getTrabajadores () {
    return apiClient.get('/trabajador/all')
  },
  getTrabajador (id) {
    return apiClient.get('/trabajador/' + id)
  },
  postTrabajador (trabajador) {
    return apiClient.post('/trabajador', trabajador)
  },
  putTrabajador (trabajador) {
    return apiClient.put('/trabajador/' + trabajador.idTrabajador, trabajador)
  },

  /* == Recursos del controlador de Usuario Trabajadores === */
  getUsuariosTrabajadores () {
    return apiClient.get('/usuario/all')
  },
  getUsuarioTrabajador (id) {
    return apiClient.get('/usuario/' + id)
  },
  postUsuarioTrabajador (usuarioTrabajador) {
    return apiClient.post('/usuario', usuarioTrabajador)
  },
  putUsuarioTrabajador (usuarioTrabajador) {
    return apiClient.put('/usuario/' + usuarioTrabajador.idUsuario, usuarioTrabajador)
  },

  /* == Recursos del controlador de Requerimiento === */
  getRequerimientosOrdenadoIdRequerimientoDescendente () {
    return apiClient.get('/requerimiento/all/descendente')
  },
  getRequerimiento (id) {
    return apiClient.get('/requerimiento/' + id)
  },
  postRequerimiento (requerimiento) {
    return apiClient.post('/requerimiento', requerimiento)
  },
  putRequerimiento (requerimiento) {
    return apiClient.put('/requerimiento/' + requerimiento.idRequerimiento, requerimiento)
  },
  getRequerimientosByUsuario (idUsuario) {
    return apiClient.get('/requerimiento/usuario/' + idUsuario)
  },
  getRequerimientosByAprobados () {
    return apiClient.get('/requerimiento/aprobados/')
  },
  deleteRequerimiento (requerimiento) {
    return apiClient.delete('/requerimiento/' + requerimiento.idRequerimiento, requerimiento)
  }

}

import Vue from 'vue'
import Router from 'vue-router'

import OrdenSalida from '@/views/OrdenSalida.vue'
import SolicitudVehiculo from '@/views/SolicitudVehiculo.vue'
import SolicitudVehiculoTodos from '@/views/SolicitudVehiculoTodos.vue'
import EditRequerimientoForm from '@/components/forms/EditRequerimientoForm.vue'
import CrearRequerimientoForm from '@/components/forms/NewRequerimientoForm.vue'
import PrintRequerimientoForm from '@/components/forms/PrintRequerimientoForm.vue'

import Destino from '@/views/Destino.vue'
import Tipo from '@/views/Tipo.vue'
import Unidad from '@/views/Unidad.vue'
import Trabajador from '@/views/Trabajador.vue'
import Vehiculo from '@/views/Vehiculo.vue'
import UsuarioTrabajador from '@/views/UsuarioTrabajador.vue'
import Login from '@/views/Login.vue'

// Importamos el almacen de datos Store
import store from '@/store.js'

Vue.use(Router)
const beforeEnter = (to, from, next) => {
  if (store.state.usuarioModule.usuario.logged) {
    // si el usuairo esta identificado
    next({
      path: '/'
    })
  } else {
    next()
  }
}

const router = new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'login',
      title: 'Acceder al sistema'
    }
  },

  {
    path: '/orden-salida',
    name: 'orden-salida',
    component: OrdenSalida,
    meta: {
      Auth: true,
      title: 'Ordenes de Salida de Vehículos'

    }
  },
  {
    path: '/solicitar-vehiculo',
    name: 'solicitar-vehiculo',
    component: SolicitudVehiculo,
    meta: {
      Auth: true,
      title: 'Solicitar Vehículo'
    }
  },
  {
    path: '/solicitar-vehiculo-todos',
    name: 'solicitar-vehiculo-todos',
    component: SolicitudVehiculoTodos,
    meta: {
      Auth: true,
      title: 'Listar todas las solicitudes'
    }
  },
  {
    path: '/editar-requerimiento/:idRequerimiento',
    name: 'editar-requerimiento-form',
    component: EditRequerimientoForm,
    props: true,
    meta: {
      Auth: true,
      title: 'Editar Requerimiento'
    }
  },
  {
    path: '/imprimir-requerimiento/:idRequerimiento',
    name: 'imprimir-requerimiento-form',
    component: PrintRequerimientoForm,
    props: true,
    meta: {
      Auth: true,
      title: 'Imprimir Requerimiento'
    }
  },
  {
    path: '/crear-requerimiento/',
    name: 'crear-requerimiento-form',
    component: CrearRequerimientoForm,
    meta: {
      Auth: true,
      title: 'Requerimientos de Vehículos'
    }
  },
  {
    path: '/destino',
    name: 'destino',
    component: Destino,
    meta: {
      Auth: true,
      title: 'Destinos'
    }
  },
  {
    path: '/tipo',
    name: 'tipo',
    component: Tipo,
    meta: {
      Auth: true,
      title: 'Tipos de Vehículos'
    }
  },
  {
    path: '/unidad',
    name: 'unidad',
    component: Unidad,
    meta: {
      Auth: true,
      title: 'Unidades'
    }
  },
  {
    path: '/trabajador',
    name: 'trabajador',
    component: Trabajador,
    meta: {
      Auth: true,
      title: 'Trabajadores'
    }
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: Vehiculo,
    meta: {
      Auth: true,
      title: 'Vehiculos'
    }
  },
  {
    path: '/usuario',
    name: 'usuario-trabajador',
    component: UsuarioTrabajador,
    meta: {
      Auth: true,
      title: 'Usuarios'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      Auth: false,
      title: 'Login'
    },
    beforeEnter: (to, from, next) => beforeEnter(to, from, next)
  }

  ]
})

// El objeto ROUTER tiene el metodo 'beforeEach' que se encarga de ejecutarse en cada ruta de forma automática
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // Añadimos una comprobación de acceso a las rutas
  // if (to.meta.Auth && !store.state.usuarioModule.usuario.idUsuario === 0) {
  if (to.meta.Auth && !store.state.usuarioModule.usuario.logged) {
    /* console.log('Este es el usuario:')
    console.log(store.state.usuarioModule.usuario) */
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router

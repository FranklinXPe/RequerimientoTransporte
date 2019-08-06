<template>
  <!-- el 'v-app' es el root de todos los componentes Vuetify  y debe estar al principio -->
  <v-app class="grey lighten-4">
    <NavbarTrabajador v-if="getUsuario.tipo ==='TRABAJADOR' && getUsuario.logged" />
    <NavbarOperador v-if="getUsuario.tipo ==='OPERADOR'  && getUsuario.logged" />
    <NavbarAdmin v-if="getUsuario.tipo ==='ADMINISTRADOR'  && getUsuario.logged" />
    <!-- el 'v-content' es tipicamente el lugar donde se ubica todo el contenido actual de nuestra pagina -->

    <v-content class="mx-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import NavbarAdmin from '@/components/NavbarAdmin';
import NavbarTrabajador from '@/components/NavbarTrabajador.vue';
import NavbarOperador from '@/components/NavbarOperador.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: { NavbarAdmin, NavbarTrabajador, NavbarOperador },
  computed: {
    ...mapGetters(['getUsuario'])
  }
}
</script>

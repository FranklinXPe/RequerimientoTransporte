<template>
  <nav>
    <!-- Menu superior: TOOLBAR -->
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Solicitud</span>
        <span>Vehiculos</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- Menu lateral : NAVIGATION DRAWER -->
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list dense dark>
        <!-- avatar del usuario que accedio al sistema -->
        <v-layout column align-center>
          <v-flex class="mt-5">
            <v-avatar size="100">
              <img src="../assets/flores.png" alt="empresa Flores" height="100px" />
            </v-avatar>
            <p class="white--text subheading mt-1">{{this.$store.state.usuarioModule.usuario.user}}</p>
            <p class="white--text subheading mt-1">{{this.$store.state.usuarioModule.usuario.tipo}}</p>
          </v-flex>
        </v-layout>

        <!--Grupo de Opciones: Requerimiento y Mantenimientos--->

        <!-- son los items de una lista: <li> en el menu latereal :Drawer -->

        <v-list-group
          v-for="item  in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          class="white--text"
          dark
        >
          <template v-slot:activator>
            <v-list-tile class="white--text">
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="subItem.to">
            <v-list-tile-content>
              <v-list-tile-title>{{subItem.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <!-- Opcion: Logout --->
        <v-divider></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon class="white--text">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text" @click="logout">Cerrar Sesion</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "app-navbar-trabajador",
  data() {
    return {
      drawer: false,
      // Items de nuestra navegacion
      items: [
        {
          title: "Requerimiento Vehículos",
          icon: "book",
          route: "/",
          active: true,
          items: [{ title: "Solicitud", to: "/solicitar-vehiculo" }]
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("updateUsuario", {
        idUsuario: 0,
        user: "",
        tipo: "TRABAJADOR",
        logged: false
      });
      this.$router.push("/login");
    },
    goTo(module) {
      this.$router.push("/" + module);
    }
  }
};
</script>

<style>
.v-navigation-drawer > .v-list .v-list__tile--active .v-list__tile__title {
  color: rgb(231, 229, 89);
}

.v-list__group__header--active .v-list__group__header__prepend-icon .v-icon {
  color: rgb(231, 229, 89);
}
</style>

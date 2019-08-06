<template>
  <div>
    <!-- Establecemos que la vista del formulario sera un 'LOGIN' -->
    <AuthForm action="login" v-on:process="login($event)" />
    <AppSnackBar v-if="snackBar" :snackBar="snackBar" :text="message" :timeout="timeout"></AppSnackBar>
  </div>
</template>

<script>
import AuthForm from '@/components/forms/AuthForm.vue';
import AppSnackBar from '@/components/SnackBar.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'app-login',
  components: { AuthForm, AppSnackBar },
  data () {
    // Para el momento en que usemos un SnackBar (ventanas de aviso)
    return {
      snackBar: false,
      message: '',
      timeout: 5000
    }
  },
  methods: {
    // escuchamos

    login (user) {
      // Invocamos al 'Action' login de Firebase

      this.$store
        .dispatch('fetchAutenticarUsuario', {
          mail: user.email,
          pass: user.password
        })
        .then(response => {
          /* console.log(response.data.idUsuario)
        this.user.idUsuario = response.data.idUsuario
        console.log(response.data.email)
        this.user.user = response.data.email
        console.log(response.data.tipo)
        this.user.tipo = response.data.tipo */
          // console.log(response.data.idUsuario)

          this.$store.dispatch('updateUsuario', {
            idUsuario: response.data.idUsuario,
            user: response.data.email,
            tipo: response.data.tipo
          })
          if (response.data.tipo !== 'ADMINISTRADOR') {
            this.$router.push({
              name: 'solicitar-vehiculo'
            })
          } else {
            this.$router.push({
              name: 'solicitar-vehiculo-todos'
            })
          }
        })
        .catch(error => {
          this.message =
            'Las credenciales no coinciden, intente nuevamente por favor. ' +
            error.message.substr(0, 60)
          this.snackBar = true
          setTimeout(() => {
            this.snackBar = false
          }, this.timeout)
        })
    }
  },
  computed: {
    ...mapGetters(['getUsuario'])
  }
}
</script>

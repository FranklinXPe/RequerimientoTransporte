<template>
  <div>
    <v-snackbar :timeout="timeout" :color="color" v-model="showSnack">
      {{text}}
      <v-btn dark flat @click="showSnack=false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'app-snack-bar',
  props: ['snackBar', 'timeout', 'text'],
  data () {
    return {
      color: 'primary',
      mode: 'horizontal',
      showSnack: this.snackBar // Como los props son inmutables lo pasamos a otra variable para poder cambiarlo
    }
  }
}
</script>

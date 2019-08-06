<template>
  <div id="app">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex class="mt-5">
            <img src="../../assets/flores.png" alt="empresa" />

            <p class="white--text subheading mt-1">Juan Martinez</p>
          </v-flex>
          <v-flex xs8 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="white--text">Login form</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form id="nativeForm" v-model="validacion">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    prepend-icon="person"
                    name="login"
                    label="Usuario"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    name="password"
                    label="Contraseña"
                    type="password"
                  ></v-text-field>

                  <!-- El campo confirmacion contraseña se visualizara siempre y cuando el 'prop action' es 'register'v-->
                  <v-text-field
                    v-if="action === 'register'"
                    v-model="password_confirmation"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    name="passwordConfirmation"
                    label="Confirmar Contraseña"
                    type="password"
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="primary" @click="submit" :disabled="!validacion">Ingresar</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "auth-form",
  // eslint-disable-next-line vue/require-prop-type-constructor
  props: { action: "" }, // Indica si es un registro de usuario o un logueo simple
  data() {
    return {
      validacion: false,
      email: "",
      emailRules: [
        v => !!v || "El campo Email es requerido",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "El campo emial debe ser válido"
      ],
      password: "",
      passwordRules: [
        v => !!v || "El campo Contraseña es requerido",
        v => v.length >= 6 || "La contraseña debe tener más de 6 caracteres"
      ],
      password_confirmation: "",
      passwordConfirmationRules: [
        v => !!v || "El campo Confirmar Contraseña es requerido",
        v => v.length >= 6 || "La contraseña debe tener más de 6 caracteres",
        v => v === this.password || "Las contraseñas no coinciden"
      ]
    };
  },
  methods: {
    submit() {
      // enviamos el evento que pueda escuchar el componente 'Login'
      this.$emit("process", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

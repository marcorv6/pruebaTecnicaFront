<template>
  <div class="full-h is-flex is-justify-content-center is-align-items-center">
    <form class="box">
      <div class="has-text-centered">
        <h2 class="is-size-1">Iniciar Sesión</h2>
      </div>

      <b-field label="Usuario">
        <b-input type="text" @keyup.enter.native="login()" v-model="user" />
      </b-field>

      <b-field label="Contraseña">
        <b-input
          type="password"
          @keyup.enter.native="login()"
          v-model="password"
          password-reveal
        />
      </b-field>

      <div class="has-text-centered">
        <b-button
          @click="login()"
          type="is-success"
          :disabled="!(user && password)"
        >
          Iniciar Sesión
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    printMessage: { type: Function, required: true },
    printWarning: { type: Function, required: true },
    printError: { type: Function, required: true },
    updateIsLoading: { type: Function, required: true },
  },
  data() {
    return {
      user: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.user && this.password && !this.error) {
        const data = {
          user: this.user,
          password: this.password,
        }

        this.updateIsLoading(true)
        axios
          .post(`${process.env.api}/user/login`, data)
          .then((res) => {
            const info = res.data
            this.updateIsLoading(false)

            if (info.User.userTypeId == 2) {
              this.$router.push('/NoAdmin')
              localStorage.setItem('userLoggedTypeId', info.User.userTypeId)
            }
            if (info.User.userTypeId == 1) {
              localStorage.setItem('loggedUser', info.User.user)
              localStorage.setItem('token', info.token)
              localStorage.setItem('loggedUserId', info.User.userId)
              localStorage.setItem('userLoggedTypeId', info.User.userTypeId)
              this.printMessage("He ingresado con éxito.")
              this.$router.push('/Usuario')
            }
          })
          .catch((err) => {
            this.error = 'is-danger'
            this.updateIsLoading(false)
            this.printError(err.response.data.message)
          })
      }
    },
  },
}
</script>

<style scoped>
form {
  width: 30rem;
}
.full-h{
  min-height: 50rem;
}
</style>

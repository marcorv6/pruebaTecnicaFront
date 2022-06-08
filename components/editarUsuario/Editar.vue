<template>
  <div class="full-h">
    <b-button class="mt-5 button" @click="back()"> Atrás </b-button>
    <div class="is-flex is-justify-content-center">
      <form class="box mt-5">
        <div class="is-flex is-align-items-center is-justify-content-center">
          <h2 class="has-text-centered is-size-3">Editar usuarios</h2>
          <b-tooltip
            label="Usuario: Mínimo 7 carácteres. Contraseña: Al menos una mayuscula, una minuscula, un número, un símbolo y 10 carácteres mínimo."
          >
            <b-icon icon="help" size="is-small"> </b-icon>
          </b-tooltip>
        </div>
        <b-field label="Usuario:">
          <b-input type="text" placeholder="Digite el usuario" v-model="user" />
        </b-field>

        <b-field label="Correo electrónico:">
          <b-input type="text" placeholder="Digite el correo" v-model="email" />
        </b-field>

        <b-field label="Contraseña:">
          <b-input
            type="password"
            placeholder="Digite la contraseña"
            v-model="newPassword"
            password-reveal
          />
        </b-field>

        <b-field label="Confirmar contraseña:">
          <b-input
            type="password"
            placeholder="Digite la contraseña de nuevo"
            v-model="confirPassord"
            password-reveal
          />
        </b-field>

        <b-field label="Sexo:">
          <b-select v-model="genderId" placeholder="Seleccione" expanded>
            <option
              v-for="(gender, index) in genders"
              :key="index"
              :value="gender.genderId"
            >
              {{ gender.gender }}
            </option>
          </b-select>
        </b-field>

        <div class="has-text-centered">
          <b-button
            @click="confirmUpdate()"
            type="is-success"
            :disabled="newPassword && !pwAreEqual"
          >
            Editar usuario
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    updateIsLoading: {
      type: Function,
      required: true,
    },
    printMessage: { type: Function, required: true },
    printWarning: { type: Function, required: true },
    printError: { type: Function, required: true },
    updateIsLoading: { type: Function, required: true },
  },
  data() {
    return {
      user: null,
      userId: null,
      newPassword: null,
      email: null,
      confirPassord: null,
      pwAreEqual: false,
      genderId: null,
      genders: [],
      token: null,
    }
  },
  methods: {
    back() {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      localStorage.removeItem('password')
      localStorage.removeItem('genderId')
      this.$router.push('/usuario')
    },
    confirmUpdate() {
      this.$swal({
        title: '¿Estás seguro de querer crear este operador?',
        type: 'question',
        timer: 9000,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then((res) => {
        if (res.value) {
          this.update()
        }
      })
    },
    success() {
      this.$swal({
        title: 'Se ha creado el operador con éxito.',
        type: 'success',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      })
    },
    errorMessage(err) {
      this.$swal({
        title: err,
        type: 'error',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      })
    },
    update() {
      this.updateIsLoading(true)
      const data = {
        userId: this.userId,
        user: this.user,
        password: this.newPassword,
        genderId: this.genderId,
        email: this.email,
      }
      axios
        .put(`${process.env.api}/user/updateUser`, data, {
          headers: {
            token: this.token ? this.token : localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.updateIsLoading(false)
          this.printMessage('Se ha editado el usuario con éxito.')
          this.$router.push('/usuario')
        })
        .catch((err) => {
          this.error = 'is-danger'
          this.updateIsLoading(false)
          this.errorMessage(err.response.data.message)
        })
    },
    async fetchGenders() {
      this.updateIsLoading(true)
      axios
        .get(`${process.env.api}/Gender/getAll`)
        .then((res) => {
          this.updateIsLoading(false)
          if (res) this.genders = res.data
        })
        .catch((err) => {
          this.error = 'is-danger'
          this.errorMessage(err.response.data.message)
          this.updateIsLoading(false)
        })
    },
  },
  watch: {
    confirPassord() {
      if (this.newPassword === this.confirPassord) this.pwAreEqual = true
      else this.pwAreEqual = false
    },
  },
  created() {
    this.user = localStorage.getItem('user')
    this.userId = localStorage.getItem('userId')
    this.token = localStorage.getItem('token')
    this.email = localStorage.getItem('email')
    this.genderId = localStorage.getItem('genderId')
    this.fetchGenders()
  },
}
</script>

<style scoped>
form {
  width: 100%;
}
.button {
  background-color: #1d3d6f !important;
  color: white !important;
}
</style>

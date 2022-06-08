<template>
  <div class="full-h">
    <div class="is-flex is-justify-content-center">
      <form class="box mt-5">
        <div class="is-flex is-align-items-center is-justify-content-center">
          <h2 class="has-text-centered is-size-3">Alta de usuarios</h2>
          <b-tooltip
            label="Usuario: Mínimo 7 carácteres. Contraseña: Al menos una mayuscula, una minuscula, un número, un símbolo y 10 carácteres mínimo."
          >
            <b-icon icon="help" size="is-small"> </b-icon>
          </b-tooltip>
        </div>
        <b-field label="Usuario:">
          <b-input
            type="text"
            placeholder="Digite el usuario"
            v-model="user"
            min-length="100"
            :has-counter="false"
          />
        </b-field>

        <b-field label="Correo electrónico:">
          <b-input
            type="email"
            placeholder="Digite el correo del usuario"
            v-model="email"
          />
        </b-field>

        <b-field label="Contraseña:">
          <b-input
            v-model="password"
            placeholder="Digite la contraseña"
            maxlength="60"
            min-length="10"
            :has-counter="false"
            password-reveal
          >
          </b-input>
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

        <b-field label="Tipo de usuario:">
          <b-select v-model="userTypeId" placeholder="Seleccione" expanded>
            <option
              v-for="(userType, index) in userTypes"
              :key="index"
              :value="userType.userTypeId"
            >
              {{ userType.userType }}
            </option>
          </b-select>
        </b-field>

        <div class="has-text-centered">
          <b-button @click="confirmarEnviar()" type="is-success">
            Crear usuario
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
  },
  data() {
    return {
      user: null,
      email: null,
      password: null,
      genderId: null,
      userTypeId: null,
      genders: [],
      userTypes: [],
      token: null
    }
  },
  methods: {
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
    async fetchUserTypes() {
      this.updateIsLoading(true)
      axios
        .get(`${process.env.api}/UserType/getAll`)
        .then((res) => {
          this.updateIsLoading(false)
          if (res) this.userTypes = res.data
        })
        .catch((err) => {
          this.error = 'is-danger'
          this.errorMessage(err.response.data.message)
          this.updateIsLoading(false)
        })
    },
    confirmarEnviar() {
      this.$swal({
        title: '¿Estás seguro de querer crear este usuario?',
        type: 'question',
        timer: 9000,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then((res) => {
        if (res.value) {
          this.crear()
        }
      })
    },
    success() {
      this.$swal({
        title: 'Se ha creado el usuario con éxito.',
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
    reset() {
      this.user = ''
      this.email = null
      this.password = null
      this.genderId = null
      this.userTypeId = null
    },
    crear() {
      this.updateIsLoading(true)
      const data = {
        user: this.user,
        email: this.email,
        password: this.password,
        userTypeId: this.userTypeId,
        genderId: this.genderId,
      }
      axios
        .post(`${process.env.api}/User/createUser`, data, {
          headers: {
            token: this.token ? this.token : localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.updateIsLoading(false)
          this.success()
          this.reset()
        })
        .catch((err) => {
          this.error = 'is-danger'
          this.updateIsLoading(false)
          this.errorMessage(err.response.data.message)
          this.reset()
        })
    },
  },
  async created() {
    await this.fetchGenders()
    await this.fetchUserTypes()
  },
  watch: {
    confirmarPassword() {
      if (this.password === this.confirmarPassword) this.sonIguales = true
      else this.sonIguales = false
    },
  },
}
</script>

<style scoped>
form {
  width: 100%;
}
</style>

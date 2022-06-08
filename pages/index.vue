<template>
  <section class="container">
    <Login
      :printMessage="printMessage"
      :printWarning="printWarning"
      :printError="printError"
      :updateIsLoading="updateIsLoading"
    />

    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false" />
  </section>
</template>

<script>
import Login from '@/components/Login'

export default {
  components: { Login },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    updateIsLoading(booleanValue) {
      this.isLoading = booleanValue
    },
    printError(message, title = '¡Hubo un error!', onConfirm = () => {}) {
      this.$swal({
        type: 'error',
        title: title,
        text: message,
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then(() => {
        onConfirm()
      })
    },
    printMessage(message, title = '¡Felicidades!', onConfirm = () => {}) {
      this.$swal({
        title: title,
        text: message,
        type: 'success',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then(() => {
        onConfirm()
      })
    },
    printWarning(
      message,
      onConfirm = () => {},
      title = '¡Espera un minuto!',
    ) {
      this.$swal({
        title: title,
        text: message,
        type: 'warning',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70'
      }).then(() => {
        onConfirm()
      })
    },
  },
  layout: 'login',
}
</script>

<style scoped>
.container {
  min-height: 50rem;
}
</style>

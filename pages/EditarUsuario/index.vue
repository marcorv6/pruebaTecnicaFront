<template>
  <div class="container">
    <Editar
      :printMessage="printMessage"
      :printWarning="printWarning"
      :printError="printError"
      :updateIsLoading="updateIsLoading"
    />
  </div>
</template>

<script>
import Editar from '../../components/editarUsuario/Editar.vue'

export default {
  components: {
    Editar,
  },
  methods: {
    updateIsLoading(booleanValue) {
      this.isLoading = booleanValue
    },
    printError(message, title = '¡Hubo un error!', onConfirm = () => {}) {
      this.$swal({
        title: title,
        text: message,
        type: 'danger',
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
    printWarning(message, onConfirm = () => {}, title = '¡Espera un minuto!') {
      this.$swal({
        title: title,
        text: message,
        type: 'warning',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then(() => {
        onConfirm()
      })
    },
  },
  created() {
    if (Number(localStorage.getItem('userLoggedTypeId')) !== 1) this.$router.push('/')
  },
}
</script>

<style scoped>
.container {
  min-height: 50rem;
}
</style>

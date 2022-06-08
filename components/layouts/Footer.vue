<template>
  <footer class="footer">
    <div class="container has-text-centered is-size-7 has-text-white">
      <p>Hecho en México, todos los derechos reservados {{ year() }}.</p>
      <p>Prueba técnica Axsis.</p>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'

export default {
  methods: {
    year() {
      return moment().year()
    },
  },
}
</script>

<style scoped>
footer {
  background-color: #1d3d6f;
  padding-bottom: 2rem;
}
</style>

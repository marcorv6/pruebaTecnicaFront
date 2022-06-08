<template>
  <section>
    <div class="container is-flex is-justify-content-flex-end">
      <div
        class="container is-flex is-justify-content-space-between is-align-items-center"
      >
        <h2 class="m-2 has-text-white">{{ user }}</h2>

        <b-button
          type="is-danger"
          size="is-small"
          class="m-2 rojo"
          @click="logOut()"
        >
          Cerrar Sesión
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { user: localStorage.getItem('loggedUser') }
  },
  methods: {
    logOut() {
      localStorage.clear()
      this.$router.push('/')
    },
  },
  created() {
    if (!localStorage.getItem('loggedUser')) this.logOut()
  },
}
</script>

<style scoped>
section {
  background-color: rgb(99, 99, 99);
}

.rojo {
  background-color: #dc3545;
}
</style>

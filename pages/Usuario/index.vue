<template>
  <div class="container">
    <Crear :updateIsLoading="updateIsLoading" />
    <h2 class="has-text-centered mt-5 is-size-3">Administración de usuarios</h2>
    <Tabla
      :data="data"
      :updateIsLoading="updateIsLoading"
      :onPageChange="onPageChange"
      :total="total"
      :current-page="page"
      :page="page"
    />
  </div>
</template>

<script>
import Tabla from '../../components/usuario/Tabla.vue'
import Crear from '../../components/usuario/Crear.vue'
import axios from 'axios'

export default {
  components: {
    Tabla,
    Crear,
  },
  data() {
    return {
      data: [],
      isLoading: false,
      page: 1,
      total: 0,
      token: null
    }
  },
  methods: {
    updateIsLoading(booleanValue) {
      this.isLoading = booleanValue
    },
    onPageChange(page) {
      this.page = page
      this.fetchData()
    },
    fetchData() {
      this.updateIsLoading(true)
      axios
        .get(`${process.env.api}/User/users?page=${this.page}`)
        .then((res) => {
          if (!res) throw new Error('No hay datos disponibles')
          this.data = res.data.rows
          this.total = res.data.count
          this.updateIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          this.updateIsLoading(false)
        })
    },
  },
  created() {
    this.fetchData()
    this.token = localStorage.getItem('token')
    if (Number(localStorage.getItem('userLoggedTypeId')) !== 1) this.$router.push('/')
  },
}
</script>


<style scoped>
@media (max-width: 768px) {
  .b-table{
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }
}
</style>
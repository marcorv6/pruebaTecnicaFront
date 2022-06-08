<template>
  <b-table
    :data="data"
    :total="total"
    :current-page="page"
    :per-page="25"
    @page-change="onPageChange"
    class="mb-6"
    hoverable
    striped
    paginated
    backend-pagination
  >
    <b-table-column
      field="IdUsuario"
      label="IdUsuario"
      v-slot="props"
      centered
      sortable
    >
      {{ props.row.userId }}
    </b-table-column>

    <b-table-column
      field="Usuario"
      label="Usuario"
      v-slot="props"
      centered
      sortable
    >
      <span> {{ props.row.user }} </span>
    </b-table-column>

    <b-table-column
      field="Correo"
      label="Correo"
      v-slot="props"
      centered
      sortable
    >
      <span> {{ props.row.email }} </span>
    </b-table-column>

    <b-table-column field="status" label="Status" sortable v-slot="props">
      <span class="tag" :class="type(props.row.status)">
        {{ props.row.status ? 'Activo' : 'Inactivo' }}
      </span>
    </b-table-column>

    <b-table-column field="editar" label="Editar" centered v-slot="props">
      <b-button class="editButton" @click="editar(props.row)"
        >Editar</b-button
      >
    </b-table-column>

    <b-table-column field="eliminar" label="Eliminar" centered v-slot="props">
      <b-button
        :type="type(!props.row.status)"
        @click="confimarActivaDesactivar(props.row)"
        >{{ props.row.status ? 'Desactivar' : 'Activar' }}</b-button
      >
    </b-table-column>
  </b-table>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  props: {
    updateIsLoading: {
      type: Function,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    onPageChange: {
      type: Function,
      require: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data(){
    return {
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    editar(user) {
      localStorage.setItem('user', user.user)
      localStorage.setItem('userId', user.userId)
      localStorage.setItem('email', user.email)
      localStorage.setItem('password', user.password)
      localStorage.setItem('genderId', user.genderId)
      this.$router.push('/EditarUsuario')
    },
    activarDesactivar(user) {
      this.updateIsLoading(true)
      axios
        .post(
          `${process.env.api}/User/deactivateUser`,
          { userId: user.userId },
          {
            headers: {
              token: this.token ? this.token : localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          this.updateIsLoading(false)
          this.success()
        })
        .catch((err) => {
          this.error = 'is-danger'
          this.updateIsLoading(false)
          this.errorMessage(err.response.data.message)
        })
    },
    confimarActivaDesactivar(user) {
      this.$swal({
        title: `¿Estás seguro de querer ${
          user.status ? 'desactivar' : 'activar'
        } este usuario?`,
        type: 'warning',
        timer: 9000,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      }).then((res) => {
        if (res.value) {
          this.activarDesactivar(user)
        }
      })
    },
    success() {
      this.$swal({
        title: 'Se ha eliminado el usuario con éxito.',
        type: 'success',
        timer: 5000,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1e3c70',
      })
    },
    fecha(date) {
      const fecha = moment(date)

      return fecha.isValid() ? fecha.format('YYYY-MM-DD') : ''
    },
    type(bool) {
      if (bool === false) {
        return 'is-danger'
      } else {
        return 'is-success'
      }
    },
  },
}
</script>

<style>
.retraso {
  background: #ff7373 !important;
}

.retraso:hover {
  background: #e06464 !important;
}

.posible-multa {
  background: #ffe08a !important;
}

.posible-multa:hover {
  background: #fbdb7d !important;
}

.activo {
  background-color: #3fc36d !important;
}

.activo:hover {
  background-color: #35a058 !important;
}

.editButton {
  background-color: #1d3d6f !important;
  color: white !important;
}
</style>

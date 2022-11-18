import { createRouter, createWebHistory } from 'vue-router'
import AdminHomeView from '../views/AdminHomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import DepartamentosView from '@/views/DepartamentosView.vue'
import CreateUser from '@/components/CreateUser.vue'
import EditUser from '@/components/EditUser.vue'
import CreateDepartamento from '@/components/CreateDepartamento.vue'
import EditDepartamento from '@/components/EditDepartamento.vue'

const routes = [
  {
    path: '/',
    name: 'AdminHomeView',
    component: AdminHomeView
  },
  {
    path: '/usuarios',
    name: 'UsuariosView',
    component: UsuariosView
  },
  {
    path: '/departamentos',
    name: 'DepartamentosView',
    component: DepartamentosView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/edituser/:id',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/createdepartamento',
    name: 'CreateDepartamento',
    component: CreateDepartamento
  },
  {
    path: '/editdepartamento/:id',
    name: 'EditDepartamento',
    component: EditDepartamento
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AdminHomeView from '../views/AdminHomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import DepartamentosView from '@/views/DepartamentosView.vue'
import CreateUser from '@/components/CreateUser.vue'
import EditUser from '@/components/EditUser.vue'
import CreateDepartamento from '@/components/CreateDepartamento.vue'
import EditDepartamento from '@/components/EditDepartamento.vue'
import GerenteHomeView from '../views/GerenteHomeView.vue'
import miDepartamentoView from '../views/miDepartamentoView.vue'
import misEmpleadosView from '../views/misEmpleadosView.vue'
import CreateActividad from '@/components/CreateActividad.vue'
import CreateMeta from '@/components/CreateMeta.vue'
import EditMeta from '@/components/EditMeta.vue'
import EditActividad from '@/components/EditActividad.vue'
import EmpleadoHomeView from '@/views/EmpleadoHomeView.vue'
import miPerfilView from '@/views/miPerfilView.vue'
import FechasView from '@/views/fechasView.vue'

import cookies from "@/router/cookies";

const routes = [
  {
    path: '/',
    name: 'AdminHomeView',
    component: AdminHomeView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        }  
      }
    }
  },
  {
    path: '/usuarios',
    name: 'UsuariosView',
    component: UsuariosView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/fechas',
    name: 'FechasView',
    component: FechasView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/departamentos',
    name: 'DepartamentosView',
    component: DepartamentosView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/edituser/:id',
    name: 'EditUser',
    component: EditUser,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/createdepartamento',
    name: 'CreateDepartamento',
    component: CreateDepartamento,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/editdepartamento/:id',
    name: 'EditDepartamento',
    component: EditDepartamento,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 1){
          next();
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },

  {
    path: '/gerentehome',
    name: 'GerenteHomeView',
    component: GerenteHomeView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/midepartamento/:id',
    name: 'miDepartamento',
    component: miDepartamentoView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/misempleados/:id',
    name: 'misEmpleados',
    component: misEmpleadosView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/actividades/:id',
    name: 'actividades',
    component: CreateActividad,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/metas/:id',
    name: 'metas',
    component: CreateMeta,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/editactividades/:id',
    name: 'editactividades',
    component: EditActividad,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },
  {
    path: '/editmetas/:id',
    name: 'editmetas',
    component: EditMeta,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 2){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 3){
          next("/empleado/"+ cookies.getUserId());
        } 
      }
    }
  },


  {
    path: '/empleado/:id',
    name: 'empleado',
    component: EmpleadoHomeView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 3){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        } 
      }
    }
  },
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: miPerfilView,
    beforeEnter: (to, from, next) => {
      if(cookies.getUserLogged() == undefined){
        next("/login");
      }else{
        if(cookies.getUserRol() == 3){
          next();
        }
        if(cookies.getUserRol() == 1){
          next("/");
        }
        if(cookies.getUserRol() == 2){
          next("/gerentehome");
        } 
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

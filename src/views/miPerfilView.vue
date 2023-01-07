<template>
    <EmpleadoHeader/>
    <h1>Mi Perfil</h1>
    <div class="grid">
        <div id="infoEmpleado">
            <p class="infoEmpleado-Foto"></p>
            <p class="infoEmpleado-nombre">{{ nombre }}</p>
            <p class="infoEmpleado-correo">{{ correo }}</p>
        </div>
        <div id="infoDepartamento">
            <p class="infoDepartamento-nombre">Supervisor: {{supervisor}}</p>
            <p class="infoDepartamento-departamento">{{ departamento }}</p>
        </div>
        <div id="actividadesCompletadas">
            <p class="actividadesTotales-titulo">Actividades Completadas</p>
            <p class="actividadesTotales-numero">{{ actividadesC }}</p>
        </div>
        <div id="actividadesTotales">
            <p class="metasTotales-titulo">Actividades Totales</p>
            <p class="metasTotales-numero"> {{ actividadesT }}</p>
        </div>
        <div id="actividadesCanceladas">
            <p class="metasTotales-titulo">Actividades Canceladas</p>
            <p class="metasTotales-numero"> {{ actividadesX }}</p>
        </div>
        <div id="posicionEmpleado">
            <p class="metasTotales-titulo">Posicion Empleado</p>
            <p class="metasTotales-numero"> {{ posicion }}</p>
        </div>
        <div id="actividadesTiempo">
            <p>Actividades en el Tiempo</p>
            <div class="chartContainer">
            <canvas id="actividadesT" ></canvas>
            </div>
        </div>
        <div id="actividadesPendientes">
            <p>Actividades pendientes</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>fechaIni</th>
                          <th>fechaFin</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="actividad in actividades" :key="actividad.IDactividad">
                          <td>{{actividad.nombre}}</td>
                          <td>{{actividad.descripcion}}</td>
                          <td>{{actividad.fechaIni}}</td>
                          <td>{{actividad.fechaFin}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div> 
        </div>
       
    </div>
  </template>
  
<script>

import EmpleadoHeader from '../components/empleadoHeader.vue'
import Chart from 'chart.js/auto'
import axios from 'axios'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import cookies from '@/router/cookies'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default{
  name:'miPerfil',
  components:{
    EmpleadoHeader
  },
  data(){
    return {
      nombre: '',
      correo: '',
      supervisor: '',
      departamento: '',
      actividadesC: 0,
      actividadesT: 0,
      actividadesX: 0,
      posicion: 0,
      actividades: []
    }
  },
  methods:{
      consultarUsuarios(){
            fetch('http://localhost/ING_WEB/actividad.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.actividades=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                     for (let i = 0; i < datosRespuesta.length; i++) {
                      if(datosRespuesta[i].usuario == cookies.getUserId()
                        && datosRespuesta[i].estado == 3){
                        this.actividades.push(datosRespuesta[i])
                      }                
                    }       
                }
            })
            .catch(console.log)
        },
    },
  async created(){
    this.consultarUsuarios()

    let actividades = []
    const actividadData = await axios.get('http://localhost/ING_WEB/actividad.php')
      actividadData.data.forEach(d => {
        actividades.push(d)
      });

    let departamentos = []
    const departamentoData = await axios.get('http://localhost/ING_WEB/departamento.php')
      departamentoData.data.forEach(d => {
        departamentos.push(d)
    });

    let empleados = []
    const empleadoData = await axios.get('http://localhost/ING_WEB/user.php')
    empleadoData.data.forEach(d => {
      empleados.push(d)
    });


    //Datos

    departamentos.forEach(d => {
      if(d.IDdepartamento == cookies.getUserDep()){
        this.departamento= d.Nombre
      }
    });


    let misDatos = []
    let supDatos = []
    empleados.forEach(d => {
      if(d.IDusuario == cookies.getUserId()){
        misDatos.push({
          nombre: d.Nombre +' '+ d.Apellido,
          correo: d.Mail
        })
      }
      if(d.Rol == 2 && d.Departamento == cookies.getUserDep()){
        supDatos.push({
          nombre: d.Nombre +' '+ d.Apellido,
        })
      }
    });


    this.nombre = misDatos[0].nombre
    this.correo = misDatos[0].correo
    this.supervisor =  supDatos[0].nombre

    //Actividades
    let sumT = 0
    let sumC = 0
    let sumX = 0
    actividades.forEach(d => {
        if(d.usuario == cookies.getUserId()){
          sumT = sumT + 1
          if(d.estado == 2){
            sumX = sumX + 1
          }
          if(d.estado == 1){
            sumC = sumC + 1
          }
        }
    });

    this.actividadesT = sumT
    this.actividadesC = sumC
    this.actividadesX = sumX

    // Actividades en el Tiempo 

      let fechas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

      let actEmpleado = []
      for (let i = 0; i < actividades.length; i++) {
          if(actividades[i].usuario == cookies.getUserId()){
            actEmpleado.push({
              fecha: fechas[Number(actividades[i].fechaIni.split('-')[1]) - 1],
              usuario: actividades[i].usuario
            })
          }    
      }
  
      let actFechas = []
      for (let i = 0; i < fechas.length; i++) {
        let sum = 0
          for (let j = 0; j < actEmpleado.length; j++) {
            if(actEmpleado[j].fecha == fechas[i]){
              sum = sum + 1
            }    
          }
          actFechas.push(sum)
      }

      const ctx1 = document.getElementById('actividadesT');
      let dataTime = {
        labels: fechas,
        datasets:[
          {
          label: 'Actividades',
          data: actFechas,
          borderColor: '#ffac40',
          backgroundColor: '#ffdfb5'
          }
        ]  
      }
      new Chart(ctx1, {
          type: 'line',
          data: dataTime
        });


  }

}

  ////////////////////////////////////////
  </script>
  
  <style scoped>
  
  .grid{
    margin: 20px;
    display: grid;
    height: 85vh;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.3fr 0.3fr 1fr ;
    grid-template-areas:
    "infoEmpleado infoEmpleado actividadesCompletadas actividadesTotales"
    "infoDepartamento infoDepartamento actividadesCanceladas posicionEmpleado"
    "actividadesTiempo actividadesTiempo actividadesPendientes actividadesPendientes";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #infoEmpleado{
    background: #ffffff;
    grid-area: infoEmpleado;
    border-radius: 20px;
  }

  
  #infoDepartamento{
    background: #ffffff;
    grid-area: infoDepartamento;
    border-radius: 20px;
  }

  #actividadesCompletadas{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: actividadesCompletadas;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #actividadesTotales{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: actividadesTotales;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #actividadesCanceladas{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: actividadesCanceladas;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #posicionEmpleado{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: posicionEmpleado;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  
  #actividadesTiempo{
    background: #ffffff;
    grid-area: actividadesTiempo;
    border-radius: 20px;
  }
    
  #actividadesPendientes{
    background: #ffffff;
    grid-area: actividadesPendientes;
    border-radius: 20px;
    overflow: hidden;
  }

  #actividadesPendientes p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  .list-table-container{
    height: 92%;
    overflow: auto;
  }

  .list-button button{
    background-color: #04AA6D; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    width: 100%;
  }

  .list-button button:hover{
    cursor: pointer;
    opacity: 0.8;
  }

  .list-table table{
    width: 100%;
  }

  .list-table th{
    background-color: rgba(81,89,101,1);
    color: white;
    padding: 10px;
    font-weight: normal;
  }

  .list-table td{
    padding: 8px;
  }

  #table tr:nth-child(even){background-color: #f8f8f8;}

  .list-table a{
    background-color: #69b7ff;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;
    margin-right: 5px;
    padding: 0px 5px 0px 5px;
  }


  ::-webkit-scrollbar {
  width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(81,89,101,1); 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(64, 70, 80); 
  }

  @media only screen and (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.3fr 0.3fr 0.3fr 0.3fr 1fr 1fr ; 
    grid-template-areas:
      "infoEmpleado infoEmpleado"
      "infoDepartamento infoDepartamento"
      "actividadesCompletadas actividadesTotales"
      "actividadesCanceladas posicionEmpleado"
      "actividadesPendientes actividadesPendientes"
      "actividadesTiempo actividadesTiempo";
  }
}

  </style>
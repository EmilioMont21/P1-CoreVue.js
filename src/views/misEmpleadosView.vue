<template>
    <GerenteHeader/>
    <h1>Mis Empleados</h1>
    <div class="grid">
        <div id="numEmpleados">
            <p class="numEmpleados-titulo">Numero de Empleados</p>
            <p class="numEmpleados-numero">{{ numEmpleados }}</p>
        </div>
        <div id="topEmpleado">
            <p class="topEmpleado-titulo">Mejor Empleado</p>
            <p class="topEmpleado-numero">{{ topEmpleado }}</p>
        </div>
        <div id="list">
            <p>Lista de empleados</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Mail</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="usuario in usuarios" :key="usuario.IDusuario">
                          <td>{{usuario.Nombre}}</td>
                          <td>{{usuario.Apellido}}</td>
                          <td>{{usuario.Mail}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div> 
        </div>
        <div id="topEmpleados">
            <p>Top Empleados</p>
            <div class="chartContainer">
            <canvas id="topEmpleadosChart" ></canvas>
            </div>
        </div>
        <div id="timeEmpleados">
            <p>Mejor empleado en el tiempo</p>  
            <div class="chartContainer">
            <canvas id="timeEmpleadosChart" ></canvas>
            </div>         
        </div>    
    </div>
  </template>
  
<script>

import GerenteHeader from '../components/gerenteHeader.vue'
import Chart from 'chart.js/auto'
import axios from 'axios'
import cookies from "@/router/cookies";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default{
  name:'miDepartamento',
  components:{
    GerenteHeader
  },
  data(){
        return{
            usuarios:[],
            numEmpleados: 0,
            topEmpleado: '',
        }
    },
    methods:{
      consultarUsuarios(){
            fetch('https://vueprojectp2.000webhostapp.com/user.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.usuarios=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                     for (let i = 0; i < datosRespuesta.length; i++) {
                      if(datosRespuesta[i].Departamento == cookies.getUserDep()
                        && datosRespuesta[i].Rol == 3){
                        this.usuarios.push(datosRespuesta[i])
                      }                
                    }       
                }
                this.numEmpleados = this.usuarios.length
            })
            .catch(console.log)
        },
    },
    async created(){
      this.consultarUsuarios()

      let actividades = []
      const actividadData = await axios.get('https://vueprojectp2.000webhostapp.com/actividad.php')
      actividadData.data.forEach(d => {
        actividades.push(d)
      });

      let departamentos = []
      const departamentoData = await axios.get('https://vueprojectp2.000webhostapp.com/departamento.php')
        departamentoData.data.forEach(d => {
          departamentos.push(d)
      });

      let empleados = []
      const empleadoData = await axios.get('https://vueprojectp2.000webhostapp.com/user.php')
      empleadoData.data.forEach(d => {
        empleados.push(d)
      });


      // TOP EMPLEADOS
      let actividadesEmpleado = []
      for (let i = 0; i < empleados.length; i++) {
        let sum = 0
        if(empleados[i].Departamento == cookies.getUserDep()
          && empleados[i].Rol != 2){
          for (let j = 0; j < actividades.length; j++) {
            if(actividades[j].usuario == empleados[i].IDusuario){
              sum = sum + 1
            }      
          }
          actividadesEmpleado.push({
            id: empleados[i].IDusuario,
            Empleado: empleados[i].Nombre,
            Actividades: sum
          })
        }    
      }

      let OrderEmpleados = actividadesEmpleado.sort((y, x) => x.Actividades - y.Actividades)

      let empleadosNom = []
      let empleadosAc = []
      for (let i = 0; i < OrderEmpleados.length; i++) {
          if(i < 5){
            empleadosNom.push(OrderEmpleados[i].Empleado)
            empleadosAc.push(OrderEmpleados[i].Actividades)
          }
      }

      this.topEmpleado = empleadosNom[0]

      const ctx2 = document.getElementById('topEmpleadosChart');
        let dataBar = {
          labels: empleadosNom,
          datasets:[
            {
            label: 'Actividades/Empleado',
            data: empleadosAc,
            borderColor: 'white',
            backgroundColor: '#94D0EF'
            }
          ]  
        }
        new Chart(ctx2, {
            type: 'bar',
            data: dataBar
      });

      // Mejor empleado en el Tiempo 

      let fechas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

      let actEmpleado = []
      for (let i = 0; i < actividades.length; i++) {
          if(actividades[i].usuario == OrderEmpleados[0].id){
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

      const ctx1 = document.getElementById('timeEmpleadosChart');
      let dataTime = {
        labels: fechas,
        datasets:[
          {
          label: 'Actividades de '+empleadosNom[0],
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
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 0.2fr 1fr 1fr ;
    grid-template-areas:
    "numEmpleados topEmpleado list"
    "topEmpleados topEmpleados list"
    "timeEmpleados timeEmpleados list";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #numEmpleados{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: numEmpleados;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #topEmpleado{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: topEmpleado;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #list{
    background: #ffffff;
    grid-area: list;
    border-radius: 20px;
    overflow: hidden;
  }

  #topEmpleados{
    background: #ffffff;
    grid-area: topEmpleados;
    border-radius: 20px;
  }

  #timeEmpleados{
    background: #ffffff;
    grid-area: timeEmpleados;
    border-radius: 20px;
  }


  #list p{
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

  .list-table button{
    border: none;
    background-color: #ff6969;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;
    margin-left: 5px;
  }

  .list-table button:hover{
    background-color: #ff4949;
    cursor: pointer;
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
    grid-template-rows: 0.3fr 1fr 1fr 1fr; 
    grid-template-areas:
      "numEmpleados topEmpleado"
      "topEmpleados topEmpleados"
      "timeEmpleados timeEmpleados"
      "list list";
  }
}

  </style>
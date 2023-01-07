<template>
    <EmpleadoHeader/>
    <h1>Mi Departamento</h1>
    <div class="grid">
        <div id="topDepartamentos">
            <p class="topDepartamentos-titulo">Mejor Departamento</p>
            <p class="topDepartamentos-numero">{{ dep }}</p>
        </div>
        <div id="numTopEmpleados">
            <p class="numTopEmpleados-titulo">Numero de empleados</p>
            <p class="numTopEmpleados-numero">{{ numEmpleados }}</p>
        </div>
        <div id="actividadesTotales">
            <p class="actividadesTotales-titulo">Actividades Totales</p>
            <p class="actividadesTotales-numero">{{ actividadesT }}</p>
        </div>
        <div id="metasTotales">
            <p class="metasTotales-titulo">Metas Totales</p>
            <p class="metasTotales-numero">{{ metasT }}</p>
        </div>
        <div id="desTiempo">
            <p>Actividades y Metas en el Tiempo</p>
            <div class="chartContainer">
            <canvas id="LineAMTime" ></canvas>
            </div>
        </div>
        <div id="actividades">
            <p>Actividades</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Inicio</th>
                          <th>Fin</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="actividad in actividades" :key="actividad.IDactividad">
                          <td>{{actividad.nombre}}</td>
                          <td>{{actividad.fechaIni}}</td>
                          <td>{{actividad.fechaFin}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div> 
        </div>
        <div id="metas">
            <p>Metas</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Inicio</th>
                          <th>Fin</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="meta in metas" :key="meta.IDmetas">
                          <td>{{meta.nombre}}</td>
                          <td>{{meta.fechaIni}}</td>
                          <td>{{meta.fechaFin}}</td>
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
       
    </div>
  </template>
  
<script>

import EmpleadoHeader from '../components/empleadoHeader.vue'
import Chart from 'chart.js/auto'
import axios from 'axios'
import cookies from "@/router/cookies";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default{
  name:'EmpleadoHome',
  components:{
    EmpleadoHeader
  },
  data(){
    return {
      dep: '',
      numEmpleados: 0,
      actividadesT: 0,
      metasT: 0,
      actividades: [],
      metas: []
    }
  },
  methods:{
    consultarActividades(){
            fetch('http://localhost/ING_WEB/actividad.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.actividades=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                     for (let i = 0; i < datosRespuesta.length; i++) {
                      if(datosRespuesta[i].departamento == cookies.getUserDep()){
                        this.actividades.push(datosRespuesta[i])
                      }                
                     }       
                }
            })
            .catch(console.log)
        },
    consultarMetas(){
            fetch('http://localhost/ING_WEB/metas.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.metas=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                     for (let i = 0; i < datosRespuesta.length; i++) {
                      if(datosRespuesta[i].departamento == cookies.getUserDep()){
                        this.metas.push(datosRespuesta[i])
                      }                
                     }       
                }
            })
            .catch(console.log)
        },

  },
  async created(){
    this.consultarMetas()
    this.consultarActividades()

    let actividades = []

    const actividadData = await axios.get('http://localhost/ING_WEB/actividad.php')
    actividadData.data.forEach(d => {
      actividades.push(d)
    });

    let metas = []

    const metaData = await axios.get('http://localhost/ING_WEB/metas.php')
    metaData.data.forEach(d => {
      metas.push(d)
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

    //Departamento
    departamentos.forEach(d => {
      if(d.IDdepartamento == cookies.getUserDep()){
        this.dep= d.Nombre
      }
    });

    //Numero de empleados
    let sumEmpleados = 0 
    for (let i = 0; i < empleados.length; i++) {
      if(empleados[i].Departamento == cookies.getUserDep()){
        sumEmpleados = sumEmpleados + 1
      }
    }
    this.numEmpleados = sumEmpleados

    //Actividades Totales
    let sumActividades = 0 
    for (let i = 0; i < actividades.length; i++) {
      if(actividades[i].departamento == cookies.getUserDep()){
        sumActividades = sumActividades + 1
      }
    }
    this.actividadesT = sumActividades

    //Meta totales
    let sumMetas = 0 
    for (let i = 0; i < metas.length; i++) {
      if(metas[i].departamento == cookies.getUserDep()){
        sumMetas = sumMetas + 1
      }
    }
    this.metasT = sumMetas

    //Actividades y Metas en el Tiempo
    
    let fechas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let actividadesProductividad = []
    for (let i = 0; i < actividades.length; i++) {
      if(actividades[i].departamento == cookies.getUserDep()){
        actividadesProductividad.push(
        {
          estado: actividades[i].estado,
          fecha: fechas[Number(actividades[i].fechaIni.split('-')[1]) - 1]
        }
      )
      }  
    }

    let metasProductividad = []
    for (let i = 0; i < metas.length; i++) {
      if(metas[i].departamento == cookies.getUserDep()){
        metasProductividad.push(
        {
          estado: metas[i].estado,
          fecha: fechas[Number(metas[i].fechaIni.split('-')[1]) - 1]
        }
      )
      } 
    }

    let dataProductividadActividad = []
    let dataProductividadMeta = []

    for (let i = 0; i < fechas.length; i++) {
        let sumActividades = 0
        let sumMetas = 0
        for (let j = 0; j < actividadesProductividad.length; j++) {
            if(actividadesProductividad[j].fecha == fechas[i]){
              sumActividades = sumActividades + 1
            }
        }
        for (let j = 0; j < metasProductividad.length; j++) {
            if(metasProductividad[j].fecha == fechas[i]){
              sumMetas = sumMetas + 1
            }
        }
        dataProductividadActividad.push(sumActividades)
        dataProductividadMeta.push(sumMetas)
    }

    const ctx = document.getElementById('LineAMTime');
      new Chart(ctx, {
          type: 'line',
          data: {
            labels: fechas,
            datasets: [
              {
              label: 'Actividades',
              data: dataProductividadActividad,
              fill: true,
              borderColor: '#69b7ff',
              tension: 0.1
              },
              {
              label: 'Metas',
              data: dataProductividadMeta,
              fill: true,
              borderColor: '#EBE41B',
              tension: 0.1
              }
            ]
          }
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

        //TOP EMPLEADOS
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
    grid-template-rows: 0.3fr 1fr 1fr ;
    grid-template-areas:
    "topDepartamentos numTopEmpleados actividadesTotales metasTotales"
    "desTiempo desTiempo actividades metas"
    "topEmpleados topEmpleados actividades metas";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #topDepartamentos{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: topDepartamentos;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #numTopEmpleados{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: numTopEmpleados;
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

  #metasTotales{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: metasTotales;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #desTiempo{
    background: #ffffff;
    grid-area: desTiempo;
    border-radius: 20px;
  }

  #actividades{
    background: #ffffff;
    grid-area: actividades;
    border-radius: 20px;
    overflow: hidden;
  }

  #metas{
    background: #ffffff;
    grid-area: metas;
    border-radius: 20px;
    overflow: hidden;
  }

  #topEmpleados{
    background: #ffffff;
    grid-area: topEmpleados;
    border-radius: 20px;
  }

  #metas p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  #actividades p{
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
    grid-template-rows: 0.3fr 0.3fr 1fr 1fr 1fr 1fr; 
    grid-template-areas:
      "topDepartamentos numTopEmpleados"
      "actividadesTotales metasTotales"
      "desTiempo desTiempo"
      "topEmpleados topEmpleados"
      "actividades actividades"
      "metas metas";
  }
}

  </style>
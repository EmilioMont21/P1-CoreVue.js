<template>
    <GerenteHeader/>
    <h1>Mejor Departamento</h1>
    <div class="grid">
        <div id="topDepartamentos">
            <p class="topDepartamentos-titulo">Mejor Departamento</p>
            <p class="topDepartamentos-numero">{{ mejorDP }}</p>
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
            <canvas id="AMTime" ></canvas>
        </div>

        <div id="metas">
          <p>Departamentos</p>
          <div class="chartContainer">
            <canvas id="metasBar" ></canvas>
          </div>

        </div>
        
        <div id="topEmpleados">
            <p>Top Empleados</p>
            <canvas id="topEmpleadosChart" ></canvas>
        </div>
        <div id="actividadesChart">
            <p>Actividades</p>
            <canvas id="pieChartActividades" ></canvas>
        </div>
        <div id="chart">
            <p>Metas</p>
            <canvas id="PieChart" ></canvas>
        </div>
       
    </div>
  </template>
  
<script>

import GerenteHeader from '../components/gerenteHeader.vue'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default{
  name:'GerenteHome',
  components:{
    GerenteHeader
  },
  data(){
    return {
      mejorDP: '',
      numEmpleados: 0,
      actividadesT: 0,
      metasT: 0,
    }
  },
  async created(){

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

    let empleados = []
    const empleadoData = await axios.get('http://localhost/ING_WEB/user.php')
    empleadoData.data.forEach(d => {
      empleados.push(d)
    });

    let departamentos = []

    const departamentoData = await axios.get('http://localhost/ING_WEB/departamento.php')
    departamentoData.data.forEach(d => {
      departamentos.push(d)
    });

    let actividadesDepartamento = []
    for (let i = 0; i < departamentos.length; i++) {
      let sum = 0
      let sumM = 0
      for (let j = 0; j < actividades.length; j++) {
        if(actividades[j].departamento == departamentos[i].IDdepartamento){
          sum = sum + 1
        }
      }
      for (let j = 0; j < metas.length; j++) {
        if(metas[j].departamento == departamentos[i].IDdepartamento){
          sumM = sumM + 1
        }
      }
      actividadesDepartamento.push({
        Departamento: departamentos[i].Nombre,
        idDepartamento: departamentos[i].IDdepartamento,
        Actividades: sum,
        Metas: sumM
      })
    }

    let OrderDataDepartamentos = actividadesDepartamento.sort((y, x) => x.Actividades - y.Actividades)
    
    this.actividadesT = OrderDataDepartamentos[0].Actividades
    this.metasT = OrderDataDepartamentos[0].Metas
    this.mejorDP = OrderDataDepartamentos[0].Departamento

    let sumEmpleados = []
    for (let i = 0; i < empleados.length; i++) {
      if(empleados[i].Departamento == OrderDataDepartamentos[0].idDepartamento){
        sumEmpleados.push(empleados[i].Nombre)
      }
    }

    this.numEmpleados = sumEmpleados.length

    //Actividades y Metas en el Tiempo

    let fechas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let actividadesProductividad = []
    for (let i = 0; i < actividades.length; i++) {
      if(actividades[i].departamento == OrderDataDepartamentos[0].idDepartamento){
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
      if(metas[i].departamento == OrderDataDepartamentos[0].idDepartamento){
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

    const ctx = document.getElementById('AMTime');
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

      let actividadesEmpleado = []
      for (let i = 0; i < empleados.length; i++) {
        let sum = 0
        if(empleados[i].Departamento == OrderDataDepartamentos[0].idDepartamento
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


      let estados = []
      let estadosObj = []
      const estadoData = await axios.get('http://localhost/ING_WEB/estado.php')
      estadoData.data.forEach(d => {
        estados.push(d.estado)
        estadosObj.push(d)
      });

      let dataActividadesMes = []
      for (let i = 0; i < estados.length; i++) {
          let sum = 0
          for (let j = 0; j < actividades.length; j++) {
              if(actividades[j].estado == estadosObj[i].IDestado
                && actividades[j].departamento == OrderDataDepartamentos[0].idDepartamento){
                sum = sum + 1
              }
          }  
          dataActividadesMes.push(sum)
      }

      let dataMetasMes = []
      for (let i = 0; i < estados.length; i++) {
          let sum = 0
          for (let j = 0; j < metas.length; j++) {
              if(metas[j].estado == estadosObj[i].IDestado
              && metas[j].departamento == OrderDataDepartamentos[0].idDepartamento){
                sum = sum + 1
              }
          }  
          dataMetasMes.push(sum)
      }

      //PASTEL METAS
      const ctx3 = document.getElementById('PieChart');
      new Chart(ctx3, {
          type: 'pie',
          data: {
            labels: estados,
            datasets: [{
              data: dataMetasMes,
              backgroundColor: [
                '#ffac40',
                '#ffc374',
                '#ffdfb5'
              ]
            }]
          }
        });

      const ctx4 = document.getElementById('pieChartActividades');
      new Chart(ctx4, {
          type: 'pie',
          data: {
            labels: estados,
            datasets: [{
              data: dataActividadesMes,
              backgroundColor: [
                '#686ef5',
                '#9397f8',
                '#ced0fb'
              ]
            }]
          }
        });


    let dataDepartamentos = []
    for (let i = 0; i < departamentos.length; i++) {
        let sumActividad = 0
        for (let j = 0; j < actividades.length; j++) {
          if(actividades[j].departamento == departamentos[i].IDdepartamento){
            sumActividad = sumActividad + 1
          }
        }
        let sumMeta = 0
        for (let j = 0; j < metas.length; j++) {
          if(metas[j].departamento == departamentos[i].IDdepartamento){
            sumMeta = sumMeta + 1
          }
        }
      
        dataDepartamentos.push({
          departamento: departamentos[i].Nombre,
          actividades: sumActividad,
          metas: sumMeta
        })
    }

    let OrderData = dataDepartamentos.sort((y, x) => x.actividades - y.actividades)

    let orderDepartamento = []
    let orderActividades = []
    let orderMetas = []
    OrderData.forEach(d => {
      orderDepartamento.push(d.departamento)
      orderActividades.push(d.actividades)
      orderMetas.push(d.metas)
    });


      //TOP DEPARTAMENTOS
      const ctx5 = document.getElementById('metasBar');
      let dataDepartamento = {
        labels: orderDepartamento,
        datasets:[
          {
          label: 'Actividades',
          data: orderActividades,
          backgroundColor: '#686ef5'
          },
          {
          label: 'Metas',
          data: orderMetas,
          backgroundColor: '#94D0EF'
          }
        ]  
      }
      new Chart(ctx5, {
          type: 'bar',
          data: dataDepartamento,
          options: {
            indexAxis: 'y',
          }
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
    "desTiempo desTiempo actividadesChart metas"
    "topEmpleados topEmpleados chart metas";
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

  #chart{
    background: #ffffff;
    grid-area: chart;
    border-radius: 20px;
  }

  #actividadesChart{
    background: #ffffff;
    grid-area: actividadesChart;
    border-radius: 20px;
  }

  
  .chartContainer{
    height: 99%;
    overflow: auto;
  }



  @media only screen and (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.3fr 0.3fr 1fr 1fr 1fr 1fr 1fr; 
    grid-template-areas:
      "topDepartamentos numTopEmpleados"
      "actividadesTotales metasTotales"
      "desTiempo desTiempo"
      "topEmpleados topEmpleados"
      "chart chart"
      "actividadesChart actividadesChart"
      "metas metas";
  }
}

  </style>
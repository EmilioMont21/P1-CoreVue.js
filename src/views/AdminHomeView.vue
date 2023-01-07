<template>
  <AdminHeader/>
  <h1>Dashboard Administrador</h1>
  <div class="grid">
    <div id="counterActivities">
      <p class="counterActivities-titulo">Actividades Totales</p>
      <p class="counterActivities-numero">{{actividadesT}}</p>
    </div>
    <div id="counterGoals">
      <p class="counterGoals-titulo">Metas Totales</p>
      <p class="counterGoals-numero">{{metasT}}</p>
    </div>
    <div id="chartActivities">
      <p>Actividades del mes</p>
      <canvas id="pieChartActividades" ></canvas>
    </div>
    <div id="chartGoals">
      <p>Metas del mes</p>
      <canvas id="PieChartMetas" ></canvas>
    </div>
    <div id="chartTotal">
      <p>Productividad</p>
      <canvas id="lineChartProductividad" ></canvas>
    </div>
    <div id="departamentosList">
      <p>Departamentos</p>
      <div class="chartContainer">
        <canvas id="BarChartDepartamentos" ></canvas>
      </div>

    </div>
    <div id="empleadosList">
      <p>Empleados</p>
      <div class="chartContainer">
        <canvas id="BarChartEmpleados" ></canvas>
      </div>

    </div>
  </div>
</template>

<script>
//import cookies from "@/router/cookies";
import axios from 'axios'
import AdminHeader from '../components/adminHeader.vue'
import Chart from 'chart.js/auto'
//import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)



export default{
  name:'AdminHome',
  components:{
    AdminHeader
  },
  data(){
    return {
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

    this.actividadesT = actividades.length
    this.metasT = metas.length

    let fechas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let actividadesProductividad = []
    for (let i = 0; i < actividades.length; i++) {
      actividadesProductividad.push(
        {
          estado: actividades[i].estado,
          fecha: fechas[Number(actividades[i].fechaIni.split('-')[1]) - 1]
        }
      )
    }

    let metasProductividad = []
    for (let i = 0; i < metas.length; i++) {
      metasProductividad.push(
        {
          estado: metas[i].estado,
          fecha: fechas[Number(metas[i].fechaIni.split('-')[1]) - 1]
        }
      )
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

    //LINECHART 
    const ctx = document.getElementById('lineChartProductividad');
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
              borderColor: '#69b7ff',
              tension: 0.1
              }
            ]
          }
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
            if(actividades[j].estado == estadosObj[i].IDestado){
              sum = sum + 1
            }
        }  
        dataActividadesMes.push(sum)
    }

    let dataMetasMes = []
    for (let i = 0; i < estados.length; i++) {
        let sum = 0
        for (let j = 0; j < metas.length; j++) {
            if(metas[j].estado == estadosObj[i].IDestado){
              sum = sum + 1
            }
        }  
        dataMetasMes.push(sum)
    }

    //PASTEL ACTIVIDADES
    const ctx2 = document.getElementById('pieChartActividades');
      new Chart(ctx2, {
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

    //PASTEL METAS
    const ctx3 = document.getElementById('PieChartMetas');
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

    let departamentosObj = []
    const departamentoData = await axios.get('http://localhost/ING_WEB/departamento.php')
      departamentoData.data.forEach(d => {
        departamentosObj.push(d)
    });

    let dataDepartamentos = []
    for (let i = 0; i < departamentosObj.length; i++) {
        let sumActividad = 0
        for (let j = 0; j < actividades.length; j++) {
          if(actividades[j].departamento == departamentosObj[i].IDdepartamento){
            sumActividad = sumActividad + 1
          }
        }
        let sumMeta = 0
        for (let j = 0; j < metas.length; j++) {
          if(metas[j].departamento == departamentosObj[i].IDdepartamento){
            sumMeta = sumMeta + 1
          }
        }
      
        dataDepartamentos.push({
          departamento: departamentosObj[i].Nombre,
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

    //BARRAS DEPARTAMENTOS
    const ctx4 = document.getElementById('BarChartDepartamentos');
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
      new Chart(ctx4, {
          type: 'bar',
          data: dataDepartamento,
          options: {
            indexAxis: 'y',
          }
        });

    let empleadosObj = []
    const empleadoData = await axios.get('http://localhost/ING_WEB/user.php')
    empleadoData.data.forEach(d => {
        empleadosObj.push(d)
    });

    let dataEmpleados = []
    for (let i = 0; i < empleadosObj.length; i++) {
        let sumActividad = 0
        for (let j = 0; j < actividades.length; j++) {
          if(actividades[j].usuario == empleadosObj[i].IDusuario){
            sumActividad = sumActividad + 1
          }
        }
      
        dataEmpleados.push({
          usuario: empleadosObj[i].Nombre + ' ' + empleadosObj[i].Apellido,
          actividades: sumActividad,
        })
    }
    
    let OrderDataEmpleado = dataEmpleados.sort((y, x) => x.actividades - y.actividades)

    let orderEmpleado = []
    let orderActividadesEmpleado = []
    OrderDataEmpleado.forEach(d => {
      orderEmpleado.push(d.usuario)
      orderActividadesEmpleado.push(d.actividades)
    });

      //BARRAS EMPLEADOS
      const ctx5 = document.getElementById('BarChartEmpleados');
      let dataEmpleado = {
        labels: orderEmpleado,
        datasets:[
          {
          label: 'Actividades',
          data: orderActividadesEmpleado,
          borderColor: 'white',
          backgroundColor: '#686ef5'
          }
        ]  
      }
      new Chart(ctx5, {
          type: 'bar',
          data: dataEmpleado,
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
    "counterActivities counterGoals departamentosList empleadosList"
    "chartActivities chartGoals departamentosList empleadosList"
    "chartTotal chartTotal departamentosList empleadosList";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #counterActivities{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: counterActivities;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #counterActivities .counterActivities-titulo{
    text-align: left;
    margin: 15px 0px 0px 15px;
  }

  #counterActivities .counterActivities-numero{
    text-align: right;
    margin: 0px 30px 0px 0px;;
    font-size: 50px;
  }

  #counterGoals{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: counterGoals;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #counterGoals .counterGoals-titulo{
    text-align: left;
    margin: 15px 0px 0px 15px;
  }

  #counterGoals .counterGoals-numero{
    text-align: right;
    margin: 0px 30px 0px 0px;;
    font-size: 50px;
  }

  #chartActivities{
    background: #ffffff;
    grid-area: chartActivities;
    border-radius: 20px;
  }

  #chartGoals{
    background: #ffffff;
    grid-area: chartGoals;
    border-radius: 20px;
  }

  #chartTotal{
    background: #ffffff;
    grid-area: chartTotal;
    border-radius: 20px;
  }

  #departamentosList{
    background: #ffffff;
    grid-area: departamentosList;
    border-radius: 20px;
    overflow: hidden;
  }

  #departamentosList p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  #empleadosList{
    background: #ffffff;
    grid-area: empleadosList;
    border-radius: 20px;
    overflow: hidden;
  }
  
  #empleadosList p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  .chartContainer{
    height: 99%;
    overflow: auto;
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
    grid-template-rows: 2fr 2fr 1fr 1fr 1.5fr;
    grid-template-areas:
      "departamentosList departamentosList"
      "empleadosList empleadosList"
      "counterActivities counterGoals"
      "chartActivities chartGoals"
      "chartTotal chartTotal";
  }
}

</style>
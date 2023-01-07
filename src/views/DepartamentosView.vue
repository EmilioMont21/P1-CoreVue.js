<template>
    <AdminHeader/>
    <h1>Departamentos</h1>
    <div class="grid">
        <div id="list">
            <div class="list-button">
                <button  type="button"  v-on:click="CrearDepartamento()" ><b>Añadir Departamento</b></button>
            </div>
            <div class="list-table-container">
              <div class="list-table">
                  <table id="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="departamento in departamentos" :key="departamento.IDdepartamento">
                            <td>{{departamento.Nombre}}</td>
                            <td>{{departamento.Descripcion}}</td>
                            <td>
                                <router-link :to="{name: 'EditDepartamento',params:{id:departamento.IDdepartamento}}">Editar</router-link> 
                                <button v-on:click="eliminarDepartamento(departamento.IDdepartamento)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                  </table>
              </div>  
            </div>
           
        </div>
        <div id="departamentos">
            <p class="departamentos-titulo">Departamentos totales</p>
            <p class="departamentos-numero">{{departamentosT}}</p>
        </div>
        <div id="promedio">
            <p class="promedio-titulo">Promedio de empleados por departamento</p>
            <p class="promedio-numero">{{promedioDE}}</p>
        </div>
        <div id="chart1">
          <p>Top 5 Departamentos con mas empleados</p>
          <div class="chartContainer">
            <canvas id="BarChartDepartamentosEmpleados" ></canvas>
          </div>
        </div>
        
        <div id="chart2">
          <p>Top 5 Departamentos con mas actividades</p>
          <div class="chartContainer">
            <canvas id="BarChartDepactividades" ></canvas>
          </div>
        </div>
       

    </div>
</template>

<script>
import axios from 'axios'
import AdminHeader from '../components/adminHeader.vue'
import Chart from 'chart.js/auto'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components:{
        AdminHeader
    },
    data(){
        return{
            departamentos:[],
            departamentosT: 0,
            promedioDE: 0,
        }
    },
    methods:{
        CrearDepartamento(){
            window.location.href='createdepartamento'
        },
        //localhost/ING_WEB/php/
        consultarDepartamentos(){
            fetch('http://localhost/ING_WEB/departamento.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.departamentos=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                    this.departamentos=datosRespuesta;
                }
            })
            .catch(console.log)
        },
        eliminarDepartamento(id){
            fetch('http://localhost/ING_WEB/departamento.php?IDdepartamento='+id,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            window.location.href='departamentos'
        }
    },
    
    async created(){
      this.consultarDepartamentos();

      let departamentos = []

      const departamentoData = await axios.get('http://localhost/ING_WEB/departamento.php')
      departamentoData.data.forEach(d => {
        departamentos.push(d)
      });

      this.departamentosT = departamentos.length

      
    let empleadosObj = []
    const empleadoData = await axios.get('http://localhost/ING_WEB/user.php')
    empleadoData.data.forEach(d => {
        empleadosObj.push(d)
    });

    let numEmpleadosDep = []
    for (let i = 0; i < departamentos.length; i++) {
      let sum = 0
      for (let j = 0; j < empleadosObj.length; j++) {
        if(empleadosObj[j].Departamento == departamentos[i].IDdepartamento){
          sum = sum + 1
        }
      }  
      numEmpleadosDep.push(sum)
    }

    let suma = numEmpleadosDep.reduce((a,b) => a + b, 0)
    let promedio = suma / departamentos.length

    this.promedioDE = (promedio).toFixed(1)

    let empleadosDepartamento = []
    for (let i = 0; i < departamentos.length; i++) {
      let sum = 0
      for (let j = 0; j < empleadosObj.length; j++) {
          if(empleadosObj[j].Departamento == departamentos[i].IDdepartamento){
            sum = sum + 1
          }  
      }
      empleadosDepartamento.push({
        Departamento: departamentos[i].Nombre,
        Numero: sum
      })
    }

    let OrderEmpleados = empleadosDepartamento.sort((y, x) => x.Numero - y.Numero)

    let departamentosE = []
    let departamentosNum = []
    for (let i = 0; i < OrderEmpleados.length; i++) {
        if(i < 5){
          departamentosE.push(OrderEmpleados[i].Departamento)
          departamentosNum.push(OrderEmpleados[i].Numero)
        }
    }
         //BARRAS empleados, departamentos
        const ctx1 = document.getElementById('BarChartDepartamentosEmpleados');
        let dataDepartamento = {
          labels: departamentosE,
          datasets:[
            {
            label: 'Empleados',
            data: departamentosNum,
            borderColor: '#686ef5',
            backgroundColor: '#686ef5'
            }
          ]  
        }
        new Chart(ctx1, {
            type: 'bar',
            data: dataDepartamento
          });

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


        let dataDepartamentos = []

        for (let i = 0; i < departamentos.length; i++) {
          let sumActividades = 0
          let sumMetas = 0
          for (let j = 0; j < actividades.length; j++) {
             if(actividades[j].departamento == departamentos[i].IDdepartamento){
              sumActividades = sumActividades + 1
             }
          }
          for (let j = 0; j < metas.length; j++) {
            if(metas[j].departamento == departamentos[i].IDdepartamento){
              sumMetas = sumMetas + 1
             }
          }
          dataDepartamentos.push({
            Departamento: departamentos[i].Nombre,
            Actividades: sumActividades,
            Metas: sumMetas
          })
        }

        let OrderDepartamentos = dataDepartamentos.sort((y, x) => x.Actividades - y.Actividades)

        let departamentosNom = []
        let departamentosA = []
        let departamentosM = []
        for (let i = 0; i < OrderDepartamentos.length; i++) {
            if(i < 5){
              departamentosNom.push(OrderDepartamentos[i].Departamento)
              departamentosA.push(OrderDepartamentos[i].Actividades)
              departamentosM.push(OrderDepartamentos[i].Metas)
            }
        }

        //Departamento con mas actividades
        const ctx2 = document.getElementById('BarChartDepactividades');
        let dataEmpleado = {
          labels: departamentosNom,
          datasets:[
            {
            label: 'Actividades',
            data: departamentosA,
            backgroundColor: '#ffac40'
            },
            {
            label: 'Metas',
            data: departamentosM,
            backgroundColor: '#ffdfb5'
            }
          ]  
        }
        new Chart(ctx2, {
            type: 'bar',
            data: dataEmpleado
          });
    }
    
}
</script>

<style scoped>

.grid{
    margin: 20px;
    display: grid;
    height: 85vh;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 0.3fr 1fr 1fr ;
    grid-template-areas:
    "list departamentos promedio"
    "list chart1 chart1"
    "list chart2 chart2";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #departamentos{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: departamentos;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }
  #departamentos .departamentos-titulo{
    text-align: left;
    margin: 15px 0px 0px 15px;
  }

  #departamentos .departamentos-numero{
    text-align: right;
    margin: 0px 30px 0px 0px;;
    font-size: 50px;
  }

  #promedio {
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: promedio;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }

  #promedio .promedio-titulo{
    text-align: left;
    margin: 15px 0px 0px 15px;
  }

  #promedio .promedio-numero{
    text-align: right;
    margin: 0px 30px 0px 0px;;
    font-size: 50px;
  }

  #chart1{
    background: #ffffff;
    grid-area: chart1;
    border-radius: 20px;
  }

  #chart2{
    background: #ffffff;
    grid-area: chart2;
    border-radius: 20px;
  }
  
  #list{
    background: #ffffff;
    grid-area: list;
    border-radius: 20px;
    overflow: hidden;
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
    grid-template-rows: 2fr 2fr 1fr 1fr 1.5fr;
    grid-template-areas:
      "departamentos-numero promedio-empleados"
      "list list"
      "agregar-departamento agregar-departamento"
      "chart1 chart1"
      "chart2 chart2";
  }
}
</style>
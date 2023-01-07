<template>
 <AdminHeader/>
 <h1>Empleados</h1>
 <div class="grid">
        <div id="list">
            <div class="list-button">
                <button type="button"  v-on:click="CrearUsuario()" ><b>Añadir Usuario</b></button>
            </div>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Mail</th>
                          <th>Rol</th>
                          <th>Departamento</th>
                          <th>Modificar</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="usuario in usuarios" :key="usuario.IDusuario">
                          <td>{{usuario.Nombre}}</td>
                          <td>{{usuario.Apellido}}</td>
                          <td>{{usuario.Mail}}</td>
                          <td>{{usuario.Rol}}</td>
                          <td>{{usuario.Departamento}}</td>
                          <td>
                              <router-link :to="{name: 'EditUser',params:{id:usuario.IDusuario}}">Editar</router-link> 
                              <button v-on:click="eliminarUsuario(usuario.IDusuario)">Eliminar</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div>               
        </div>
        <div id="empleados">
            <p class="empleados-titulo">Empleados totales</p>
            <p class="empleados-numero">{{ empleadosT }}</p>
        </div>
        <div id="promedio">
            <p class="promedio-titulo">Cantidad de supervisores</p>
            <p class="promedio-numero">{{ supervisores }}</p>
        </div>
        <div id="chart1">
          <p>Empleados con mas actividades</p>
          <div class="chartContainer">
            <canvas id="BarChartEmpleadosActividades" ></canvas>
          </div>
        </div>
        <div id="chart2">
          <p>Cantidad de empleados por departamento</p>
          <div class="chartContainer">
            <canvas id="BarChartDepartamentosEmpleados" ></canvas>
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
    data(){
        return{
            usuarios:[],
            empleadosT: 0,
            supervisores: 0
        }
    },
    components:{
        AdminHeader
    },
    methods:{
        CrearUsuario(){
            window.location.href='createuser'
        },
        //localhost/ING_WEB/php/
        consultarUsuarios(){
            fetch('https://vueprojectp2.000webhostapp.com/user.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.usuarios=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                    this.usuarios=datosRespuesta;
                }
            })
            .catch(console.log)
        },
        eliminarUsuario(id){
            fetch('https://vueprojectp2.000webhostapp.com/user.php/?IDusuario='+id,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            window.location.href='usuarios'
        }
    },


    async created(){

      this.consultarUsuarios();

      let departamentos = []

      const departamentoData = await axios.get('https://vueprojectp2.000webhostapp.com/departamento.php')
      departamentoData.data.forEach(d => {
        departamentos.push(d)
      });
      
      let empleadosObj = []
      const empleadoData = await axios.get('https://vueprojectp2.000webhostapp.com/user.php')
      empleadoData.data.forEach(d => {
          empleadosObj.push(d)
      });

      this.empleadosT = empleadosObj.length

      let supervisoresCant = 0
      empleadosObj.forEach(d => {
          if(d.Rol == 2){
            supervisoresCant = supervisoresCant + 1
          }
      });

      this.supervisores = supervisoresCant

      //////

      let actividades = []

      const actividadData = await axios.get('https://vueprojectp2.000webhostapp.com/actividad.php')
      actividadData.data.forEach(d => {
        actividades.push(d)
      });


      let dataEmpleados = []

        for (let i = 0; i < empleadosObj.length; i++) {
          let sumActividades = 0
          for (let j = 0; j < actividades.length; j++) {
             if(actividades[j].usuario == empleadosObj[i].IDusuario){
              sumActividades = sumActividades + 1
             }
          }
          dataEmpleados.push({
            Nombre: empleadosObj[i].Nombre,
            Actividades: sumActividades,
          })
        }

        let OrderEmpleados = dataEmpleados.sort((y, x) => x.Actividades - y.Actividades)

        let departamentosNom = []
        let departamentosA = []
        for (let i = 0; i < OrderEmpleados.length; i++) {
            if(i < 5){
              departamentosNom.push(OrderEmpleados[i].Nombre)
              departamentosA.push(OrderEmpleados[i].Actividades)
            }
        }

      //BARRAS empleados, departamentos
      const ctx1 = document.getElementById('BarChartEmpleadosActividades');
      let dataDepartamento = {
        labels: departamentosNom,
        datasets:[
          {
          label: 'Empleados/Actividades',
          data: departamentosA,
          backgroundColor: '#686ef5'
          }
        ]  
      }
      new Chart(ctx1, {
          type: 'bar',
          data: dataDepartamento
        });

      let cantED = []
      for (let i = 0; i < departamentos.length; i++) {
        let sum = 0
        for (let j = 0; j < empleadosObj.length; j++) {
          if(empleadosObj[j].Departamento == departamentos[i].IDdepartamento){
            sum = sum + 1
          }
        }    
        cantED.push({
          Departamento: departamentos[i].Nombre,
          Usuarios: sum
        })
      }

      let nombreDepartamentos = []
      let usuariosDepartamentos = []
      cantED.forEach(d => {
        nombreDepartamentos.push(d.Departamento)
        usuariosDepartamentos.push(d.Usuarios)
      });
      //Departamento con mas actividades
           const ctx2 = document.getElementById('BarChartDepartamentosEmpleados');
      let dataEmpleado = {
        labels: nombreDepartamentos,
        datasets:[
          {
          label: 'Empleados',
          data: usuariosDepartamentos,
          backgroundColor: 'transparent',
          borderColor: '#94D0EF'
          }
        ]  
      }
      new Chart(ctx2, {
          type: 'radar',
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
    "list empleados promedio"
    "list chart1 chart1"
    "list chart2 chart2";
    grid-gap: 1.2rem;
    color: #000000;
    text-align: center;
  }

  #empleados{
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    grid-area: empleados;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
  }
  #empleados .empleados-titulo{
    text-align: left;
    margin: 15px 0px 0px 15px;
  }

  #empleados .empleados-numero{
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
      "empleados-numero promedio-empleados"
      "list list"
      "agregar-departamento agregar-departamento"
      "chart1 chart1"
      "chart2 chart2";
  }
}
</style>
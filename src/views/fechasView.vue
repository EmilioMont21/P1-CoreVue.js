<template>
    <AdminHeader/>
    <h1>Departamentos</h1>
    <div class="grid">
        <div id="form">
            <p>Seleccione rango de fechas y estado</p>
            <form v-on:submit.prevent="filtrarFecha">
                    <div class="form-labels">
                        <label for="FechaIni"><b>Fecha Inicial</b></label>
                        <input type="date"  v-model="filtro.fechaIni" name="FechaIni" required>
                        
                        <label for="FechaFin"><b>Fecha Final</b></label>
                        <input type="date"  v-model="filtro.fechaFin"  name="FechaFin" required>

                        <label for="Estado"><b>Estado</b></label>
                        <select v-model="filtro.estado" >
                            <option v-for="estado in estados" :key="estado.estado">{{estado}}</option>
                        </select>
                    </div>
                 
                    <div class="botones">
                        <button class="btn-Filtrar" type="submit"><b>Filtrar</b></button>
                    </div>
                </form>
        </div>
        <div id="list">
            <p>Actividades</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="actividad in actividades" :key="actividad.IDactividad">
                          <td>{{actividad.nombre}}</td>
                          <td>{{actividad.descripcion}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div> 
        </div>
        <div id="list2">
            <p>Metas</p>
            <div class="list-table-container">
                <div class="list-table">
                  <table id="table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="meta in metas" :key="meta.IDmetas">
                          <td>{{meta.nombre}}</td>
                          <td>{{meta.descripcion}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
            </div> 
        </div>
        <div id="departamentos">
            <p class="departamentos-titulo">Actividades Totales</p>
            <p class="departamentos-numero">{{actividadT}}</p>
        </div>
        <div id="promedio">
            <p class="promedio-titulo">Metas totales</p>
            <p class="promedio-numero">{{metasT}}</p>
        </div>
       

    </div>
</template>

<script>
//import axios from 'axios'
import AdminHeader from '../components/adminHeader.vue'
import axios from 'axios'

export default {
    components:{
        AdminHeader
    },
    data(){
        return{
            actividadT:0,
            metasT: 0,
            actividades: [],
            metas: [],
            filtro: [],
            estados: ['Completada', 'Cancelada', 'En Curso']
        }
    },
    methods:{
        async filtrarFecha(){

            let preDate = fechita(this.filtro.fechaIni)
            let posDate = fechita(this.filtro.fechaFin)


            let actividades = []


            const actividadData = await axios.get('http://localhost/ING_WEB/actividad.php')
            actividadData.data.forEach(d => {
                actividades.push(d)
            });

            if(this.filtro.estado == 'Completada'){
                this.filtro.estado = 1
            }
            if(this.filtro.estado == 'Cancelada'){
                this.filtro.estado = 2
            }
            if(this.filtro.estado == 'En Curso'){
                this.filtro.estado = 3
            }

            let actividadesEstados = []
            actividades.forEach(d => {
                if(d.estado == this.filtro.estado){
                    actividadesEstados.push(d)
                }
            });


            let filterActividades = actividadesEstados.filter((function(d){
                return fechita(d.fechaIni) > preDate &&  fechita(d.fechaIni) < posDate
            }))

            this.actividadT = filterActividades.length
            this.actividades = filterActividades
            

            // METAS
            let metas = []

            const metaData = await axios.get('http://localhost/ING_WEB/metas.php')
            metaData.data.forEach(d => {
                metas.push(d)
            });

            if(this.filtro.estado == 'Completada'){
                this.filtro.estado = 1
            }
            if(this.filtro.estado == 'Cancelada'){
                this.filtro.estado = 2
            }
            if(this.filtro.estado == 'En Curso'){
                this.filtro.estado = 3
            }

            let metasEstados = []
            metas.forEach(d => {
                if(d.estado == this.filtro.estado){
                    metasEstados.push(d)
                }
            });

            let filterMetas = metasEstados.filter((function(d){
                return fechita(d.fechaIni) > preDate &&  fechita(d.fechaIni) < posDate
            }))

            this.metasT = filterMetas.length
            this.metas = filterMetas
                        

            function fechita(date){
                let fs = date.split('-')
                return new Date(fs[0],fs[1] - 1, fs[2]).getTime()
            }
        }
    }
}
</script>

<style scoped>

.grid{
    margin: 20px;
    display: grid;
    height: 85vh;
    grid-template-columns: 1fr 1fr 2.5fr;
    grid-template-rows: 1fr 1fr ;
    grid-template-areas:
    "form form list"
    "departamentos promedio list2";
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
    height: 100px;
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
    height: 100px;
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

  #form{
    background: #ffffff;
    grid-area: form;
    border-radius: 20px;
    overflow: hidden;
  }

  #form p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgb(70, 136, 211) 0%, rgb(95, 138, 212) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  #list{
    background: #ffffff;
    grid-area: list;
    border-radius: 20px;
    overflow: hidden;
  }

  #list p{
    margin: 0;
    padding: 15px;
    background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
    color: #ffffff;
    font-weight: bold;
  }

  #list2{
    background: #ffffff;
    grid-area: list2;
    border-radius: 20px;
    overflow: hidden;
  }

  #list2 p{
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

  .form-labels{
        margin: 15px;
        text-align: left;
    }

    label{
        color: rgba(81,89,101,1);
        font-size: 15px;
    }

    input{
        width: 100%;
        padding: 12px 20px;
        margin: 3px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
        height: 10px;
    }

    .botones button{
        background: rgb(70, 136, 211);
        color: white;
     border-radius: 10px;
     border: none;
     cursor: pointer;
     width: 50%;
     padding: 10px;
    }
    
    .botones button:hover{
        opacity: 0.8;
    }
    
    select{
         width: 100%;
         padding: 12px 20px;
         margin: 3px 0;
         display: inline-block;
         border: 1px solid #ccc;
         box-sizing: border-box;
         height: 10px;
         color: black;
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
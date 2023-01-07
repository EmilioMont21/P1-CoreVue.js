<template>
    <div class="container">
         <div class="card">
             <div class="card-header">
                 Modificar Meta
             </div>
             <div class="card-body">
                 <form v-on:submit.prevent="editarMeta">
                    <div class="form-labels">
                        <label for="Nombre"><b>Nombre</b></label>
                        <input type="text" placeholder="Ingrese el nombre" v-model="meta.nombre" name="Nombre" required>
                        
                        <label for="Descripcion"><b>Descripcion</b></label>
                        <input type="text" placeholder="Ingrese la descripcion" v-model="meta.descripcion"  name="Apellido" required>

                        <label for="FechaInicio"><b>Fecha inicio</b></label>
                        <input type="date" placeholder="Inicio" v-model="meta.fechaIni"  name="FechaInicio" required>
                        <label for="FechaFin"><b>Fecha Fin</b></label>
                        <input type="date" placeholder="Fin" v-model="meta.fechaFin" name="FechaFin" required>
                    
                        <label for="Estado"><b>Estado</b></label>
                        <select v-model="meta.estado" >
                            <option v-for="estado in estados" :key="estado.estado">{{estado}}</option>
                        </select>
                    </div>
 
                     <div class="botones">
                        <button class="btn-Regresar" type="button"  v-on:click="salirEditarMeta()" ><b>Regresar</b></button>
                         <button class="btn-Editar" type="submit"><b>Modificar</b></button>
                     </div>
 
                 </form>
             </div>
         </div>
     </div>
 </template>
 
 <script>
  import cookies from "@/router/cookies";
 export default {
     data(){
        return{
            meta: {},
            estados: ['Completada', 'Cancelada', 'En Curso'],
            usuario:[]
        }    
     },
    created:function(){
            this.obtenerMeta();
        },
     methods:{
        salirEditarMeta(){
            window.location.href='/midepartamento/'+cookies.getUserDep()
        },
        obtenerMeta(){
            fetch('https://vueprojectp2.000webhostapp.com/metas.php/?IDmetas='+this.$route.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.meta=datosRespuesta[0]; 
            })
            .catch(console.log)
        },
        editarMeta(){

        if(this.meta.estado == 'Completada'){
            this.meta.estado = 1
        }
        if(this.meta.estado == 'Cancelada'){
            this.meta.estado = 2
        }
        if(this.meta.estado == 'En Curso'){
            this.meta.estado = 3
        }

        fetch('https://vueprojectp2.000webhostapp.com/metas.php',{
            method:"PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    IDmetas: this.$route.params.id,
                    nombre: this.meta.nombre,
                    descripcion: this.meta.descripcion,
                    fechaIni: this.meta.fechaIni,
                    departamento: this.meta.departamento,
                    estado: this.meta.estado,
                    fechaFin: this.meta.fechaFin
                })
        })
        .then(request => request.json())
        .then(window.location.href='/midepartamento/'+cookies.getUserDep())
        }
     }
 }
 </script>
 
 <style scoped>
 
     .container{
         text-align: center;
     }
 
     .card{
         margin: 0px auto;
         margin-top: 20px;
         width: 75%;
         background: white;
         border-radius: 10px;
         overflow: hidden;
     }
 
     .card-header{
         background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
         color: white;
         font-weight: bold;
         font-size: 25px;
         padding: 10px;
     }
 
 
     button {
     color: white;
     border: none;
     cursor: pointer;
     width: 50%;
     padding: 10px;
     }
 
     .btn-Editar{
         background-color: #69b7ff;
     }

     .btn-Regresar{
         background-color: rgba(81,89,101,1);
     }
 
     .btn-Cancelar{
         background-color: #ff4949;
     }
 
     button:hover{
     cursor: pointer;
     opacity: 0.8;
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
         margin: 8px 0;
         display: inline-block;
         border: 1px solid #ccc;
         box-sizing: border-box;
     }
 
     select{
         width: 100%;
         padding: 12px 20px;
         margin: 8px 0;
         display: inline-block;
         border: 1px solid #ccc;
         box-sizing: border-box;
     }
 
 
 </style>
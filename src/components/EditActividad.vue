<template>
    <div class="container">
         <div class="card">
             <div class="card-header">
                 Modificar Actividad
             </div>
             <div class="card-body">
                 <form v-on:submit.prevent="editarActividad">
                    <div class="form-labels">
                        <label for="Nombre"><b>Nombre</b></label>
                        <input type="text" placeholder="Ingrese el nombre" v-model="actividad.nombre" name="Nombre" required>
                        
                        <label for="Descripcion"><b>Descripcion</b></label>
                        <input type="text" placeholder="Ingrese la descripcion" v-model="actividad.descripcion" name="Apellido" required>

                        <label for="FechaInicio"><b>Fecha inicio</b></label>
                        <input type="date" placeholder="Inicio" v-model="actividad.fechaIni" name="FechaInicio" required>
                        <label for="FechaFin"><b>Fecha Fin</b></label>
                        <input type="date" placeholder="Fin" v-model="actividad.fechaFin"  name="FechaFin" required>

                        <label for="Usuario"><b>Usuario</b></label>
                        <select v-model="actividad.usuario" >
                            <option v-for="usuario in usuarios" :key="usuario.usuario">{{usuario}}</option>
                        </select>

                        <label for="Estado"><b>Estado</b></label>
                        <select v-model="actividad.estado" >
                            <option v-for="estado in estados" :key="estado.estado">{{estado}}</option>
                        </select>
                    </div>
 
                     <div class="botones">
                        <button class="btn-Regresar" type="button"  v-on:click="salirEditarActividad()" ><b>Regresar</b></button>
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
            actividad: {},
            usuario:[],
            usuarios:[],
            estados: ['Completada', 'Cancelada', 'En Curso']
        }
       
     },
     created:function(){
        this.obtenerActividad();
        this.obtenerUsuarios();
    },
     methods:{
        salirEditarActividad(){
            window.location.href='/midepartamento/'+cookies.getUserDep()
        },
        obtenerActividad(){
            fetch('https://vueprojectp2.000webhostapp.com/actividad.php/?IDactividad='+this.$route.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.actividad=datosRespuesta[0]; 
            })
            .catch(console.log)
        },
        obtenerUsuarios(){
            fetch('https://vueprojectp2.000webhostapp.com/user.php?Departamento='+cookies.getUserDep())
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                for (let i = 0; i < datosRespuesta.length; i++) {
                    if(datosRespuesta[i].Rol == 3){
                        this.usuario.push(datosRespuesta[i])
                        this.usuarios.push(datosRespuesta[i].Mail)
                    }          
                }
            })
            .catch(console.log)
        },
        editarActividad(){

            if(this.actividad.estado == 'Completada'){
                this.actividad.estado = 1
            }
            if(this.actividad.estado == 'Cancelada'){
                this.actividad.estado = 2
            }
            if(this.actividad.estado == 'En Curso'){
                this.actividad.estado = 3
            }

            this.usuario.forEach(d => {
                if(d.Mail == this.actividad.usuario){
                    this.actividad.usuario = d.IDusuario
                }
            });

            fetch('https://vueprojectp2.000webhostapp.com/actividad.php',{
                method:"PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        IDactividad: this.$route.params.id,
                        nombre: this.actividad.nombre,
                        descripcion: this.actividad.descripcion,
                        fechaIni: this.actividad.fechaIni,
                        departamento: this.actividad.departamento,
                        usuario: this.actividad.usuario,
                        estado: this.actividad.estado,
                        fechaFin: this.actividad.fechaFin
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
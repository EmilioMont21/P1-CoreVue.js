<template>
    <div class="container">
         <div class="card">
             <div class="card-header">
                 Editar Departamento
             </div>
             <div class="card-body">
                 <form v-on:submit.prevent="editarDepartamento">
                     <label for="Nombre"><b>Nombre</b></label>
                     <input type="text" placeholder="Ingrese el nombre" v-model="departamento.Nombre" name="Nombre" required>
                     
                     <label for="Apellido"><b>Descripcion</b></label>
                     <input type="text" placeholder="Ingrese la descripcion" v-model="departamento.Descripcion"  name="Descripcion" required>

                     <button type="button"  v-on:click="salirEditarDepartamento()" class="cancelarDescripcion"><b>Cancelar</b></button>
                     <button type="submit"><b>Editar</b></button>
 
                 </form>
             </div>
         </div>
     </div>
 </template>
 
 <script>
 export default {
     data(){
         return{
             departamento:{}
         }
     },
     created:function(){
         this.obtenerDepartamento();
     },
     methods:{
         obtenerDepartamento(){
             fetch('http://localhost/ING_WEB/departamento.php/?IDdepartamento='+this.$route.params.id)
             .then(respuesta=>respuesta.json())
             .then((datosRespuesta)=>{
                 this.departamento=datosRespuesta[0]; 
             })
             .catch(console.log)
         },
         salirEditarDepartamento(){
             window.location.href='../departamentos'
         },
 
         editarDepartamento(){
             fetch('http://localhost/ING_WEB/departamento.php',{
                 method:"PUT",
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({
                         IDdepartamento: this.departamento.IDdepartamento,
                         Nombre: this.departamento.Nombre,
                         Descripcion: this.departamento.Descripcion
                     })
             })
             .then(request => request.json())
             .then(window.location.href='../departamentos')
         }
     }
 }
 </script>
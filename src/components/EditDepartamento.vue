<template>
    <div class="container">
         <div class="card">
             <div class="card-header">
                 Editar Departamento
             </div>
             <div class="card-body">
                 <form v-on:submit.prevent="editarDepartamento">
                    <div class="form-labels">
                        <label for="Nombre"><b>Nombre</b></label>
                        <input type="text" placeholder="Ingrese el nombre" v-model="departamento.Nombre" name="Nombre" required>
                        
                        <label for="Apellido"><b>Descripcion</b></label>
                        <input  type="text" placeholder="Ingrese la descripcion" v-model="departamento.Descripcion"  name="Descripcion" required>
                    </div>
                  
                     <div class="botones">
                        <button class="btn-Cancelar" type="button" v-on:click="salirEditarDepartamento()" ><b>Cancelar</b></button>
                        <button class="btn-Editar" type="submit"><b>Editar</b></button>
                     </div>
             
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


</style>
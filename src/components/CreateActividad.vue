<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Agregar nueva actividad
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarActividad">
                    <div class="form-labels">
                        <label for="Nombre"><b>Titulo</b></label>
                        <input type="text" placeholder="Ingrese el titulo" v-model="actividad.nombre" name="Nombre" required>
                        
                        <label for="Descripcion"><b>Descripcion</b></label>
                        <input type="text" placeholder="Ingrese la descripcion" v-model="actividad.descripcion"  name="Apellido" required>

                        <label for="FechaInicio"><b>Fecha inicio</b></label>
                        <input type="date" v-model="actividad.fechaIni" />
              
                        <label for="FechaFin"><b>Fecha Fin</b></label>
                        <input type="date" v-model="actividad.fechaFin" />

                        <label for="Usuario"><b>Usuario</b></label>
                        <select v-model="actividad.usuario" >
                            <option v-for="usuario in usuarios" :key="usuario.usuario">{{usuario}}</option>
                        </select>
                    </div>
                 
                    <div class="botones">
                        <button class="btn-Regresar" type="button"  v-on:click="salirCrearDepartamento()" ><b>Regresar</b></button>
                        <button class="btn-Agregar" type="submit"><b>Agregar</b></button>
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
            usuario:[],
            usuarios:[],
            actividad:{}
        }
    },
    created:function(){
        this.obtenerUsuarios();
    },
    methods:{
        obtenerUsuarios(){
            fetch('https://vueprojectp2.000webhostapp.com/user.php?Departamento='+this.$route.params.id)
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
        salirCrearDepartamento(){
            window.location.href='/midepartamento/'+this.$route.params.id
        },

        agregarActividad(){

            for (let i = 0; i < this.usuario.length; i++) {
                if(this.actividad.usuario == this.usuario[i].Mail){
                    this.actividad.usuario =this.usuario[i].IDusuario
                }    
            }

            var datosEnviar={
                nombre: this.actividad.nombre,
                descripcion: this.actividad.descripcion,
                fechaIni: this.actividad.fechaIni,
                departamento: this.$route.params.id,
                usuario: this.actividad.usuario,
                estado: 3,
                fechaFin: this.actividad.fechaFin,
            }

            fetch('https://vueprojectp2.000webhostapp.com/actividad.php',{
                method:"POST",
                body:JSON.stringify(datosEnviar)
            })
            .then(window.location.href='/midepartamento/'+this.$route.params.id)

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

    .btn-Agregar{
        background-color: #04AA6D;
    }

    .btn-Regresar{
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
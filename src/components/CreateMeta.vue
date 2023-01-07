<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Agregar nueva meta
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarMeta">
                    <div class="form-labels">
                        <label for="Titulo"><b>Titulo</b></label>
                        <input type="text" placeholder="Ingrese el titulo" v-model="meta.nombre" name="Titulo" required>
                        
                        <label for="Descripcion"><b>Descripcion</b></label>
                        <input type="text" placeholder="Ingrese la descripcion" v-model="meta.descripcion"  name="Descripcion" required>

                        <label for="FechaInicio"><b>Fecha inicio</b></label>
                        <input type="date" v-model="meta.fechaIni" />

                        <label for="FechaFin"><b>Fecha Fin</b></label>
                        <input type="date" v-model="meta.fechaFin" />

                    </div>
                 
                    <div class="botones">
                        <button class="btn-Regresar" type="button"  v-on:click="salirCrearMeta()" ><b>Regresar</b></button>
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
            meta:{}
        }
    },
    methods:{
        salirCrearMeta(){
            window.location.href='/midepartamento/2'
        },

        agregarMeta(){
            var datosEnviar={
                nombre: this.meta.nombre,
                descripcion: this.meta.descripcion,  
                departamento: this.$route.params.id,
                fechaIni: this.meta.fechaIni,
                estado: 3,
                fechaFin: this.meta.fechaFin,
            }

            fetch('http://localhost/ING_WEB/metas.php',{
                method:"POST",
                body:JSON.stringify(datosEnviar)
            })
            .then(window.location.href='/midepartamento/2')
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



</style>
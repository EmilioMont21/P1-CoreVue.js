<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Agregar nuevo Departamento
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarDepartamento">
                    <label for="Nombre"><b>Nombre</b></label>
                    <input type="text" placeholder="Ingrese el nombre" v-model="departamento.Nombre" name="Nombre" required>
                    
                    <label for="Descripcion"><b>Descripcion</b></label>
                    <input type="text" placeholder="Ingrese la descripcion" v-model="departamento.Descripcion"  name="Apellido" required>

                    <button type="button"  v-on:click="salirCrearDepartamento()" class="cancelarDepartamento"><b>Cancelar</b></button>
                    <button type="submit"><b>Crear</b></button>

                </form>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return{
            departamento:{

            }
        }
    },
    methods:{
        salirCrearDepartamento(){
            window.location.href='departamentos'
        },

        agregarDepartamento(){
            var datosEnviar={
                Nombre: this.departamento.Nombre,
                Descripcion: this.departamento.Descripcion,
            }

            fetch('http://localhost/ING_WEB/departamento.php',{
                method:"POST",
                body:JSON.stringify(datosEnviar)
            })
            .then(window.location.href='departamentos')
        }
    }
}
</script>
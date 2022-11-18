<template>
   <div class="container">
        <div class="card">
            <div class="card-header">
                Editar Usuario
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="editarUsuario">
                    <label for="Nombre"><b>Nombre</b></label>
                    <input type="text" placeholder="Ingrese el nombre" v-model="usuario.Nombre" name="Nombre" required>
                    
                    <label for="Apellido"><b>Apellido</b></label>
                    <input type="text" placeholder="Ingrese el apellido" v-model="usuario.Apellido"  name="Apellido" required>

                    <label for="Mail"><b>Mail</b></label>
                    <input type="text" placeholder="Ingrese el correo" v-model="usuario.Mail" name="Mail" required>

                    <label for="Password"><b>Contraseña</b></label>
                    <input type="password" placeholder="Ingrese la contraseña" v-model="usuario.Password" name="Password" required>

                    <label for="Foto"><b>Foto</b></label>
                    <input type="text" placeholder="Foto" v-model="usuario.Foto" name="Foto" required>

                    <label for="Rol"><b>Rol</b></label>
                    <input type="number" placeholder="Ingrese el Rol" v-model="usuario.Rol" name="Rol" required>

                    <label for="Departamento"><b>Departamento</b></label>
                    <input type="number" placeholder="Ingrese el Departamento" v-model="usuario.Departamento" name="Departamento">

                    <button type="button"  v-on:click="salirEditarUsuario()" class="cancelarUsuario"><b>Cancelar</b></button>
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
            usuario:{}
        }
    },
    created:function(){
        this.obtenerUsuario();
    },
    methods:{
        obtenerUsuario(){
            fetch('http://localhost/ING_WEB/user.php/?IDusuario='+this.$route.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.usuario=datosRespuesta[0]; 
            })
            .catch(console.log)
        },
        salirEditarUsuario(){
            window.location.href='../usuarios'
        },

        editarUsuario(){
            fetch('http://localhost/ING_WEB/user.php',{
                method:"PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        IDusuario: this.usuario.IDusuario,
                        Nombre: this.usuario.Nombre,
                        Apellido: this.usuario.Apellido,
                        Mail: this.usuario.Mail,
                        Password: this.usuario.Password,
                        Foto: this.usuario.Foto,
                        Rol: this.usuario.Rol,
                        Departamento: this.usuario.Departamento
                    })
            })
            .then(request => request.json())
            .then(window.location.href='../usuarios')
        }
    }
}
</script>
<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/usuarios">Usuarios</router-link> |
        <router-link to="/departamentos">Departamentos</router-link> 
    </nav>
    <div class="grid-usuarios">
        <div class="usuario lista"> 
            <table class="tableUsuario">
                <thead>
                    <tr >
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>Password</th>
                        <th>Foto</th>
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
                        <td>{{usuario.Password}}</td>
                        <td>{{usuario.Foto}}</td>
                        <td>{{usuario.Rol}}</td>
                        <td>{{usuario.Departamento}}</td>
                        <td>
                            <router-link :to="{name: 'EditUser',params:{id:usuario.IDusuario}}">Editar</router-link> 
                            <button v-on:click="eliminarUsuario(usuario.IDusuario)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button"  v-on:click="CrearUsuario()" ><b>Añadir Usuario</b></button>

        </div>
        <div class="usuario top">

        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            usuarios:[]
        }
    },
    created:function(){
        this.consultarUsuarios();
    },
    methods:{
        CrearUsuario(){
            window.location.href='createuser'
        },
        //localhost/ING_WEB/php/
        consultarUsuarios(){
            fetch('http://localhost/ING_WEB/user.php')
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
            fetch('http://localhost/ING_WEB/user.php/?IDusuario='+id,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            window.location.href='usuarios'
        }
    }
}
</script>

<style scoped>
    .grid-usuarios{
        display: grid;
        grid-template-columns: auto auto;
        width: 99%;
        margin: 0 auto;
        border: 1px solid black;
    }

    .usuario{
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    line-height: 150px;
    }

    .tableUsuario{
        width: 100%;
        height: 100%;
    }

    .tableUsuario tr:nth-child(even){background-color: #f2f2f2;}

    .tableUsuario tr:hover {background-color: #ddd;}

    .tableUsuario th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
    }

    .headerUsuario{
        height: 10px;
    }
</style>
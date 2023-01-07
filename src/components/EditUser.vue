<template>
   <div class="container">
        <div class="card">
            <div class="card-header">
                Editar Usuario
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="editarUsuario">
                    <div class="form-labels">
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
                        <select v-model="usuario.Rol" >
                            <option v-for="rol in roles" :key="rol.Rol">{{rol}}</option>
                        </select>
    
                        <label for="Departamento"><b>Departamento</b></label>
                        <select v-model="usuario.Departamento">
                            <option v-for="departamento in departamentos" :key="departamento.Rol">{{departamento}}</option>
                        </select>

                    </div>

                    <div class="botones">
                        <button class="btn-Cancelar" type="button"  v-on:click="salirEditarUsuario()" ><b>Cancelar</b></button>
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
            usuario:{},
            roles:['Supervisor', 'Empleado'],
            departamentos:[],
            departamentosTable:{}
        }
    },
    created:function(){
        this.consultarDepartamentos();
        this.obtenerUsuario();
    },
    methods:{
        obtenerUsuario(){
            fetch('https://vueprojectp2.000webhostapp.com/user.php/?IDusuario='+this.$route.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.usuario=datosRespuesta[0]; 
                if(this.usuario.Rol == "2"){
                    this.usuario.Rol = "Supervisor"
                }
                if(this.usuario.Rol == "3"){
                    this.usuario.Rol = "Empleado"
                }

                for (let i = 0; i < this.departamentosTable.length; i++) {
                    if(this.usuario.Departamento == this.departamentosTable[i].IDdepartamento){
                        this.usuario.Departamento = this.departamentosTable[i].Nombre
                    }
                }
            })
            .catch(console.log)
        },
        salirEditarUsuario(){
            window.location.href='../usuarios'
        },

        editarUsuario(){
            if(this.usuario.Rol == "Supervisor"){
                this.usuario.Rol  = "2"
            }else{
                this.usuario.Rol  = "3"
            }

            for (let i = 0; i < this.departamentosTable.length; i++) {
                if(this.usuario.Departamento == this.departamentosTable[i].Nombre){
                    this.usuario.Departamento = this.departamentosTable[i].IDdepartamento
                }
            }

            fetch('https://vueprojectp2.000webhostapp.com/user.php',{
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
        },

        consultarDepartamentos(){
            fetch('https://vueprojectp2.000webhostapp.com/departamento.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                if(typeof datosRespuesta[0].success==='undefined'){ 
                    this.departamentosTable = datosRespuesta   
                    for (let i = 0; i < datosRespuesta.length; i++) {
                        this.departamentos.push(datosRespuesta[i].Nombre)
                    }
                }
            })
            .catch(console.log)

        },
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

    select{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }


</style>
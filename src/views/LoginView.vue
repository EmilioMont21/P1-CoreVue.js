<template>

  <div class="login">
    <h1 class="title">Inicia Sesion</h1>
    <form class="form" @submit.prevent="login">
      <div class="imgcontainer">
        <img src="../images/undraw_analytics_re_dkf8.svg" alt="Avatar" class="avatar">
      </div>
      <label class="form-label" for="#email">Email:</label>
      <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email">
      <label class="form-label" for="#password">Password:</label>
      <input v-model="password" class="form-input" type="password" id="password" placeholder="Password">
      <p v-if="error" class="error">Los datos ingresados no son correctos</p>
      <input class="form-submit" type="submit" value="Login">
    </form>
  </div>

 
</template>

<script>

import cookies from "@/router/cookies";

  export default {
    data: () => ({
      email: "",
      password: "",
      error: false
    }),

    methods: {
      
    login() {
        fetch('http://localhost/ING_WEB/user.php?Mail=' +this.email+ ' &Password='+this.password )
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                 if(datosRespuesta != ""){
                    cookies.setUserLogged(datosRespuesta[0].Mail)
                    cookies.setUserRol(datosRespuesta[0].Rol)
                    cookies.setUserDep(datosRespuesta[0].Departamento)
                    cookies.setUserId(datosRespuesta[0].IDusuario)

                    if(datosRespuesta[0].Rol == 1){
                      this.$router.push("/")
                    }
                    if(datosRespuesta[0].Rol == 2){
                      this.$router.push("/gerentehome")
                    }
                    if(datosRespuesta[0].Rol == 3){
                      this.$router.push("/empleado/"+datosRespuesta[0].Departamento)
                    } 
                 }else{
                  this.error = true;
                 }
            })
      }
    }

  };
</script>

<style scoped>

.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: linear-gradient(67deg, rgba(81,89,101,1) 0%, rgba(101,108,120,1) 100%);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}
.form-submit {
  background: #686ef5;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}

.form-submit:hover{
  text-align: center;
  background: #4e53b8;
}

.imgcontainer{
  text-align: center;
}

img{
  width: 350px;
}
</style>

<template>
  <div class="main-container">

    <div class="left-container">
      <div class="imgcontainer">
        <img src="../images/undraw_analytics_re_dkf8.svg" alt="Avatar" class="avatar">
      </div>
    </div>

    <div class="right-container">
      <form >
        <h2>Iniciar Sesion</h2>
        <div class="container">
          <label for="Mail"><b>Correo</b></label>
          <input type="text" placeholder="Ingrese su correo" name="Mail" required>

          <label for="Password"><b>Contraseña</b></label>
          <input type="password" placeholder="Ingrese su contraseña" name="Password" required>

          <button type="submit"><b>Login</b></button>
        </div>
      </form>
    </div>
  </div>
 
</template>

<style>
body{
  background-image: linear-gradient(135deg, #ffffff 10%, #f1f1f1 100%);
  font-family: "Open Sans", sans-serif;
  width: 100%;
  height: 100%;
  position: relative;
}

  
.main-container{
  margin: auto;
  width: 1000px;
  background: #FFFFFF;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 0 20px 2px #74747485;
}

@media (max-width: 980px) {
  .main-container{
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
    width: 90%;
  }
}

.main-container div {
  height: auto;
}

.main-container .left-container{
  margin: auto;
  overflow: hidden;
}

.main-container .left-container .imgcontainer{
  padding: 10px;
}

.main-container .left-container .imgcontainer img{
  margin: auto;
  width: 500px;
}

.main-container .right-container{
  padding: 40px;
  overflow: hidden;
}

@media (max-width: 980px) {
  .main-container .right-container {
    width: 100%;
  }
}

.main-container .right-container h2{
  font-size: 50px;
  line-height: 0;
}

@media (max-width: 980px) {
  .main-container .right-container h2 {
    font-size: 2rem;
    width: 100%;
  }
}

.main-container .right-container .container{
  overflow: hidden;
}

.main-container .right-container .container input{
  width: 100%;
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}

.main-container .right-container .container button{
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
  padding: 12px 35px;
  border-radius: 50px;
  display: inline-block;
  border: 0;
  outline: 0;
  cursor: pointer;
  background-image: linear-gradient(135deg, #6C63FF 10%, #5b54db 100%);
}

button:hover{
  background-image: linear-gradient(135deg, #010102 10%, #5b54db 100%);
}

</style>

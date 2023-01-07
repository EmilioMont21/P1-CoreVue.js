<template>
    <nav>
        <button type="button"  v-on:click="deleteUserLogged()" ><b>Logout</b></button>
        <router-link to="/usuarios">Empleados</router-link> 
        <router-link to="/departamentos">Departamentos</router-link> 
        <router-link to="/fechas">Fechas</router-link> 
        <router-link to="/">Home</router-link> 
    </nav>
</template>

<script>
import Cookies from "js-cookie";

export default {
    name:'AdminHeader',

    methods: {
        deleteUserLogged() {
            Cookies.remove('userLogged');
            Cookies.remove('userRol');
            Cookies.remove('userDep');
            Cookies.remove('userId');
            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>
    nav{
        background-color: #ffffff;
        overflow: hidden;
    }

    nav a{
        float: right;
        padding: 14px 16px;
        text-align: center;
        font-size: 17px;
        text-decoration: none;
        color: rgb(73, 72, 72);
        font-weight: bold;
    }

    button{
        cursor: pointer;
        border-color: transparent;
        background-color: #ffffff;
        float: right;
        padding: 14px 16px;
        text-align: center;
        font-size: 17px;
        text-decoration: none;
        color: rgb(73, 72, 72);
        font-weight: bold;
    }

    button :hover{
        color: rgb(212, 101, 101);
    }
</style>

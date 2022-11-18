<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/usuarios">Usuarios</router-link> |
        <router-link to="/departamentos">Departamentos</router-link> 
    </nav>
    <div class="grid-departamentos">
        <div class="departamento lista"> 
            <table class="tableDepartamento">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="departamento in departamentos" :key="departamento.IDdepartamento">
                        <td>{{departamento.Nombre}}</td>
                        <td>{{departamento.Descripcion}}</td>
                        <td>
                            <router-link :to="{name: 'EditDepartamento',params:{id:departamento.IDdepartamento}}">Editar</router-link> 
                            <button v-on:click="eliminarDepartamento(departamento.IDdepartamento)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button"  v-on:click="CrearDepartamento()" ><b>Añadir Departamento</b></button>
        </div>
        <div class="departamento top">
            
        </div>
    </div>
    
</template>
<script>

var metas= [
    {metas: 1, departamento: 1},
    {metas: 2, departamento: 2},
    {metas: 3, departamento: 3},
    {metas: 4, departamento: 1},
    {metas: 5, departamento: 2},
    {metas: 6, departamento: 4},
];

let depar = []
for (let i = 0; i < metas.length; i++) {
    depar.push(metas[i].departamento)
}
let deparNoRe = depar.filter((item,index)=>{
    return depar.indexOf(item) === index;
  })

  let contador = []


for (let i = 0; i < deparNoRe.length; i++) {
    let valor = 0
   for (let j = 0; j < metas.length; j++) {
        if(deparNoRe[i] == metas[j].departamento){
            valor = valor + 1        
        }
   } 
   contador.push({
            departamento: deparNoRe[i],
            valor: valor
    })
}


export default {
    data(){
        return{
            contador,
            departamentos:[]
        }
    },
    created:function(){
        this.consultarDepartamentos();
    },
    methods:{
        CrearDepartamento(){
            window.location.href='createdepartamento'
        },
        //localhost/ING_WEB/php/
        consultarDepartamentos(){
            fetch('http://localhost/ING_WEB/departamento.php')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.departamentos=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                    this.departamentos=datosRespuesta;
                }
            })
            .catch(console.log)
        },
        eliminarDepartamento(id){
            fetch('http://localhost/ING_WEB/departamento.php?IDdepartamento='+id,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            window.location.href='departamentos'
        }
    }
}
</script>

<style scoped>
    .grid-departamentos{
        display: grid;
        grid-template-columns: auto auto;
        width: 99%;
        margin: 0 auto;
        border: 1px solid black;
    }

    .departamento{
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    line-height: 150px;
    }

    .tableDepartamento{
        width: 100%;
        height: 100%;
    }

    .tableDepartamento tr:nth-child(even){background-color: #f2f2f2;}

    .tableDepartamento tr:hover {background-color: #ddd;}

    .tableDepartamento th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
    }

    .headerDepartamento{
        height: 10px;
    }
</style>
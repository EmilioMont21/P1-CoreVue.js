<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/usuarios">Usuarios</router-link> |
    <router-link to="/departamentos">Departamentos</router-link> 
  </nav>

  <div class="grid">
    <div class="caja c1">
      <BarChart class="bar"/>
    </div>
    <div class="caja c2">
      Caja 2
    </div>
    <div class="caja c3">
      Caja 3
    </div>
    <div class="caja c4">
      Caja 4
    </div>
    <div class="caja c5">
      Caja 5
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'BarChartComponent',
  components: {
    BarChart
  }
}
</script>

<style >

  .grid{
    display: grid;
    grid-template-columns: 40% 30% 30%;
    grid-template-rows: auto;
    width: 95%;
    margin: 0 auto;
    border: 1px solid black;
  }

  .caja{
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    line-height: 150px;
  }

  .c1{
    grid-column: 1/3;
  }
</style>
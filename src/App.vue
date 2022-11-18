<template>
  <router-view/>
</template>

<style>
#app {
  background-image: linear-gradient(135deg, #ffffff 10%, #f1f1f1 100%);
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #6C63FF;
}
</style>

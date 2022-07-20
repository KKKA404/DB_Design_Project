<template>
  <div id="app">
    <CheckDonationRecord />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CheckDonationRecord from './views/CheckDonationRecord.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    CheckDonationRecord,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

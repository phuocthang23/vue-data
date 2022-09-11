<template>
  <dataTable v-bind:list="list" />
</template>

<script>

import dataTable from './components/dataTable.vue';
export default {
  name: 'App',
  components: {
    dataTable,
  },
  data() {
    return {
      list: [
        { id:1, age: 21, first_name: "Larsen", last_name: "Shaw", salary: 2000000 },
        { id:2, age: 89, first_name: "Geneva", last_name: "Wilson",salary: 3000000,},
        { id:3, age: 40, first_name: "Dickerson", last_name: "Macdonald", salary: 1000000,},
        { id:4, age: 38, first_name: "Jami", last_name: "Carney", salary: 4000000 },
        { id:5, age: 23, first_name: "kami", last_name: "sama", salary: 5000000 },
        { id:6, age: 27, first_name: "nami", last_name: "osaka", salary: 6000000 },
        { id:7, age: 38, first_name: "Jami", last_name: "jame", salary: 7000000 },
        { id:8, age: 45, first_name: "Jame", last_name: "Carney", salary: 8000000 },
        { id:9, age: 19, first_name: "ami", last_name: "Carney", salary: 9000000 },
      ],
    }
  },
}
</script>

<style>

</style>

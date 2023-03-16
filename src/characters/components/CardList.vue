<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';

  breakingBadApi.get('/quotes').then((resp) =>{
    console.log(resp.data)
  });
</script>

<template>
  <ul>
    <li>Hola</li>
    <li>Hola</li>
    <li>Hola</li>
  </ul>
</template>

<style scoped>
</style>

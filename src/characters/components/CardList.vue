<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { RickAndMorty } from '@/characters/interfaces/character';

rickAndMortyApi.get<RickAndMorty>('/character').then((resp) =>{
    console.log(resp.data.results)
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

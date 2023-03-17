<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Character } from '../interfaces/character';

const route = useRoute();
const { id} = route.params as { id: string };


</script>

<template>
  <div>
    <h1>Character {{ id }}</h1>
    <!--
    <div>
      <h1>{{ character.name }}</h1>
      <img :src="character.image" :alt="character.name" >
    </div>
    -->
  </div>
</template>

<style scoped>
</style>

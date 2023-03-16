<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { RickAndMorty } from '@/characters/interfaces/character';
import { useCharacters } from '../composables/useCharacters';

const { characters, isLoading, hasError, errorMessage } = useCharacters();


</script>

<template>
  <h1 v-if="isLoading">Loading ....</h1>
  <h1 v-if="hasError">Error: {{ errorMessage }}</h1>
  <ul>
    <li v-for="character of characters">{{ character.name }}</li>
  </ul>
</template>

<style scoped></style>

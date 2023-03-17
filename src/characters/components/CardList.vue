<script setup lang="ts">
import CharacterCard from '@/characters/components/CharacterCard.vue';
import { useQuery } from '@tanstack/vue-query';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, RickAndMorty } from '@/characters/interfaces/character';


const getCharactersSlow = async(): Promise<Character[]> => {
  const { data} = await rickAndMortyApi.get<RickAndMorty>('/character');
  return data.results;
}

const { isLoading, isError, data: characters, error } = useQuery(
  ['characters'],
  getCharactersSlow,
  {
    cacheTime: 1000 * 60, // cache for a 1 minute time
    refetchOnReconnect: 'always',
  }
);

</script>

<template>
  <h1 v-if="isLoading">Loading ....</h1>
  <h1 v-if="isError">Error: {{ error }}</h1>
  <div class="card-list">
    <CharacterCard
      v-for="character of characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

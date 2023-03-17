<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue';
import type { Character, RickAndMorty } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import { useQuery } from '@tanstack/vue-query';

const props = defineProps<{ title: string, visible: boolean }>()

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await rickAndMortyApi.get<RickAndMorty>('/character');
  return data.results;
}

const { isLoading, isError, data: characters, error } = useQuery(
  ['characters'],
  getCharacters
);

</script>

<template>
  <div>
    <h1 v-if="isLoading">Loading ....</h1>
    <template v-else>
      <h2>{{ props.title }}</h2>
      <h1 v-if="isError">Error: {{ error }}</h1>
      <CardList v-if="characters" :characters="characters" />
    </template>
  </div>
</template>

<style scoped></style>

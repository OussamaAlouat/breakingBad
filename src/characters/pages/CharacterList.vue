<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue';
import characterStore from '@/store/characters.store';

import type { Character, RickAndMorty } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import { useQuery } from '@tanstack/vue-query';
import axios, { isAxiosError } from 'axios';

const props = defineProps<{ title: string, visible: boolean }>()

const getCharactersCacheFirst = async (): Promise<Character[]> => {
  if (characterStore.characters.count > 0) {
    return characterStore.characters.list;
  }

  const { data } = await rickAndMortyApi.get<RickAndMorty>('/character');
  return data.results;

}

useQuery(
  ['characters'],
  getCharactersCacheFirst,
  {
    onSuccess(data: Character[]) {
      characterStore.loadedCharacters(data);
    },
    onError(error) {
      if (isAxiosError(error)) {
        characterStore.loadedCharactersFailed(error.message);
      } else {
        characterStore.loadedCharactersFailed(JSON.stringify(error));
      }
    }
  }
);




</script>

<template>
  <div>
    <h1 v-if="characterStore.characters.isLoading">Loading ....</h1>
    <template v-else>
      <h2>{{ props.title }}</h2>
      <h1 v-if="characterStore.characters.hasError">Error: {{ characterStore.characters.errorMessage }}</h1>
      <CardList :characters="characterStore.characters.list" />
    </template>
  </div>
</template>

<style scoped></style>

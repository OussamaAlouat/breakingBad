<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import { isAxiosError } from 'axios';
import { useRoute } from 'vue-router';
import type { Character, RickAndMorty } from '../interfaces/character';

const route = useRoute();
const { id} = route.params as { id: string };

const getCharacterCacheFirst = async() => {
  if (characterStore.checkIdInStore(id)) {
    return characterStore.ids.list[id];
  }

  const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
  return data;
}

useQuery(
  ['character'],
  getCharacterCacheFirst,
  {
    onSuccess(data: Character) {
      characterStore.loadedCharacter(data);
    },
    onError(error) {
      if (isAxiosError(error)) {
        characterStore.loadedCharacterFailed(error.message);
      } else {
        characterStore.loadedCharacterFailed(JSON.stringify(error));
      }
    }
  }
);

</script>

<template>
  <div>
    <h1 v-if="characterStore.ids.isLoading">Loading ....</h1>
    <h1 v-else>Character information</h1>
    <div v-if="characterStore.checkIdInStore(id)" class="character">
      <img :src="characterStore.ids.list[id].image" :alt="characterStore.ids.list[id].name">
      <div class="character__description">
        <p>Name: {{ characterStore.ids.list[id].name }}</p>
        <p>Species: {{ characterStore.ids.list[id].species }}</p>
        <p>Gender: {{ characterStore.ids.list[id].gender }}</p>
        <p>Status: {{ characterStore.ids.list[id].status }}</p>
        <p>Origin: {{ characterStore.ids.list[id].origin }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character {
  display: flex;
}

.character__description {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

img {
  border-radius: 10px;
}
</style>

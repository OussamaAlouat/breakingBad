<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';

const route = useRoute();
const router = useRouter();
const { id} = route.params as { id: string };
const { isLoading, character, errorMessage, hasError } = useCharacter(id);

watch((isLoading), () => {
  if(!isLoading.value && hasError.value) {
    router.replace('/characters');
  }
});

</script>

<template>
  <div>
    <h1 v-if="isLoading">Loading ....</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>
    <h1 v-else>Character information</h1>
    <div v-if="character" class="character">
      <img :src="character.image" :alt="character.name">
      <div class="character__description">
        <p>Name: {{ character.name }}</p>
        <p>Species: {{ character.species }}</p>
        <p>Gender: {{ character.gender }}</p>
        <p>Status: {{ character.status }}</p>
        <p>Origin: {{ character.origin }}</p>
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
  order: 1px solid black;
  padding: 5px;
  background: antiquewhite;
  border-radius: 10px;
  box-shadow: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

img {
  border-radius: 10px;
}
</style>

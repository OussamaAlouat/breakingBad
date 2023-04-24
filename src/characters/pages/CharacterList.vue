<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue';
import useCharacters from '@/characters/composables/userCharacters';

const props = defineProps<{ title: string, visible: boolean }>()

const { isLoading, characters, errorMessage, hasError, count } = useCharacters();

</script>

<template>
  <div>
    <h1 v-if="isLoading">Loading ....</h1>
    <template v-else>
      <h2>{{ props.title }} - {{ count }}</h2>
      <h1 v-if="hasError">Error: {{ errorMessage }}</h1>
      <CardList :characters="characters" />
    </template>
  </div>
</template>

<style scoped></style>

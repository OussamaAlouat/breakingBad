<script setup lang="ts">
import CharacterCard from '@/characters/components/CharacterCard.vue';
import type { Character } from '@/characters/interfaces/character';

const props = defineProps<{ characters: Character[] }>()
</script>

<template>
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

<script setup lang="ts">
  const props = 
  withDefaults(defineProps<Props>(), {
    tittle: 'hello',
  });


  interface Props {
    tittle: string,
  }
</script>

<template>
  <nav>
    <img src="@/assets/logo.svg" alt="Vue logo" height="25" width="25" />
    <span>{{ tittle }}</span>

    <RouterLink :to="{name: 'home'}">Inicio</RouterLink>
    <RouterLink :to="{name: 'about'}">Sobre</RouterLink>

  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
}

img {
  margin-right: 5px;
}

span {
  margin-right: 10px;
}

a {
  margin-right: 5px;
}
</style>

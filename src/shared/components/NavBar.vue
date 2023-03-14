<script setup lang="ts">
  import type { RouterLink } from '@/router/link-routes';

  const props = 
  withDefaults(defineProps<Props>(), {
    title: 'hello',
  });


  interface Props {
    title: string,
    links: RouterLink []
  }
</script>

<template>
  <nav>
    <img src="@/assets/logo.svg" alt="Vue logo" height="25" width="25" />
    <span>{{ title }}</span>

    <RouterLink 
      v-for="link of links"
      :key="link.name"
      :to="link.path"
    >
      {{ link.title }}
    </RouterLink>

    <!--
    <RouterLink :to="{name: 'home'}">Inicio</RouterLink>
    <RouterLink :to="{name: 'about'}">Sobre</RouterLink>
    -->

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

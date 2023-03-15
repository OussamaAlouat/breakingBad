<script setup lang="ts">
import NavBar from '@/shared/components/NavBar.vue';
import type { RouterLink } from '@/router/link-routes';
import { RouterView } from 'vue-router';
import { characterRoute } from '../router'

const routeLinks: RouterLink[] = characterRoute.children!
  .filter(route => (route.props as { visible: boolean }).visible)
  .map((route => {
    return {
      name: route.name as string,
      path: route.path,
      title: (route.props as { title: string, visible: boolean }).title
    }
  }));
</script>

<template>
  <h1>Personajes</h1>
  <!--NavBar-->
  <NavBar :show-icon="false" :links="routeLinks" />
  <!--Routerview + suspense-->
  <RouterView />
</template>

<style scoped></style>

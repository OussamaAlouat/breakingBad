<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/shared/components/NavBar.vue';
import { routerLinks } from '@/router/link-routes';
</script>

<template>
  <div class="wrapper">
    <header>
      <NavBar 
        title="Breakingbad"
        :links="routerLinks"
        />
      <!--Navbar-->
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>

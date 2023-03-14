import { characterRoute } from '@/characters/router';
import AboutPage from '@/shared/pages/AboutPage.vue';
import HomePage from '@/shared/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public
    { path: '/', name: 'home', component: HomePage  },
    { path: '/about', name: 'about', component: AboutPage  },
    // characters
    {
      ...characterRoute,
      path: '/characters'
    },
    //Default
    {
      path: '/:pathMatch(.*)*' ,redirect: () => ({  name: 'home'  }) 
    }
  ],
});

export default router;
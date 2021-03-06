<template>
  <v-app app>
    <SideBar></SideBar>

    <v-main>
      <button v-if="updateExists" @click="refreshApp">Update</button>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import update from './mixins/update';

export default {
  name: 'App',
  components: {
    SideBar,
  },
  mixins: [update],
  data: () => ({
    blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',
  }),
};
</script>

<template>
  <v-app>
    <SideBar></SideBar>

    <v-main>
      <NetworkStatusBanner></NetworkStatusBanner>

      <button v-if="updateExists" @click="refreshApp">Update</button>

      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import NetworkStatusBanner from '@/components/NetworkStatusBanner.vue';
import update from './mixins/update';

export default {
  name: 'App',
  components: {
    NetworkStatusBanner,
    SideBar,
  },
  mixins: [update],
  data: () => ({
    blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',
  }),
};
</script>

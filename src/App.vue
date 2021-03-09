<template>
  <v-app app>
    <SideBar></SideBar>

    <v-main>

      <v-offline
        @detected-condition="onlineState"
      >
        <template v-slot:[onlineSlot] :slot-name="onlineSlot">
          ( Online: {{ onLine }} )
        </template>
        <template v-slot:[offlineSlot] :slot-name="offlineSlot">
          ( Online: {{ online }} )
        </template>
      </v-offline>
      <button v-if="updateExists" @click="refreshApp">Update</button>

      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import VOffline from 'v-offline';
import SideBar from '@/components/SideBar.vue';
import update from './mixins/update';

export default {
  name: 'App',
  components: {
    VOffline,
    SideBar,
  },
  mixins: [update],
  data: () => ({
    blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',
    onLine: false,
    onlineSlot: 'online',
    offlineSlot: 'offline',
  }),
  methods: {
    onlineState(e) {
      this.onLine = e;
    },
  },
};
</script>

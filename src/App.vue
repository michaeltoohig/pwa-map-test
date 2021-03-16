<template>
  <v-app>
    <SideBar></SideBar>

    <v-main>
      <v-alert
        v-if="updateExists"
        type="primary"
        style="position: absolute; z-index: 4000;"
      >
        <v-row align="center">
          <v-col class="grow">
            New Updates Available.
          </v-col>
          <v-col class="shrink" @click="refreshApp">
            <v-btn>Update Now!</v-btn>
          </v-col>
        </v-row>
      </v-alert>

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
};
</script>

<template>
  <v-app>
    <SideBar></SideBar>

    <div
      style="position: absolute; z-index: 3001; width: 100%;"
    >
      <v-row>
        <v-col justify="center">
          <v-alert
            v-if="updateExists"
            class="mx-auto mt-4"
            max-width="450"
            type="info"
            dark
            prominent
            transition="scale-transition"
          >
            <v-row align="center">
              <v-col class="grow">
                New Updates Available.
              </v-col>
              <v-col class="shrink">
                <v-btn @click="refreshApp">Update Now!</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
    </div>

    <v-main>
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

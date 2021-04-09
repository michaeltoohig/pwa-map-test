<template>
  <v-app>
    <SideBar></SideBar>
    <v-main>
      <div
        style="position: absolute; z-index: 3001; width: 100%;"
      >
        <v-row class="mt-2 mx-0">
          <v-col justify="center">
            <v-alert
              v-if="noServiceWorker"
              class="mx-auto"
              max-width="600"
              type="warning"
              dark
              :prominent="!$vuetify.breakpoint.xsOnly"
              transition="scale-transition"
              dismissible
            >
              <div class="title">
                Some Features Not Available.
              </div>
              <div>
                Your browser does not support
                <a
                  target="_blank"
                  href="https://developers.google.com/web/fundamentals/primers/service-workers"
                >Service Workers</a>
                so many features of this app will not work as
                intended and it will be slower.
                Please consider using a more modern
                web browser.
              </div>
            </v-alert>

            <v-alert
              v-if="updateExists"
              class="mx-auto"
              max-width="450"
              type="info"
              dark
              :prominent="!$vuetify.breakpoint.xsOnly"
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

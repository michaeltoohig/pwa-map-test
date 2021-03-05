<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'About' }"
      >
        About
      </v-btn>

      <v-btn
        :to="{ name: 'Home' }"
      >
        Home
      </v-btn>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <h3>v9</h3>
      <button v-if="updateExists" @click="refreshApp">Update</button>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import update from './mixins/update';

export default {
  name: 'App',
  mixins: [update],
  data: () => ({
    blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',
  }),
};
</script>

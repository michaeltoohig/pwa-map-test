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
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="update-dialog" v-if="prompt">
        <div class="update-dialog__content">
          A new version is found. Refresh to load it?
        </div>
        <div class="update-dialog__actions">
          <button
            class="update-dialog__button update-dialog__button--confirm"
            @click="update"
          >
            Update
          </button>
          <button
            class="update-dialog__button update-dialog__button--cancel"
            @click="prompt = false"
          >
            Cancel
          </button>
        </div>
      </div>

      <button
        id="refresh-button"
        v-if="updateExists"
        @click="refreshApp"
      >
        <i class="fa fa-refresh"></i> Click to update!
      </button>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    showMessage: true,
    blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',

    prompt: false,
    // refresh variables
    refreshing: false,
    registration: null,
    updateExists: false,
  }),

  methods: {
    // hideMessage() {
    //   this.showMessage = false;
    // },
    // showRefreshUI(e) {
    //   this.registration = e.detail;
    //   this.updateExists = true;
    // },
    // refreshApp() {
    //   this.updateExists = false;
    //   if (!this.registration || !this.registration.waiting) return;
    //   // send message to SW to skip the waiting and activate the new SW
    //   this.registration.waiting.postMessage('skipWaiting');
    // },
    // New workbox-window example
    async accept() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: 'SKIP_WAITING' });
    },
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.showUpdateUI = true;
      });
    }

    // Old version without using workbox-window
    // // ---
    // // Custom code to let user update the app
    // // when a new service worker is available
    // // ---
    // document.addEventListener('swUpdated', this.showRefreshUI, { once: true });

    // navigator.serviceWorker.addEventListener('controllerchange', () => {
    //   if (this.refreshing) return;
    //   this.refreshing = true;
    //   // Here the actual reload of the page occurs
    //   window.location.reload();
    // });
  },
};
</script>

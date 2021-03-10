<template>
  <div>
    <v-banner
      :value="isOffline"
      single-line
      color="info"
      @click:icon="alert"
      min-width="100%"
      transition="slide-y-transition"
      style="position: absolute; z-index: 7001;"
    >
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
        mdi-wifi-strength-alert-outline
      </v-icon>
      Internet Connection Lost.
      <template v-slot:actions="{ dismiss }">
        <v-btn
          text
          color="primary"
          @click="dismiss"
        >
          Dismiss
        </v-btn>
        <v-btn
          color="primary"
          text
        >
          Learn More
        </v-btn>
      </template>
    </v-banner>
    <v-banner
      v-model="onlineBanner"
      single-line
      transition="slide-y-transition"
      style="position: absolute; z-index: 3001;"
    >
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
        mdi-wifi-strength-4
      </v-icon>
      Internet Connection Restored
    </v-banner>
  </div>
</template>

<script>
import { VueOfflineMixin } from 'vue-offline';

export default {
  name: 'NetworkStatusBanner',
  mixins: [VueOfflineMixin],
  data() {
    return {
      onlineBanner: false,
    };
  },
  watch: {
    isOffline(newValue) {
      if (newValue) {
        this.onlineBanner = false;
      }
    },
    isOnline(newValue) {
      console.log(this.isOnline, this.isOffline);
      if (newValue) {
        this.onlineBanner = true;
        setTimeout(() => {
          this.onlineBanner = false;
        }, 3000);
      }
    },
  },
  methods: {
    alert() {
      alert('bad internet');
    },
  },
};
</script>

<style>

</style>

<template>
  <div>
    <v-banner
      v-model="isOffline"
      single-line
      @click:icon="alert"
      transition="slide-y-transition"
    >
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
        mdi-wifi-strength-alert-outline
      </v-icon>
      Internet Connection Lost

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
  mounted() {
    window.addEventListener('load', () => {
      console.log(this.isOnline, this.isOffline);
    });
  },
};
</script>

<style>

</style>

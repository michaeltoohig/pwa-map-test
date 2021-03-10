<template>
  <transition name="slide-y-transition">
    <v-system-bar
      v-if="isOffline"
      class="d-flex justify-center"
      color="danger"
      style="position: absolute; z-index: 3001;"
    >
      <v-icon
        color="warning"
      >
        mdi-wifi-strength-alert-outline
      </v-icon>
      Internet Connection Lost
    </v-system-bar>
  </transition>
</template>

<script>
import { VueOfflineMixin } from 'vue-offline';

export default {
  name: 'NetworkStatusSystemBar',
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
        // TODO after false -> true transition set a new success color
        // and notice of "back online" with setTimeout to remove it
      }
    },
    isOnline(newValue) {
      if (newValue) {
        this.onlineBanner = true;
        setTimeout(() => {
          this.onlineBanner = false;
        }, 3000);
      }
    },
  },
};
</script>

<style>

</style>

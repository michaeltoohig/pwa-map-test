<template>
  <v-bottom-sheet
    v-model="show"
    persistent
    scrollable
    :fullscreen="fullscreen || $vuetify.breakpoint.smAndDown"
    max-height="70vh"
  >
    <v-card>
      <v-card-title>
        <h2 class="display-1">{{ selectedNakamal.name }}</h2>
        <v-spacer></v-spacer>
        <v-btn icon @click="setShowDetails(false)">
        <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-3">
        <div>
          Owner: {{ selectedNakamal.ownerName || '-' }}
          Contact: {{ selectedNakamal.ownerContact || '-' }}
          Tags: {{ selectedNakamal.tags || '-' }}
          Light: {{ selectedNakamal.light || '-' }}
          Extras: {{ selectedNakamal.extras || '-' }}
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-1"
          text
          @click="setShowDetails(false)"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>

</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'NakamalBottomSheet',
  data() {
    return {
      fullscreen: false,
    };
  },
  computed: {
    ...mapGetters({
      show: 'map/showDetails',
      selectedNakamal: 'nakamal/selected',
    }),
  },
  methods: {
    ...mapActions(
      'map', [
        'setShowDetails',
      ],
    ),
  },
};
</script>

<style>

</style>

<template>
  <v-bottom-sheet
    v-model="show"
    scrollable
    :fullscreen="fullscreen || $vuetify.breakpoint.smAndDown"
    max-height="70vh"
  >
    <v-card>
      <v-card-title>{{ selectedNakamal.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="py-10">
          {{ selectedNakamal }}
        </div>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="1000px"
        ></v-img>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="setShowDetails(false)"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="setShowDetails(false)"
        >
          Save
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

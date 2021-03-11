<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <l-marker
        v-if="show"
        :lat-lng="center"
        :icon="icon"
      >
        <l-tooltip :options="{
          permanent: true,
          interactive: true,
          direction: 'top',
          offset: [0, -40]
        }">
          <v-btn
            x-small
            text
            v-bind="attrs"
            v-on="on"
          >
            Add New Kava Bar
          </v-btn>
        </l-tooltip>
      </l-marker>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Kava Bar</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Latitude"
                type="text"
                disabled
                required
                :value="center.lat"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                label="Longitude"
                type="text"
                disabled
                required
                :value="center.lng"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="[
                  'Food',
                  'Alcohol',
                  'TV',
                  'Games',
                ]"
                label="Extras"
                multiple
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="[
                  'White',
                  'Red',
                  'Orange',
                  'Yellow',
                  'Green',
                  'Blue',
                  'Purple',
                  'Pink',
                  'Other',
                ]"
                label="Light Colour"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import {
  icon,
} from 'leaflet';
import {
  LMarker, LTooltip,
} from 'vue2-leaflet';

const iconPath = require('../assets/map-marker.svg');

export default {
  name: 'NewNakamalDialog',
  components: {
    LMarker,
    LTooltip,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      icon: icon({
        iconUrl: iconPath,
        iconSize: [54, 44],
        iconAnchor: [16, 40],
      }),
    };
  },
  computed: {
    ...mapGetters({
      center: 'map/center',
    }),
  },
  methods: {
    submit() {
      console.log('Submit');
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>

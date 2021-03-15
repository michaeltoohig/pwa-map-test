/* eslint-disable */

<template>
  <v-container
    fluid
    id="map-wrapper"
    class="pa-0"
  >
    <l-map
      style="z-index: 0;"
      ref="map"
      :zoom="zoom"
      :center="center"
      :bounds="bounds"
      :max-bounds="maxBounds"
      :min-zoom="minZoom"
      :options="mapOptions"
      @update:bounds="setBounds"
      @update:center="setCenter"
      @update:zoom="setZoom"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        @tileloadstart="mapTileLoading += 1"
        @tileload="mapTileLoaded += 1"
        @loading="mapLoading = true"
        @load="tileLoadComplete"
      />

      <NewNakamalDialog
        :show="newNakamalMarker"
      ></NewNakamalDialog>

      <Vue2LeafletMarkerCluster></Vue2LeafletMarkerCluster>
      <l-marker
        v-for="nakamal in nakamals"
        :key="nakamal.id"
        :icon="icon"
        :lat-lng="nakamal.latLng"
        @click="markerClick(nakamal.id)"
      >
        <l-popup :options="{ offset: popupOffset }">
          <h3 class="mb-2 font-weight-bold">{{ nakamal.name }}</h3>
          <ul class="mb-2 font-weight-light">
            <li>Owner: {{ nakamal.ownerName || '-' }}</li>
            <li>Number: {{ nakamal.ownerContact || '-' }}</li>
          </ul>
          <v-btn small block outlined color="primary" @click="bottomSheet = true">Details</v-btn>
        </l-popup>
      </l-marker>

      <l-control
        :position="'bottomright'"
        class="fab--example"
      >
        <v-btn
          color="secondary"
          fab
          dark
          bottom
          left
          class="mr-2"
          @click="newNakamalMarker = !newNakamalMarker"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          color="primary"
          fab
          dark
          bottom
          left
          @click="searchDialog = !searchDialog"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-dialog
          v-model="searchDialog"
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                Search
              </v-toolbar>
              <v-card-text>
                <v-autocomplete
                  :items="nakamals"
                  :filter="customFilter"
                  outlined
                  color="white"
                  item-value="id"
                  item-text="name"
                  label="Kava Bars"
                  class="mt-2"
                  @change="searchSelect"
                >
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-avatar>
                        <img :src="data.item.images.small">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.ownerName"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </l-control>
    </l-map>

    <v-progress-linear
      :active="mapLoading"
      v-model="tilesLoadingPercent"
      color="primary"
      absolute
      top
    ></v-progress-linear>

    <v-bottom-sheet
      v-model="bottomSheet"
      hide-overlay
      inset
    >
      <v-sheet
        class="text-center"
        max-height="60vh"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="bottomSheet = !bottomSheet"
        >
          close
        </v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled
          by v-model instead of activator
        </div>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
      </v-sheet>
    </v-bottom-sheet>

  </v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  icon, latLngBounds, point,
} from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup, LControl,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import NewNakamalDialog from '@/components/NewNakamalDialog.vue';

const iconPath = require('../assets/map-marker.svg');

export default {
  name: 'NakamalMap',
  components: {
    NewNakamalDialog,
    Vue2LeafletMarkerCluster,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl,
  },
  data() {
    return {
      newNakamalMarker: false,
      // zoom: 18,
      // center: latLng(-17.741526, 168.312024),
      // bounds: latLngBounds([
      //   [-17.667, 168.21],
      //   [-17.830, 168.47],
      // ]),
      minZoom: 12,
      maxBounds: latLngBounds([
        [-17.627, 168.11],
        [-17.830, 168.47],
      ]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // withPopup: latLng(-17.751526, 168.2421994),
      // withTooltip: latLng(-17.748758, 168.308369),
      // currentZoom: 18,
      // currentCenter: latLng(-17.741526, 168.312024),
      mapOptions: {
        zoomSnap: 0.5,
      },
      popupOffset: point(0, -30),
      icon: icon({
        iconUrl: iconPath,
        iconSize: [54, 44],
        iconAnchor: [16, 40],
      }),
      // Loading bar variables
      mapLoading: false,
      mapTileLoading: 0,
      mapTileLoaded: 0,
      // Bottom sheet
      bottomSheet: false,
      searchDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      bounds: 'map/bounds',
      center: 'map/center',
      zoom: 'map/zoom',
      nakamals: 'nakamal/list',
    }),
    tilesLoadingPercent() {
      if (!this.mapLoading) return 100;
      return Math.round((this.mapTileLoaded / this.mapTileLoading) * 100);
    },
  },
  methods: {
    customFilter(item, queryText) {
      const title = item.title.toLowerCase();
      const owner = item.ownerName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return title.indexOf(searchText) > -1 || owner.indexOf(searchText) > -1;
    },
    searchSelect(item) {
      console.log('selected', item);
      const nakamal = this.nakamals.find((n) => n.id === item);
      this.flyTo({ latlng: nakamal.latLng, zoom: 18 });
      this.searchDialog = false;
    },
    ...mapActions('map', [
      'setBounds',
      'setCenter',
      'setZoom',
    ]),
    flyTo({ latlng, zoom }) {
      this.$refs.map.mapObject.flyTo(latlng, zoom);
    },
    markerClick(id) {
      const nakamal = this.nakamals.find((n) => n.id === id);
      this.flyTo({ latlng: nakamal.latLng, zoom: 18 });
    },
    tileLoadComplete() {
      setTimeout(() => {
        this.mapLoading = false;
        this.mapTileLoading = 0;
        this.mapTileLoaded = 0;
      }, 500);
    },
    // zoomUpdate(zoom) {
    //   this.currentZoom = zoom;
    // },
    // centerUpdate(center) {
    //   this.currentCenter = center;
    // },
    // boundsUpdate(bounds) {
    //   console.log('setting bounds');
    //   console.log(bounds);
    //   this.$store.dispatch('map/setBounds', bounds);
    // },
  },
  created() {
    this.$store.dispatch('nakamal/load');
    this.$root.$on('fly-to', this.flyTo);
  },
};
</script>

<style scoped>
#map-wrapper {
  width: 100%;
  height: 100vh;
}
.example-custom-control > .v-card {
  z-index: 2000;
}
#map-wrapper > .v-progress {
  z-index: 2000;
}
</style>

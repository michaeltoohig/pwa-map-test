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
      v-if="showMap"
      :zoom="zoom"
      :min-zoom="minZoom"
      :center="center"
      :bounds="bounds"
      :max-bounds="maxBounds"
      :options="mapOptions"
      @update:bounds="setBounds"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        @tileloadstart="mapTileLoading += 1"
        @tileload="mapTileLoaded += 1"
        @loading="mapLoading = true"
        @load="tileLoadComplete"
      />

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
              <li>Contact: John Frum</li>
              <li>Number: 7444332</li>
            </ul>
            <v-btn small block outlined color="primary" @click="bottomSheet = true">Details</v-btn>
          </l-popup>
        </l-marker>

      <l-control
        :position="'bottomleft'"
        class="example-custom-control"
      >
        <v-card
          width="400"
          mr-3
          mt-3
        >
          <v-card-text>
            <p>Center: {{ currentCenter }} zoom: {{ currentZoom }} bounds: {{ bounds }}</p>
          </v-card-text>
        </v-card>
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
  icon, latLng, latLngBounds, point,
} from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup, LControl,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';

const iconPath = require('../assets/map-marker.svg');

export default {
  name: 'Map',
  components: {
    Vue2LeafletMarkerCluster,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl,
  },
  data() {
    return {
      zoom: 14.5,
      minZoom: 12,
      center: latLng(-17.741526, 168.312024),
      bounds: latLngBounds([
        [-17.667, 168.21],
        [-17.830, 168.47],
      ]),
      maxBounds: latLngBounds([
        [-17.627, 168.11],
        [-17.830, 168.47],
      ]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-17.751526, 168.2421994),
      withTooltip: latLng(-17.748758, 168.308369),
      currentZoom: 14.5,
      currentCenter: latLng(-17.741526, 168.312024),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
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
    };
  },
  computed: {
    ...mapGetters({
      nakamals: 'nakamal/list',
    }),
    tilesLoadingPercent() {
      if (!this.mapLoading) return 100;
      return Math.round((this.mapTileLoaded / this.mapTileLoading) * 100);
    },
  },
  methods: {
    ...mapActions('map', [
      'setBounds',
    ]),
    flyTo({ latlng, zoom }) {
      console.log(latlng, zoom);
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
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    // boundsUpdate(bounds) {
    //   console.log('setting bounds');
    //   console.log(bounds);
    //   this.$store.dispatch('map/setBounds', bounds);
    // },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      console.log('Click!');
    },
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
  height: calc(100vh - 64px);
}
.example-custom-control > .v-card {
  z-index: 2000;
}
#map-wrapper > .v-progress {
  z-index: 2000;
}
</style>

/* eslint-disable */

<template>
  <v-container
    fluid
    id="map-wrapper"
    class="pa-0"
  >
    <vl-map
      ref="map"
      map-projection="EPSG:4326"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      style=""
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-layer-vector id="points" render-mode="image" :visible="visibleLayer === 'points'">
        <vl-source-vector :features="features"></vl-source-vector>
      </vl-layer-vector>

      <vl-interaction-select :features.sync="selectedFeatures" />

      <vl-overlay
        v-for="feature in selectedFeatures"
        :key="feature.id"
        :id="'popup-' + feature.id"
        :position="findPointOnSurface(feature)"
      >
        <div>
          ID {{ feature.id }}<br>
          Name {{ feature.properties.name }}
        </div>
      </vl-overlay>

    </vl-map>

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

    <BoundedNakamals />

  </v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import pointOnFeature from '@turf/point-on-feature';
import BoundedNakamals from '@/components/BoundedNakamals.vue';

const iconPath = require('../assets/map-marker.svg');

export default {
  name: 'Map',
  components: {
    BoundedNakamals,
  },
  data() {
    return {
      selectedFeatures: [],
      currentZoom: 14.5,
      minZoom: 12,
      zoom: 14,
      center: [parseFloat(168.312024), parseFloat(-17.741526)],
      rotation: 0,
      // bounds: latLngBounds([
      //   [-17.667, 168.21],
      //   [-17.830, 168.47],
      // ]),
      // maxBounds: latLngBounds([
      //   [-17.667, 168.21],
      //   [-17.830, 168.47],
      // ]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // currentCenter: latLng(-17.741526, 168.312024),
      // mapOptions: {
      //   zoomSnap: 0.5,
      // },
      // popupOffset: point(0, -30),
      iconSrc: iconPath,
      // icon: icon({
      //   iconUrl: iconPath,
      //   iconSize: [54, 44],
      //   iconAnchor: [16, 40],
      // }),
      // Loading bar variables
      mapLoading: false,
      mapTileLoading: 0,
      mapTileLoaded: 0,
      // Bottom sheet
      bottomSheet: false,
    };
  },
  computed: {
    visibleLayer() {
      return 'points';
    },
    ...mapGetters({
      nakamals: 'nakamal/list',
    }),
    features() {
      return this.nakamals.map((n) => ({
        type: 'Feature',
        id: n.id,
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(n.lng), parseFloat(n.lat)],
        },
        properties: {
          name: n.name,
        },
      }));
    },
    tilesLoadingPercent() {
      if (!this.mapLoading) return 100;
      return Math.round((this.mapTileLoaded / this.mapTileLoading) * 100);
    },
  },
  methods: {
    findPointOnSurface(feature) {
      const point = pointOnFeature(feature);

      return point.geometry.coordinates;
    },
    ...mapActions('map', [
      'setBounds',
    ]),
    flyTo({ latlng, zoom }) {
      console.log(latlng, zoom);
      this.$refs.map.mapObject.flyTo(latlng, zoom);
    },
    markerClick(id) {
      const nakamal = this.nakamals.find((n) => n.id === id);
      this.flyTo({ latlng: nakamal.latLng, zoom: 16 });
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

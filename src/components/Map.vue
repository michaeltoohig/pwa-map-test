<template>
  <v-container
    id="map-wrapper"
    class="pa-0"
  >
      <l-map
        style="z-index: 0;"
        v-if="showMap"
        :zoom="zoom"
        :min-zoom="minZoom"
        :center="center"
        :bounds="bounds"
        :max-bounds="maxBounds"
        :options="mapOptions"
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
              <p>Center: {{ currentCenter }} zoom: {{ currentZoom }}</p>
            </v-card-text>
          </v-card>
        </l-control>

        <l-marker :lat-lng="withPopup">
          <l-popup>
            <div @click="innerClick">
              I am a popup
              <p v-show="showParagraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                Donec finibus semper metus id malesuada.
              </p>
            </div>
          </l-popup>
        </l-marker>
        <l-marker :lat-lng="withTooltip">
          <l-tooltip :options="{ permanent: true, interactive: true }">
            <div @click="innerClick">
              I am a tooltip
              <p v-show="showParagraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                Donec finibus semper metus id malesuada.
              </p>
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>

      <v-progress-linear
        :active="mapLoading"
        v-model="tilesLoadingPercent"
        color="deep-purple accent-4"
      ></v-progress-linear>
  </v-container>
</template>

<script>
import {
  latLng, latLngBounds,
} from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup, LTooltip, LControl,
} from 'vue2-leaflet';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
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
        [-17.667, 168.21],
        [-17.830, 168.47],
      ]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-17.751526, 168.2421994),
      withTooltip: latLng(-17.741821, 168.320009),
      currentZoom: 14.5,
      currentCenter: latLng(-17.741526, 168.312024),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      // Loading bar variables
      mapLoading: false,
      mapTileLoading: 0,
      mapTileLoaded: 0,
    };
  },
  computed: {
    tilesLoadingPercent() {
      if (!this.mapLoading) return 100;
      return Math.round((this.mapTileLoaded / this.mapTileLoading) * 100);
    },
  },
  methods: {
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
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      console.log('Click!');
    },
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
</style>

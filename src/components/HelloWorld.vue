<template>
  <v-container>
    <div style="height: 500px; width: 100%">
      <div style="height: 200px overflow: auto;">
        <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
        <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
        <button @click="showLongText">
          Toggle long popup
        </button>
        <button @click="showMap = !showMap">
          Toggle map
        </button>
      </div>
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
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
      {{ mapLoading }} {{ tilesLoadingPercent }}

    </div>
  </v-container>
</template>

<script>
import {
  latLng,
} from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup, LTooltip,
} from 'vue2-leaflet';

export default {
  name: 'HelloWorld',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
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

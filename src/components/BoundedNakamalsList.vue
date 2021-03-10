<template>
  <v-virtual-scroll
    :items="boundNakamals"
    :item-height="50"
    height="300px"
  >
    <template v-slot:default="{ item }">
      <v-list-item
        :key="item.id"
        @click="select(item.id)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BoundedNakamals',
  computed: {
    ...mapGetters({
      bounds: 'map/bounds',
      nakamals: 'nakamal/list',
    }),
    boundNakamals() {
      if (!this.bounds) return [];
      return this.nakamals.filter((n) => this.bounds.contains(n.latLng));
    },
  },
  methods: {
    select(id) {
      const nakamal = this.nakamals.find((n) => n.id === id);
      this.$root.$emit('fly-to', { latlng: nakamal.latLng, zoom: 18 });
    },
  },
};
</script>

<style>

</style>

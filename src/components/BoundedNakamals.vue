<template>
  <v-navigation-drawer
    app
    right
    permanent
    color="accent lighten-3"
  >
    <v-list>
      <v-list-item
        v-for="nakamal in boundNakamals"
        :key="nakamal.id"
        @click="select(nakamal.id)"
      >
        <v-list-item-avatar>
          <v-avatar
            :src="nakamal.avatar"
          ></v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>{{ nakamal.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
      console.log('selected', id);
      const nakamal = this.nakamals.find((n) => n.id === id);
      this.$root.$emit('fly-to', { latlng: nakamal.latLng, zoom: 16 });
    },
  },
};
</script>

<style>

</style>

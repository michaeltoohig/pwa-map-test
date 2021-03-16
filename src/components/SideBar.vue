<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="!$vuetify.breakpoint.mdAndUp"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Malokay
          </v-list-item-title>
          <v-list-item-subtitle>
            Kava bar app
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
        <!-- I think this serves best as an actual menu to navigate
        save a FAB or something to open up a right side list of
        kava bars in the viewport -->
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
        <v-subheader>Nakamals in view</v-subheader>
        <BoundedNakamalsList v-on:close-drawer="drawer = false"></BoundedNakamalsList>

      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar
      app
      dense
    >
      <v-app-bar-nav-icon
        v-show="!$vuetify.breakpoint.mdAndUp"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Malokay</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="setShowSearch(true)">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-if="!showNewNakamalMarker"
            @click="setShowNewNakamalMarker(true)"
          >
            <v-list-item-title>
              Add New
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-else
            @click="setShowNewNakamalMarker(false)"
          >
            <v-list-item-title>
              Cancel Add New
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import BoundedNakamalsList from '@/components/BoundedNakamalsList.vue';
// import NetworkStatusFab from '@/components/NetworkStatusFab.vue';

export default {
  name: 'SideBar',
  components: {
    BoundedNakamalsList,
    // NetworkStatusFab,
  },
  data() {
    return {
      drawer: this.$vuetify.breakpoint.mdAndUp,
      items: [
        {
          title: 'Map',
          link: { name: 'Home' },
          icon: 'mdi-map',
        },
        {
          title: 'About',
          link: { name: 'About' },
          icon: 'mdi-account',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      showNewNakamalMarker: 'map/showNewNakamalMarker',
    }),
  },
  methods: {
    ...mapActions('map', [
      'setShowNewNakamalMarker',
      'setShowSearch',
    ]),
  },
};
</script>

<style>

</style>

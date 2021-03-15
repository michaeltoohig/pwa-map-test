<template>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
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
        <BoundedNakamalsList></BoundedNakamalsList>

      <v-divider></v-divider>
    </v-navigation-drawer>
</template>

<script>
import BoundedNakamalsList from '@/components/BoundedNakamalsList.vue';

export default {
  name: 'SideBar',
  components: {
    BoundedNakamalsList,
  },
  data() {
    return {
      drawer: true,
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
};
</script>

<style>

</style>

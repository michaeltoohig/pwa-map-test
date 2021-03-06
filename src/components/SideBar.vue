<template>
  <div>
  <v-navigation-drawer
    v-model="drawer"
    class="secondary"
    temporary
    hide-overlay
    clipped
    app
  >
      <!-- stuff perhaps a `nearby/in veiwport` list
      so it only calculates whats in the view port when open -->

      <!-- I think this serves best as an actual menu to navigate
      save a FAB or something to open up a right side list of
      kava bars in the viewport -->
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
  </v-navigation-drawer>

  <v-app-bar
    app
    dark
    color="primary"
  >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    <v-toolbar-title>Malokay</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      small
      icon
      color="secondary"
      class="mr-1"
    >
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      drawer: true,
      items: [
        {
          title: 'Home',
          link: { name: 'Home' },
          icon: 'mdi-home',
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

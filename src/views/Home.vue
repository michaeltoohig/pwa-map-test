<template>
  <div class="home">
    <NakamalMap></NakamalMap>
  </div>
</template>

<script>
// @ is an alias to /src
import NakamalMap from '@/components/NakamalMap.vue';

export default {
  name: 'Home',
  components: {
    NakamalMap,
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>

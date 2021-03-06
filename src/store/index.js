import Vue from 'vue';
import Vuex from 'vuex';
import mapModule from './modules/map.module';
import nakamalModule from './modules/nakamal.module';

Vue.use(Vuex);

export default new Vuex.Store({
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    map: mapModule,
    nakamal: nakamalModule,
  },
});

// import Vue from 'vue';
// import Vuex from 'vuex';

// const nakamals = {
//   1: {
//     id: 1,
//     avatar: 'https://picsum.photos/id/2000/1',
//     name: 'Nak Test 1',
//     lat: -17.7,
//     lng: 168.3,
//   },
//   2: {
//     id: 2,
//     avatar: 'https://picsum.photos/id/2000/2',
//     name: 'Nak Test 2',
//     lat: -17.75,
//     lng: 168.35,
//   },
//   3: {
//     id: 3,
//     avatar: 'https://picsum.photos/id/2000/3',
//     name: 'Nak Test 3',
//     lat: -17.8,
//     lng: 168.4
//   },
// };

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     nakamalsById: nakamals
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   },
// });

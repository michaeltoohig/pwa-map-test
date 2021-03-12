/* eslint-disable */

import Vue from 'vue';
import nakamalService from '@/services/nakamal.service';
import {
  latLng,
} from 'leaflet';

const state = {
  byId: {},
  allIds: [],
};

const getters = {
  // // Return a single article with the given id.
  // find: (state, _, __, rootGetters) => id => {
  //   // Swap ID referenes with the resolved author objects.
  //   return resolveRelations(state.byId[id], [], rootGetters);
  // },
  find: (state) => id => {
    return state.byId[id]; 
  },
  // Return a list of articles in the order of `allIds`.
  list: (state, getters) => {
    return state.allIds.map(id => getters.find(id));
  },
};

const actions = {
  load: async ({ commit }) => {
    const nakamals = await nakamalService.get();
    nakamals.forEach((item) => {
      commit('add', item);
      // // Normalize nested data and swap the author object
      // // in the API response with an ID reference.
      // commit('add', normalizeRelations(item, ['author']));
      // // Add or update the author.
      // commit('author/add', item.author, {
      //   root: true,
      // });
    });
  },
  add: async ({ commit }, payload) => {
    const nakamal = nakamalService.create(payload)
    commit('add', nakamal)
  }
};

const mutations = {
  add: (state, item) => {
    let i = {
      ...item,
      latLng: latLng(item.lat, item.lng),
    };
    Vue.set(state.byId, i.id, i);
    if (state.allIds.includes(i.id)) return;
    state.allIds.push(i.id);
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
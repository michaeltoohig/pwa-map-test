/* eslint-disable */

import Vue from 'vue';
import nakamalService from '@/services/nakamal.service';
import {
  latLng,
} from 'leaflet';

const initialState = () => ({
  byId: {},
  allIds: [],
  selectedId: null,
});

const state = initialState()

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
  selected: (state, getters) => {
    if (state.selectedId === null) return;
    return getters.find(state.selectedId);
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
    commit('add', nakamal);
  },
  select: async ({ commit }, id) => {
    commit('select', id);
  },
};

const mutations = {
  RESET (state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  add: (state, item) => {
    let i = {
      ...item,
      latLng: latLng(item.lat, item.lng),
    };
    Vue.set(state.byId, i.id, i);
    if (state.allIds.includes(i.id)) return;
    state.allIds.push(i.id);
  },
  select: (state, id) => {
    state.selectedId = id;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};

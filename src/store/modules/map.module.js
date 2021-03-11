/* eslint-disable */

import { latLng, latLngBounds } from 'leaflet';

const initialState = () => ({
  bounds: null,
  center: latLng(-17.741526, 168.312024),
  zoom: 15,
})

const state = initialState()

const getters = {
  bounds: (state) => {
    return state.bounds;
  },
  center: (state) => {
    return state.center;
  },
  zoom: (state) => {
    return state.zoom;
  },
};

const actions = {
  setBounds: async ({ commit }, bounds) => {
    commit('setBounds', bounds);
  },
  setCenter: async ({ commit }, center) => {
    commit('setCenter', center);
  },
  setZoom: async ({ commit }, zoom) => {
    commit('setZoom', zoom);
  },
};

const mutations = {
  RESET (state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  setBounds: (state, bounds) => {
    state.bounds = bounds;
  },
  setCenter: (state, center) => {
    state.center = center;
  },
  setZoom: (state, zoom) => {
    state.zoom = zoom;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};

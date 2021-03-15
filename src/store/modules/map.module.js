/* eslint-disable */

import { latLng } from 'leaflet';

const initialState = () => ({
  bounds: null,
  center: latLng(-17.741526, 168.312024),
  zoom: 15,
  showNewNakamalMarker: false,
  showSearch: false,
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
  showNewNakamalMarker: (state) => {
    return state.showNewNakamalMarker;
  },
  showSearch: (state) => {
    return state.showSearch;
  }
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
  setShowNewNakamalMarker: async ({ commit }, show) => {
    commit('setShowNewNakamalMarker', show);
  },
  setShowSearch: async ({ commit }, show) => {
    commit('setShowSearch', show);
  }
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
  setShowNewNakamalMarker: (state, show) => {
    state.showNewNakamalMarker = show;
  },
  setShowSearch: (state, show) => {
    state.showSearch = show;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};

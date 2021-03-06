/* eslint-disable */

const state = {
  bounds: null,
};

const getters = {
  bounds: (state) => {
    return state.bounds;
  },
};

const actions = {
  setBounds: async ({ commit }, bounds) => {
    commit('setBounds', bounds);
  },
};

const mutations = {
  setBounds: (state, bounds) => {
    state.bounds = bounds;
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};

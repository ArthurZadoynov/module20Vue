const state = {
  theme: "light",
};

const getters = {
  currentTheme: (state) => state.theme,
};

const actions = {};

const mutations = {
  setTheme: (state, theme) => {
    state.theme = theme;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

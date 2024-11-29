import axios from "axios";

const state = {
  tasks: [],
  loading: false,
};

const getters = {
  allTasks: (state) => state.tasks,
  loading: (state) => state.loading,
};

const actions = {
  async fetchTasks({ commit }) {
    commit("setLoading", true);
    try {
      const response = await axios.get(
        "https://a1043e7739a27305.mokky.dev/tasks"
      );
      commit("setTasks", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit("setLoading", false);
    }
  },
  async addTask({ commit }, task) {
    const response = await axios.post(
      "https://a1043e7739a27305.mokky.dev/tasks",
      task
    );
    commit("newTask", response.data);
  },
  async deleteTask({ commit }, id) {
    await axios.delete(`https://a1043e7739a27305.mokky.dev/tasks/${id}`);
    commit("removeTask", id);
  },
  async updateTask({ commit }, updatedTask) {
    const response = await axios.patch(
      `https://a1043e7739a27305.mokky.dev/tasks/${updatedTask.id}`,
      updatedTask
    );
    commit("updateTask", response.data);
  },
};

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  newTask(state, task) {
    state.tasks.unshift(task);
  },
  removeTask(state, id) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  },
  updateTask(state, updatedTask) {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

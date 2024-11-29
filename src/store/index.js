import { createStore } from "vuex";
import tasks from "./tasks";
import settings from "./settings";

const store = createStore({
  modules: {
    tasks,
    settings,
  },
});

export default store;

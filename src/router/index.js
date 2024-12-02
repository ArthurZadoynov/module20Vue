import { createRouter, createWebHistory } from "vue-router";
import MyTasks from "../views/MyTasks.vue";
import CreateTask from "../views/CreateTask.vue";
import UserSettings from "../views/UserSettings.vue";
import IdTaskDetail from "../views/IdTaskDetail.vue";

const routes = [
  { path: "/", component: MyTasks },
  { path: "/create", component: CreateTask },
  { path: "/settings", component: UserSettings },
  {
    path: "/task/:id",
    name: "TaskDetail",
    component: IdTaskDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

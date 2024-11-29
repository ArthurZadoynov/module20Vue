<template>
  <div class="container">
    <div class="navList">
      <router-link to="/">Назад к списку задач</router-link>
      <router-link to="/settings">Настройки</router-link>
    </div>
    <h1 class="title">Создать задачу</h1>
    <TaskForm @task-created="fetchTasks" />
  </div>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";

export default {
  components: { TaskForm },
};
</script>

<style></style>

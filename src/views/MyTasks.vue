<template>
  <div class="container">
    <div class="navList">
      <router-link to="/create">Создать задачу</router-link>
      <router-link to="/settings">Настройки</router-link>
    </div>
    <h1>Мои задачи</h1>
    <TaskList />
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";

export default {
  components: {
    TaskList,
  },
};
</script>

<style scoped></style>

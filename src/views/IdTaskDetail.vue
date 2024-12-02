<template>
  <div class="container">
    <div class="navList">
      <router-link to="/">Назад к списку задач</router-link>
    </div>
    <h1 class="title">Подробная информация по задаче</h1>
    <TaskDetail />
  </div>
</template>

<script>
import TaskDetail from "../components/TaskDetail.vue";

export default {
  components: { TaskDetail },
};
</script>

<style scoped>
h1 {
  margin-bottom: 30px;
}
</style>

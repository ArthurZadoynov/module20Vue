<template>
  <div class="task-card" v-if="!loading">
    <div v-if="task">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p>
        <strong>Приоритет:</strong> <span>{{ task.priority }}</span>
      </p>
      <p><strong>Срок выполнения:</strong> {{ task.dueDate }}</p>
      <p><strong>Статус:</strong> {{ task.status }}</p>
    </div>
    <div v-else>
      <p>Задача не найдена.</p>
    </div>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("tasks", ["tasks"]),
    task() {
      return this.tasks.find((t) => t.id === Number(this.$route.params.id));
    },
  },
  methods: {
    async fetchTask() {
      const id = this.$route.params.id;
      await this.$store.dispatch("tasks/fetchTask", id);
      this.loading = false;
    },
  },
  created() {
    this.fetchTask();
  },
};
</script>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  border: 2px solid #af9a9a;
  background-color: #f1f1f1;
  padding: 5px;
  color: var(--text-color-secondary);
  font-size: 26px;
  p {
    overflow-wrap: break-word;
  }
}
</style>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div v-for="task in tasks" :key="task.id" class="containerCard">
        <TaskCard
          :task="task"
          :is-editing="editingStates[task.id]"
          @delete-task="deleteTask"
          @edit-task="editTask"
          @cancel-task="cancelEdit"
          @open-task="goToTask"
        />
        <TaskForm
          v-if="isEditing && currentTask.id === task.id"
          :is-editing="isEditing"
          :task-to-edit="currentTask"
          @task-created="handleTaskCreated"
          @task-updated="handleTaskUpdated"
          @reset-editing="resetEditingState"
        />
      </div>
      <div v-if="showNotification" class="notification-container">
        <div class="notification">{{ notification }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskCard from "./TaskCard.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import TaskForm from "./TaskForm.vue";

export default {
  components: { TaskCard, LoadingSpinner, TaskForm },
  data() {
    return {
      currentTask: {},
      isEditing: false,
      editingStates: {},
      notification: "",
      showNotification: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["allTasks", "loading"]),
    tasks() {
      return this.allTasks;
    },
  },

  methods: {
    async deleteTask(id) {
      try {
        await this.$store.dispatch("tasks/deleteTask", id);
        delete this.editingStates[id];
        this.showNotificationMessage("Задача успешно удалена!");
      } catch (error) {
        this.showNotificationMessage("Ошибка при удалении задачи.");
      }
    },
    editTask(task) {
      if (this.isEditing && this.currentTask.id === task.id) {
        this.resetEditingState();
      } else {
        this.currentTask = { ...task };
        this.isEditing = true;
        this.editingStates = {};
        this.editingStates[task.id] = true;
      }
    },

    cancelEdit() {
      this.currentTask = {};
      this.isEditing = false;
      for (const key in this.editingStates) {
        this.editingStates[key] = false;
      }
    },

    goToTask(id) {
      console.log("Navigating to task with id:", id);
      this.$router.push({ name: "TaskDetail", params: { id } });
    },

    showNotificationMessage(message) {
      this.notification = message;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this.notification = "";
      }, 2000);
    },

    handleTaskCreated() {
      this.resetForm();
    },
    handleTaskUpdated(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.resetForm();
    },
    resetEditingState() {
      this.currentTask = {};
      this.isEditing = false;
      for (const key in this.editingStates) {
        this.editingStates[key] = false;
      }
      this.showNotificationMessage("Задача успешно обновлена!");
    },
    resetForm() {
      this.currentTask = {};
      this.isEditing = false;
      for (const key in this.editingStates) {
        this.editingStates[key] = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("tasks/fetchTasks");
  },
};
</script>

<style scoped>
.containerCard {
  width: 100%;
  padding-bottom: 50px;
}

.notification-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.notification {
  padding: 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}
</style>

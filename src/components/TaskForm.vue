<template>
  <form @submit.prevent="submitTask" novalidate>
    <div v-if="isEditing" class="editForm">
      <div>
        Приоритет:
        <select v-model="task.priority">
          <option value="низкий">Низкий</option>
          <option value="средний">Средний</option>
          <option value="высокий">Высокий</option>
        </select>
        <span v-if="errors.priority" class="error">{{ errors.priority }}</span>
      </div>
      <div>
        Статус:
        <select v-model="task.status">
          <option value="новая">Новая</option>
          <option value="в работе">В работе</option>
          <option value="завершена">Завершена</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
    </div>
    <div v-else class="formContent">
      <div>
        <input v-model="task.title" placeholder="Название" required />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div>
        <textarea
          v-model="task.description"
          placeholder="Описание"
          required
        ></textarea>
        <span v-if="errors.description" class="error">{{
          errors.description
        }}</span>
      </div>
      <div>
        <select v-model="task.priority">
          <option value="низкий">Низкий</option>
          <option value="средний">Средний</option>
          <option value="высокий">Высокий</option>
        </select>
        <span v-if="errors.priority" class="error">{{ errors.priority }}</span>
      </div>
      <div>
        <select v-model="task.status">
          <option value="новая">Новая</option>
          <option value="в работе">В работе</option>
          <option value="завершена">Завершена</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
      <div>
        <input type="date" v-model="task.dueDate" required />
        <span v-if="errors.dueDate" class="error">{{ errors.dueDate }}</span>
      </div>

      <div v-if="showNotification" class="notification-container">
        <div class="notification">{{ notification }}</div>
      </div>
    </div>
    <button type="submit" class="btnForm">
      {{ isEditing ? "Обновить задачу" : "Добавить задачу" }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    taskToEdit: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        priority: "средний",
        dueDate: "",
        status: "новая",
      }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      task: { ...this.taskToEdit },
      errors: {},
      notification: "",
      showNotification: false,
    };
  },
  watch: {
    taskToEdit: {
      handler(newTask) {
        this.task = { ...newTask };
        this.errors = {};
        this.notification = "";
      },
      deep: true,
    },
  },
  methods: {
    validate() {
      this.errors = {};

      if (!this.task.title) {
        this.errors.title = "Название обязательно.";
      } else if (this.task.title.length < 3) {
        this.errors.title = "Название должно содержать минимум 3 символа.";
      }

      if (!this.task.description) {
        this.errors.description = "Описание обязательно.";
      } else if (this.task.description.length < 10) {
        this.errors.description =
          "Описание должно содержать минимум 10 символов.";
      } else if (this.task.description.length > 250) {
        this.errors.description =
          "Описание должно содержать не более 250 символов.";
      }

      if (!this.task.dueDate) {
        this.errors.dueDate = "Укажите срок выполнения";
      }

      return Object.keys(this.errors).length === 0;
    },

    async submitTask() {
      if (!this.validate()) {
        return;
      }
      try {
        if (this.isEditing) {
          await this.$store.dispatch("tasks/updateTask", this.task);
          this.showNotificationMessage("Задача успешно обновлена!");
        } else {
          await this.$store.dispatch("tasks/addTask", this.task);
          this.showNotificationMessage("Задача успешно добавлена!");
        }

        this.resetForm();
        this.$emit("task-submitted");
      } catch (error) {
        this.showNotificationMessage("Произошла ошибка при сохранении задачи.");
      }
    },

    showNotificationMessage(message) {
      this.notification = message;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this.notification = "";
      }, 2000);
    },

    updateTask(field, value) {
      this.$emit("update-task", { ...this.task, [field]: value });
    },

    resetForm() {
      this.task = {
        title: "",
        description: "",
        priority: "средний",
        dueDate: "",
        status: "новая",
      };
      this.errors = {};

      if (this.isEditing) {
        this.$emit("reset-editing");
      }
    },
  },
};
</script>

<style scoped>
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

.editForm {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  font-size: 25px;
  background-color: rgb(255 110 110);

  select {
    padding: 5px;
    font-size: 20px;
    border-radius: 5px;
  }
}

.btnForm {
  width: 100%;
  padding: 18px 8px;
  font-size: 30px;
}

.notification {
  padding: 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

.error {
  color: red;
  font-size: 25px;
  margin: 5px 5px 15px 5px;
}

form:nth-child(3) {
  max-width: 1500px;
}

.formContent {
  display: flex;
  flex-direction: column;
  div input,
  textarea,
  select {
    width: 100%;
    padding: 20px 5px;
    font-size: 30px;
  }

  div select {
    cursor: pointer;
  }

  div textarea {
    min-height: 250px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
}
</style>

<template>
  <div class="task-card">
    <div @click="$emit('open-task', task.id)">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p>
        <strong>Приоритет:</strong> <span>{{ task.priority }}</span>
      </p>
      <p><strong>Срок выполнения:</strong> {{ task.dueDate }}</p>
      <p><strong>Статус:</strong> {{ task.status }}</p>
    </div>
    <button v-if="isEditing" @click="$emit('cancel-task', task)">
      Отмена редактирования
    </button>
    <button v-if="!isEditing" @click="$emit('edit-task', task)">
      Редактировать
    </button>
    <button @click="$emit('delete-task', task.id)">Удалить</button>
  </div>
</template>

<script>
export default {
  props: ["task", "isEditing"],
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
  button {
    padding: 18px 8px;
    font-size: 30px;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

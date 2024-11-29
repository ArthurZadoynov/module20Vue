<template>
  <div class="container">
    <div class="navList">
      <router-link to="/">Назад к списку задач</router-link>
      <router-link to="/create">Создать задачу</router-link>
    </div>
    <h1>Настройки</h1>
    <ThemeSwitcher />
  </div>
</template>

<script>
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
export default { name: "UserSettings", components: { ThemeSwitcher } };
</script>

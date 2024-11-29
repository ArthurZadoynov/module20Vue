<template>
  <div>
    <h3>Выберите тему</h3>
    <select v-model="selectedTheme" @change="changeTheme">
      <option value="light">Светлая</option>
      <option value="dark">Темная</option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    selectedTheme: {
      get() {
        return this.$store.state.settings.theme;
      },
      set(value) {
        this.$store.commit("settings/setTheme", value);
        this.changeTheme();
      },
    },
  },
  methods: {
    changeTheme() {
      document.body.className = this.selectedTheme;
    },
  },
  mounted() {
    this.changeTheme();
  },
};
</script>

<style scoped>
h3 {
  font-size: 30px;
  margin: 20px 0 10px 0;
}
select {
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  font-size: 30px;
  cursor: pointer;
}
</style>

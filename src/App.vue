<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --background-color: rgb(247, 221, 221);
  --text-color: black;
}

body.light {
  --background-color: rgb(247, 221, 221);
  --text-color: black;
  --text-color-secondary: black;
}

body.dark {
  --background-color: black;
  --text-color: white;
  --text-color-secondary: black;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1920px;
  margin: 0 auto;
  padding: 40px 20px;
}

.navList {
  display: flex;
  gap: 30px;
  font-size: 30px;
  padding-bottom: 50px;

  a {
    color: var(--text-color);
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 15px 25px;
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
    font-family: "Montserrat", sans-serif;
    background-color: rgb(146, 146, 146);
    border-radius: 40px;
  }

  a:hover {
    text-decoration: underline;
  }
  a:hover,
  a:active {
    background-color: red;
  }
}

h1 {
  font-size: 50px;
}

button {
  cursor: pointer;
}

@media (max-width: 680px) {
  .navList {
    flex-direction: column;
    gap: 0;

    a {
      text-align: center;
      margin: 15px 5px;
    }
  }
}
</style>

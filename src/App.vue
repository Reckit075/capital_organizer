<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <router-link to="/">home</router-link><br>
      <router-link to="/user/login">login</router-link><br>
      <router-link to="/user/register">register</router-link>
    </v-main>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>

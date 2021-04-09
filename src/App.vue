<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <!-- <router-link to="/">home</router-link><br />
      <router-link to="/user/login">login</router-link><br />
      <router-link to="/user/register">register</router-link> -->
      <NavBar>
        <router-view></router-view>
      </NavBar>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",

  components: { NavBar },

  data: () => ({
    //
  }),
};
</script>

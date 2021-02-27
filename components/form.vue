<template>
  <v-form @submit="registerUser" ref="form" method="post" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="posts.name"
            :counter="10"
            :rules="nameRules"
            placeholder="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="posts.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col cols="10" md="3">
          <v-text-field
            v-model="posts.email"
            :rules="emailRules"
            placeholder="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        elevation="4"
        :disabled="!valid"
        color="success"
        large
        type="submit"
        @click="validate"
        >submit</v-btn
      >
    </v-container>
  </v-form>
</template>
<script type="text/javascript">
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data: () => ({
    valid: true,
    show: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    passwordRules: [
      (v) => !!v || "Required.",
      (v) => v.length >= 8 || "Min 8 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    posts: {
      name: "",
      password: "",
      email: "",
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    registerUser(e) {
      console.log(this.posts);
      this.axios.post("http://localhost:4000/users/create",
      {
        name:this.posts.name,
        email:this.posts.email,
        password:this.posts.password
      },
      {
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
      })
      e.preventDefault();
    },
  },
};
</script>
<style>
</style>
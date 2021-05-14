<template>
  <v-form
    @submit="chooseAction"
    ref="form"
    method="post"
    v-model="valid"
    lazy-validation
  >
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
            label="password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col v-if="formType === 'register'" cols="10" md="3">
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
        >submit
      </v-btn>
      <Alert
        v-if="showAlert"
        :success="alertSuccess"
        :text="alertText"
        class="alert"
      ></Alert>
    </v-container>
  </v-form>
</template>
<script type="text/javascript">
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Alert from "../components/Alert";

Vue.use(VueAxios, axios);
export default {
  name: "Form",
  props: ["formType"],
  data: () => ({
    valid: true,
    show: true,
    showAlert: false,
    alertSuccess: "",
    alertText: "",
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
    chooseAction(e) {
      e.preventDefault();
      if (this.formType === "login") this.loginUser(e);
      else if (this.formType === "register") this.registerUser(e);
    },
    registerUser(e) {
      this.axios
        .post("http://localhost:4000/users/", this.posts)
        .then((response) => {
          console.log(response);
          this.showAlert = true;
          this.alertSuccess = "true";
          this.alertText ="Successfully registered, now log in and use the app 😃.";
        })
        .catch((err) => {
          this.showAlert = true;
          this.alertSuccess = "false";
          this.alertText = "Something went wrong😥, please try again.";
          console.log(err);
        });
      e.preventDefault();
    },
    loginUser(e) {
      this.axios
        .post(`http://localhost:4000/users/sesion`, this.posts)
        .then((response) => {
          console.log(response.data.id);
          this.$store.commit("setUserId", response.data.id);
          this.showAlert = true;
          this.alertSuccess = "true";
          this.alertText = "logged in correctly";
        })
        .catch((err) => {
          this.showAlert = true;
          this.alertSuccess = "false";
          this.alertText = "Something went wrong😥, please try again.";
          console.log(err);
        });
      e.preventDefault();
    },
  },
  components: { Alert },
};
</script>
<style>
.alert {
  margin-top: 20px;
}
</style>

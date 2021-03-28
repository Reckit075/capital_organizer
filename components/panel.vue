<template>
  <v-form
    @submit="sendData"
    ref="form"
    method="post"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="Amount"
      type="number"
      prefix="$"
      v-model="posts.amount"
      :rules="amountRules"
      required
    ></v-text-field>
    <v-select
      :items="items"
      label="Choose type"
      solo
      v-model="posts.type"
      required
      :rules="typeRules"
    ></v-select>
    <v-btn
      elevation="4"
      :disabled="!valid"
      color="success"
      large
      type="submit"
      @click="validate"
      >submit</v-btn
    >
    <v-btn elevation="4" color="warning" large @click="reset">reset</v-btn>
  </v-form>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data: () => ({
    valid: true,
    show: false,
    items: ["income", "expenditure"],
    amountRules: [(v) => !!v || "Amount is required"],
    typeRules: [(v) => !!v || "Type is required"],
    posts: {
      amount: 10,
      type: "",
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    sendData(e) {
      e.preventDefault();
      this.axios
        .post("http://localhost:4000/users/", this.posts)
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
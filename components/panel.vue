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
      v-model="posts.amount"
      :rules="amountRules"
      required
    ></v-text-field>
    <v-text-field
      label="Description"
      type="text"
      v-model="posts.description"
      :rules="descriptionRules"
      required
    ></v-text-field>
    <v-select
      :items="expenditure"
      label="Choose type of expenditure"
      solo
      v-model="posts.typeOfExpenditure"
      required
      :rules="typeRules"
    ></v-select>
    <v-select
      :items="currency"
      label="Choose type of currency"
      solo
      v-model="posts.currency"
      required
      :rules="typeRules"
    ></v-select>
    <v-date-picker v-model="posts.date"></v-date-picker>
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
    expenditure: ["income", "expenditure"],
    currency: ["USD", "EUR", "PLN"],
    amountRules: [(v) => !!v || "Amount is required"],
    descriptionRules: [(v) => !!v || "Description is required"],
    typeRules: [(v) => !!v || "Type is required"],
    posts: {
      amount: 10,
      description: '',
      typeOfExpenditure: '',
      currency: '',
      date: new Date().toISOString().substr(0, 10),
      userId: this.$store.state.userID
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
        .put("http://localhost:4000/funds/", this.posts)
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
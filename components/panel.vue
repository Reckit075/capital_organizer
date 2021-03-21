<template>
  <v-form
    @submit="sendData"
    ref="form"
    method="post"
    v-model="valid"
    lazy-validation
  >
    <v-text-field label="Amount" value="10.00" prefix="$"></v-text-field>
    <v-select :items="items" label="Choose type" solo></v-select>
    <v-btn
      elevation="4"
      :disabled="!valid"
      color="success"
      large
      type="submit"
      >submit</v-btn
    >
    <v-btn
      elevation="4"
      :disabled="!valid"
      color="success"
      large
      type="submit"
      >reset</v-btn
    >
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
    items: ["income", "expenditure"],
  }),
  methods: {
    sendData() {
      //send Data to server
      //get response from server
    },
  },
};
</script>
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
export default {
  data: () => ({
    headers: [
      { text: "amount", align: "start", value: "amount" },
      { text: "description", sortable: false, value: "description" },
      { text: "typeOfExpenditure", value: "typeOfExpenditure" },
      { text: "currency", sortable: false, value: "currency" },
      { text: "date(d.m.y)", value: "date" },
    ],
    desserts: [],
  }),
  methods: {
    getData() {
      console.log(this.$store.state.userId);
      this.axios
        .get(
          `http://localhost:4000/capitals/?userId=${this.$store.state.userId}`
        )
        .then((response) => {
          this.desserts = response.data.capitals;
        });
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>
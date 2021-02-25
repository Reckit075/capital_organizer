<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          placeholder="Name"
          required
        ></v-text-field>
        <br />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          placeholder="E-mail"
          required
        ></v-text-field>
      </v-row>
      <v-btn
        elevation="4"
        :disabled="!valid"
        color="success"
        large
        @click="validate"
        >submit</v-btn
      >
    </v-container>
  </v-form>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
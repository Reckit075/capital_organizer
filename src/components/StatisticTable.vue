<template >
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
    ><template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Budget history</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.amount"
                      label="amount"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.typeOfExpenditure"
                      label="typeOfExpenditure"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.currency"
                      label="currency"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date"
                      label="date(d.m.y)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="init"> Reset </v-btn>
    </template></v-data-table
  >
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,

    headers: [
      { text: "amount", align: "start", value: "amount" },
      { text: "description", sortable: false, value: "description" },
      { text: "typeOfExpenditure", value: "typeOfExpenditure" },
      { text: "currency", sortable: false, value: "currency" },
      { text: "date(d.m.y)", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedItem: {
      amount: "",
      description: "",
      typeOfExpenditure: 0,
      currency: "",
      date: "",
    },
    defaultItem: {
      amount: "",
      description: 0,
      typeOfExpenditure: 0,
      currency: "PLN",
      date: "10.10.2020",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      // console.log(this.$store.state.userId);
      this.axios
        .get(
          `http://localhost:4000/capitals/?userId=${this.$store.state.userId}`
        )
        .then((response) => {
          this.desserts = response.data.capitals;
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios.delete(
        `http://localhost:4000/capitals/?id=${this.editedItem.id}`
      );
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.axios.put(`http://localhost:4000/capitals/`, {
        id: this.editedItem.id,
        amount: this.editedItem.amount,
        description: this.editedItem.description,
        typeOfExpenditure: this.editedItem.typeOfExpenditure,
        currency: this.editedItem.currency,
        date: this.editedItem.date,
      });
      this.close();
    },
  },
};
</script>
<style>
.elevation-1 {
  width: 75vw;
  margin: auto;
}
</style>
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
  data: () => ({
    headers: [
      {
        text: "amount",
        align: "start",
        sortable: false,
        value: "amount",
      },
      { text: "description", sortable: false, value: "description" },
      { text: "typeOfExpenditure", value: "typeOfExpenditure" },
      { text: "currency", sortable: false, value: "currency" },
      { text: "date(d.m.y)", value: "date" },
    ],
    desserts: [
      {
        amount: "5",
        description: 'nice nike shoes',
        typeOfExpenditure: 'expenditure',
        currency: '$',
        date: '24.11.2020',
      },
      {
        amount: "23",
        description: 'ticket to cinema',
        typeOfExpenditure: 'expenditure',
        currency: 'PLN',
        date: '16.01.2021',
      },
      {
        amount: "50",
        description: 'vacum for granddad',
        typeOfExpenditure: 'expenditure',
        currency: '$',
        date: '5.12.2020',
      },
    ],
  }),
};
</script>
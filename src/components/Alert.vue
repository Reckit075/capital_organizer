<template>
  <div>
    <v-alert v-if="success=='true'" type="success">{{ text }}</v-alert>
    <v-alert v-else-if="success=='false'" type="error">{{ text }}</v-alert>
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: {
      success:{
          type: String,
          required:true
      },
      text:{
          type:String,
          required: true
      }
  }
};
</script>
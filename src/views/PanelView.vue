<template>
  <v-app>
    <v-main>
      <Panel />
    </v-main>
  </v-app>
</template>

<script>
import Panel from '@/components/Panel.vue';

export default {
  name: "Home",
  components: {
    Panel,
  },
};
</script>
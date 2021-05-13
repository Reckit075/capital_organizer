<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title ? `${ to.meta.title } - Capital Organizer` || 'Capital Organizer' : 'Capital Organizer';
      },
    },
  },
};
</script>

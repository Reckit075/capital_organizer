<template>
  <div class="home">
    <Form v-if="this.$route.path == '/user/register'" formType="register"/>
    <Form v-if="this.$route.path == '/user/login'" formType="login"/>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'

export default {
  name: 'Login',
  components: {
    Form
  }
}
</script>
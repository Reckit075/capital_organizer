<template>
  <div class="home">
    <Form formType="login" />
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'Login',
  components: {
    Form,
  },
};
</script>

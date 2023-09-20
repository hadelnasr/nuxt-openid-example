<template>
  <div>
    <h1>Processing Authentication...</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ route }) {
    try {
      // Extract query parameters from the URL
      const { code, state } = route.query;

      let token = this.$auth.loginWith('customLoginWithGoogle', {
        params: {
          code,
          state
        }
      });
      console.log(token);
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication error:', error);
    }
  },
};

</script>

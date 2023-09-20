<!-- login.vue -->
<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
export default {
  methods: {
    async loginWithGoogle() {
      try {
        await this.$auth.loginWith('google');
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
  },
};
</script>

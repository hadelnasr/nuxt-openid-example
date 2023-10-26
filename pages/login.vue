<!-- login.vue -->
<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithNafeza">Login with Nafeza</button>
  </div>
</template>

<script>
export default {
  methods: {
    async loginWithGoogle() {
      try {
        await this.$auth.loginWith('google');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async loginWithNafeza() {
      try {
        await this.$auth.loginWith('customLoginStrategy');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

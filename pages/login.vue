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
        await this.$auth.loginWith('customLoginWithGoogle');
        console.log(this.$auth.loggedIn);
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
  },
  mounted() {
    console.log(this.$auth.loggedIn);
  }
};
</script>

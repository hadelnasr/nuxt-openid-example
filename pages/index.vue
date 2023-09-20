<!-- login.vue -->
<template>
  <div>
    <div>
      Profile Data: {{$auth.user}}
    </div>
    <br/>
    <div>
      <a href="/" @click="$auth.logout()">logout</a>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],

  mounted() {
    console.log(this.$auth.loggedIn);
  }
};
</script>

<template>
  <div id="login-wrapper">
    <div id="login">
      <div id="logo-pane">
        <img id="logo" src="@/assets/logo.png" alt="RMS logo" />
        <div id="title">RMS</div>
        <div id="version">V1.0.0</div>
      </div>

      <div id="credentials">
        <span id="credentials-title">Login</span>
        <label>Username</label>
        <input v-model="credentials.username" type="text" />
        <label>Password</label>
        <input v-model="credentials.password" type="password" />
        <button id="login-button" class="main" @click="attemptLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>

// Import services
import LoginService from "@/services/LoginService";

export default {
  data: () => ({
    credentials: {
      password: "",
      username: ""
    }
  }),

  methods: {
    async attemptLogin() {
      const credentialsWereCorrect = await LoginService.attemptLogin(
          this.credentials.username,
          this.credentials.password
      );

      if (credentialsWereCorrect) {
        await this.$router.push('rms/dashboard');
        this.$router.go(1);
        notifications.add("info", "Login successful");
      } else {
        notifications.add("error", "Login attempt failed");
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/views/login.scss";
</style>
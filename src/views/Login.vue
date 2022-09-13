<template>
  <div id="login-wrapper">
    <div id="login">
      <div id="logo-pane">
        <img id="logo" style="width: 80%" src="@/assets/rms-bunny-small.png" alt="RMS logo" />
        <div id="title">RMS</div>
        <div id="version">V{{ version }}</div>
      </div>

      <div id="credentials">
        <span id="credentials-title">
          <img src="@/assets/rms-txt.png" style="width: 300px;margin-bottom: -30px;" alt="RMS txt" />
        </span>
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

import { version } from '../../package.json'

export default {
  data: () => ({
    credentials: {
      password: "",
      username: ""
    },
    version
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
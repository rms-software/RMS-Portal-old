<template>
  <div id="profile">
    <Box class="login-credentials" title="Login settings" collapsable>
      <div class="login-credential">
        Username <input type="text" v-model="credentialsSettings.username" />
      </div>
      <div class="login-credential">
        Password <input type="password" v-model="credentialsSettings.password" />
      </div>
      <div class="login-credential">
        Confirm password <input type="password" v-model="confirmPassword" />
      </div>

      <div class="login-credentials-save">
        <button class="main" @click="updateCredentialsSettings">Save</button>
      </div>
    </Box>

    <Box title="Profile settings" collapsable>
      <div class="profile-settings">
        <div class="textual-settings">
          <div class="profile-setting">
            Firstname <input type="text" v-model="profileSettings.firstName" />
          </div>
          <div class="profile-setting">
            Lastname <input type="text" v-model="profileSettings.lastName" />
          </div>
          <div class="profile-setting">
            Email address <input type="text" v-model="profileSettings.email" />
          </div>
          <div class="profile-setting">
            address <input type="text" v-model="profileSettings.address" />
          </div>
        </div>

        <div class="profile-pic-uploader">
          <ImageUploader v-model="profileSettings.profilePicture" ref="image-uploader" />
        </div>
      </div>

      <div class="login-credentials-save">
        <button class="main" @click="updateProfileInfo">Save</button>
      </div>
    </Box>
  </div>
</template>

<script>
// Import components
import Box from "@/components/common/Box.vue";
import ImageUploader from "@/components/common/ImageUploader";

// Import Services
import GeneralService from "@/services/GeneralService";
import ProfileService from "@/services/ProfileService";

// Import others
import EventBus from "@/bus"

export default {
  components: {
    Box,
    ImageUploader,
    GeneralService
  },

  data: () => ({
    confirmPassword: "",

    profileSettings: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      profilePicture: ""
    },

    credentialsSettings: {
      username: "",
      password: ""
    }
  }),

  async mounted() {
    const generalInfo = await GeneralService.getGeneralInfo();

    this.profileSettings = {
      firstName: generalInfo.firstName,
      lastName: generalInfo.lastName,
      email: generalInfo.emailAddress,
      address: generalInfo.address,
      profilePicture: generalInfo.profilePicture
    }
  },

  methods: {
    async updateCredentialsSettings() {
      if (this.credentialsSettings.password !== this.confirmPassword) {
        notifications.add("error", "Confirm password does not match password")
      } else {
        const result = await ProfileService.updateProfileCredentials(this.credentialsSettings);

        // Create and store the authorization header value
        if (result !== undefined) {
          const authHeaderValue = btoa(`${this.credentialsSettings.username}:${this.credentialsSettings.password}`);
          localStorage.setItem("authHeader", authHeaderValue);
          notifications.add("info", "Login updated")
        }
      }
    },

    async updateProfileInfo() {
      const res = await ProfileService.updateProfileInfo(this.profileSettings);
      if (res !== undefined) {
        notifications.add("info", "Profile settings successfully updated");
        EventBus.$emit('refreshGeneralInfo');
      } else {
        notifications.add("error", "Something went wrong while updating profile settings");
      }

    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/pages/profile.scss";
</style>
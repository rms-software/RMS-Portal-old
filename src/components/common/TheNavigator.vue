<template>
  <div id="the-navigator">
    <router-link to="/rms/profile" id="profile-indicator">
      <img v-if="generalInfo.profilePicture" :src="generalInfo.profilePicture" alt="profile picture" />
      <div>
        <div id="username">
          {{ generalInfo.firstName }} {{ generalInfo.lastName }}
        </div>
        <div id="role">
          {{ generalInfo.role }}
        </div>
      </div>
    </router-link>

    <router-link to="/rms/dashboard">
      <div class="nav-item">
        <unicon name="desktop" :fill="foregroundColor" />
        Dashboard
      </div>
    </router-link>

    <router-link to="/rms/employees">
      <div class="nav-item">
        <unicon name="users-alt" :fill="foregroundColor" />
        Employees
      </div>
    </router-link>

    <router-link to="/rms/orders">
      <div class="nav-item">
        <unicon name="box" :fill="foregroundColor" />
        Orders
      </div>
    </router-link>

    <router-link to="/rms/products">
      <div class="nav-item">
        <unicon name="align-left" :fill="foregroundColor" />
        Products
      </div>
    </router-link>

    <!-- <router-link to="/rms/content">
      <div class="nav-item">
        <unicon name="file-alt" :fill="foregroundColor" />
        Content
      </div>
    </router-link> -->

<!--    <div class="nav-item">-->
<!--      <unicon name="chart-line" fill="white" />-->
<!--      <router-link to="/rms/stats">Statistics</router-link>-->
<!--    </div>-->


    <router-link to="/rms/settings" class="bottom">
      <div class="nav-item">
        <unicon name="setting" :fill="foregroundColor" />
        Settings
      </div>
    </router-link>

    <span class="router-link">
      <div class="nav-item" @click="bus.$emit('logOut')">
        <unicon name="signout" :fill="foregroundColor" />
        Logout
      </div>
    </span>
  </div>
</template>

<script>
import bus from "@/bus";

export default {
  props: {
    generalInfo: {
      type: Object,
      required: true
    },

    foregroundColor: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/components/common/TheNavigator.scss";
</style>
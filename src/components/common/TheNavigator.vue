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

<!--    <div class="nav-item">-->
<!--      <unicon name="desktop" fill="white" />-->
<!--      <router-link to="/rms/dashboard">Dashboard</router-link>-->
<!--    </div>-->

<!--    <div class="nav-item">-->
<!--      <unicon name="box" fill="white" />-->
<!--      <router-link to="/rms/orders">Orders</router-link>-->
<!--    </div>-->

    <div class="nav-item">
      <unicon name="users-alt" fill="white" />
      <router-link to="/rms/employees">Employees</router-link>
    </div>

    <div class="nav-item">
      <unicon name="align-left" fill="white" />
      <router-link to="/rms/products">Products</router-link>
    </div>



<!--    <div class="nav-item">-->
<!--      <unicon name="chart-line" fill="white" />-->
<!--      <router-link to="/rms/stats">Statistics</router-link>-->
<!--    </div>-->

<!--    <div class="nav-item bottom">-->
<!--      <unicon name="setting" fill="white" />-->
<!--      <router-link to="/rms/settings">Settings</router-link>-->
<!--    </div>-->

    <div class="nav-item bottom" @click="bus.$emit('logOut')">
      <unicon name="signout" fill="white" />
      <span class="router-link">Logout</span>
    </div>
  </div>
</template>

<script>
import bus from "@/bus";

export default {
  props: {
    generalInfo: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    bus
  })
}
</script>

<style scoped lang="scss">
@import "../../scss/components/common/TheNavigator.scss";
</style>
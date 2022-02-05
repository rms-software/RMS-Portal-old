<template>
  <div id="app">
    <Debugger />
    <Notification />

    <div id="nav-normal" v-if="$route.name === 'Login'">
      <router-view/>
    </div>

    <div id="nav-login" v-else-if="loaded">
      <TheHeader :generalInfo="generalInfo" />

      <div id="main-content">
        <TheNavigator :generalInfo="generalInfo" />

        <div id="page-content">
          <div id="page-name">{{ $route.name }}</div>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import components
import TheHeader from "@/components/common/TheHeader";
import TheNavigator from "@/components/common/TheNavigator";
import Debugger from "@/components/common/Debugger";
import Notification from "@/components/common/Notification";

// Import services
import GeneralService from "@/services/GeneralService";

// Import other things
import EventBus from "@/bus";

export default {
  components: {
    TheHeader,
    TheNavigator,
    Notification,
    Debugger
  },

  data: () => ({
    loaded: false,
    generalInfo: {}
  }),

  created() {
    const that = this;
    EventBus.$on('refreshGeneralInfo', async () => {
      await that.refreshGeneralInfo();
    });

    EventBus.$on('logOut', async () => {
      localStorage.removeItem("authHeader");
      await this.refreshGeneralInfo();
    });
  },

  async mounted() {
    await this.refreshGeneralInfo();
  },

  methods: {
    async refreshGeneralInfo() {
      try {
        this.generalInfo = await GeneralService.getGeneralInfo();
        this.loaded = true;
      } catch(e) {
        await this.$router.push('/login');
        this.$router.go(1);
      }
    }
  }
}
</script>

<style lang="scss">
// Global non-scoped import of main.scss
@import "scss/main.scss";

#main-content {
  display: grid;
  grid-template-columns: 200px 1fr;

  #page-content {
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 80px);

    #page-name {
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 20px;
      color: #444;
    }
  }
}
</style>

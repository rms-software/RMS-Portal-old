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
          <div id="page-name" v-if="$route.name !== 'Dashboard'">{{ $route.name }}</div>
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

        // Set css color scheme
        document.querySelector(':root').style.setProperty("--main-theme", this.generalInfo.companyColor)
        console.log(this.shadeColor(this.generalInfo.companyColor, 0.5))
        console.log(this.generalInfo.companyColor)
        document.querySelector(':root').style.setProperty("--main-theme-light", this.shadeColor(this.generalInfo.companyColor, 0.85))

        this.loaded = true;
      } catch(e) {
        await this.$router.push('/login');
        this.$router.go(1);
      }
    },

    shadeColor(color, decimal) {
      const base = color.startsWith('#') ? 1 : 0;

      let r = parseInt(color.substring(base, 3), 16);
      let g = parseInt(color.substring(base + 2, 5), 16);
      let b = parseInt(color.substring(base + 4, 7), 16);

      r = Math.round(r / decimal);
      g = Math.round(g / decimal);
      b = Math.round(b / decimal);

      r = (r < 255)? r : 255;
      g = (g < 255)? g : 255;
      b = (b < 255)? b : 255;

      const rr = ((r.toString(16).length === 1)? `0${r.toString(16)}` : r.toString(16));
      const gg = ((g.toString(16).length === 1)? `0${g.toString(16)}` : g.toString(16));
      const bb = ((b.toString(16).length === 1)? `0${b.toString(16)}` : b.toString(16));

      return `#${rr}${gg}${bb}`;
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

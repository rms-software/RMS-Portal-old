<template>
  <div id="settings">
    <Box title="Company settings" collapsable>
      <div class="settings-list">
        <span>
          Company name
        </span>

        <input type="text" v-model="form.companyName" />

        <span>
          Company color
        </span>

        <input type="color" v-model="form.companyColor" ref="colorPicker" />
      </div>

      <br />

      <button class="btn add text" @click="saveSettings">
        <unicon name="save" fill="white"></unicon>
        Save
      </button>
    </Box>
  </div>
</template>

<script>
import Box from "@/components/common/Box";
import SettingsService from "@/services/SettingsService";
import EventBus from "@/bus";

export default {
  components: {
    Box
  },

  data: () => ({
    form: {
      companyName: "",
      companyColor: ""
    }
  }),

  mounted() {
    this.form.companyColor = this.$refs.colorPicker.value;
  },

  methods: {
    async saveSettings() {
      try {
        await SettingsService.saveSettings(this.form);
        EventBus.$emit("refreshGeneralInfo");
        notifications.add("info", "")
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped lang="scss">
#settings {
  .settings-list {
    display: grid;
    grid-template-columns: 150px auto;
    grid-row-gap: 10px;

    input {
      width: 100%;
    }
  }
}
</style>
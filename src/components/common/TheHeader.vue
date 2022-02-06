<template>
  <div id="the-header">
    <div id="logo-wrapper">
      <img id="logo" :src="generalInfo.companyLogo" alt="RMS logo" />
    </div>

    <div id="title-space">
      RMS &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; {{ generalInfo.companyName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    generalInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/components/common/TheHeader.scss";
</style>
<template>
  <div id="AlertBox" :class="level">
    <unicon :name="alertLevelIconName" fill="white" />
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: 'info'
    },

    message: {
      type: String,
      default: 'default message'
    }
  },

  computed: {
    alertLevelIconName() {
      const levelIconMap = {
        info: 'lightbulb',
        warning: 'exclamation',
        error: 'x'
      };
      
      return levelIconMap[this.level];
    }
  }
}
</script>

<style lang="scss">
@import "../scss/main.scss";

#AlertBox {
  padding: 10px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 7px;
  margin-bottom: 20px;

  &.info {
    background: $color-lightblue;

    .unicon svg path {
      fill: $color-lightblue;
    }
  }

  &.warning {
    background: $color-orange;

    .unicon svg path {
      fill: $color-orange;
    }
  }

  &.error {
    background: $color-red;

    .unicon svg path {
      fill: $color-red;
    }
  }

  .unicon {
    margin-right: 10px;
    background: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
  }
}
</style>
<template>
  <div id="box">
    <div id="box-title" @click="toggleCollapse">
      {{ title }}

      <span v-if="collapsable" id="collapser" :class="{ collapsed: isCollapsed }">
        <unicon name="angle-double-up" />
      </span>
    </div>

    <div id="box-body" v-show="!isCollapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    collapsable: {
      type: Boolean,
      default: false
    }
  },

  data:() => ({
    isCollapsed: false
  }),

  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/colors.scss";

#box {
  background: #eee;
  padding: 20px 40px;
  border-radius: 5px;
  margin-bottom: 20px;

  #box-title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      #collapser {
        background: lighten(#eee, 8);
      }
    }

    #collapser {
      background: lighten(#eee, 3);
      transition: transform 0.2s ease-in-out;
      border-radius: 10px;

      .unicon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
      }

      &.collapsed {
        transform: rotate(180deg);
      }
    }
    // border-bottom: 1px solid #aaaf;
  }

  #box-body {
    margin: 20px 0px;
  }
}
</style>

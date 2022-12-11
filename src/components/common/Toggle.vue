<!-- vuejs toggle button component -->
<template>
  <div class="toggle" @click="toggle" :class="{ activated: isActive }">
    <div class="toggle__button" :class="{'toggle__button--active': isActive}"></div>
  </div>
</template>

<script>
export default {
    name: 'Toggle',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isActive: this.value
        }
    },
    methods: {
        toggle() {
        this.isActive = !this.isActive
        this.$emit('input', this.isActive)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.toggle {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    background-color: #ccc;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &.activated {
        background-color: #3da67a;
    }

    .toggle__button {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        background-color: #fff;
        border-radius: 50%;
        transition: left 0.2s ease;
        &--active {
            left: 27px;
        }
    }
}
</style>
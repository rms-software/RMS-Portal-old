<template>
  <table>
    <thead>
      <slot name="head"></slot>
    </thead>

    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table.vue"
}
</script>

<style scoped lang="scss">
table {
  width: 100%;
  background: #eee;
  border-spacing: 0;

  th, td {
    padding: 10px;
    text-align: center;

    &.left {
      text-align: left; 
    }
  }

  thead {
    background: #ddd;

    th {
      &:not(:first-child) {
        border-left: 1px solid #ccc;
      }
    }
  }

  tbody {
    td {
      border-bottom: 1px solid #ddd;

      &:not(:first-child) {
        border-left: 1px solid #ddd;
      }
    }
  }
}
</style>
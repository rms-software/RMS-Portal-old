<template>
  <div id="debugger-wrapper" v-if="opened">
    <div id="debug-commandline">
      > <input placeholder="enter command" ref="input" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    lastShiftPress: 0,
    opened: false,

    enabledRules: {
      elements_border: false
    }
  }),

  mounted() {
    const that = this;

    document.addEventListener("keyup", event => {
      const deltaShift = Date.now() - that.lastShiftPress;

      if (event.code === "ShiftLeft" && deltaShift < 1000) {
        that.lastShiftPress = 0;
        that.opened = true;

        that.$nextTick(() => {
          that.$refs.input.focus();
          that.$refs.input.addEventListener("keyup", event => {
            if (event.code === "Enter") {
              that.executeCommand(that.$refs.input.value);
              that.opened = false;
            }
          })
        })
      }

      else if (event.code === "ShiftLeft")
        that.lastShiftPress = Date.now()
    });
  },

  methods: {
    executeCommand(command) {
      command = command.split(' ')

      if (command[0] === "") {
        // Do nothing
      } else if (command[0] === "bor") {
        if (!this.enabledRules.elements_border) {
          this.enabledRules.elements_border = true
          document.styleSheets[0].insertRule("* { outline: 1px solid red }", "elements_border");
        } else {
          this.enabledRules.elements_border = false
          document.styleSheets[0].deleteRule("elements_border");
        }
      } else if (command[0] === "elements") {
        if (command[1] === "border") {
          if (!this.enabledRules.elements_border) {
            this.enabledRules.elements_border = true
            document.styleSheets[0].insertRule("* { outline: 1px solid red }", "elements_border");
          } else {
            this.enabledRules.elements_border = false
            document.styleSheets[0].deleteRule("elements_border");
          }
        }
      } else {
        notifications.add("error", "Unknown command: " + command.join(''))
      }
    }
  }
}
</script>

<style scoped lang="scss">
#debugger-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vw;
  background: rgba(10%, 10%, 10%, 0.5);

  #debug-commandline {
    background: #444;
    position: fixed;
    top: 80px;
    width: 500px;
    left: calc(50vw - 250px);
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 5px;
    display: flex;
    align-items: center;

    input {
      margin-left: 10px;
      height: 20px;
      width: 100%;
      margin-right: 10px;
      border: none;
      background: #666;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
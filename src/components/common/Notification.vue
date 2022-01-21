<template>
  <div id="notifications">
    <div v-for="notif in notificationQueue" class="notification" :class="notif.level" @click="removeNotification(notif.identifier)">
      <div class="unicon-wrapper">
        <unicon :name="levelToUnicon(notif.level)" fill="white"></unicon>
      </div>

      <div class="notification-text">
        {{ notif.msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () =>  ({
    notificationQueue: []
  }),

  mounted() {
    window.notifications = this;
  },

  methods: {
    add(level, msg) {
      const identifier = Symbol();

      this.notificationQueue.push(
        {
          level,
          msg,
          identifier
        }
      )

      setTimeout(() => {
        this.notificationQueue = this.notificationQueue.filter(notif => notif.identifier !== identifier);
      }, 10000);
    },

    removeNotification(identifier) {
      this.notificationQueue = this.notificationQueue.filter(notif => notif.identifier !== identifier);
    },

    levelToUnicon(level) {
      const levelToUniconMap = {
        "error": "x",
        "warning": "exclamation",
        "info": "lightbulb"
      };

      return levelToUniconMap[level];
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/colors.scss";

#notifications {
  position: absolute;
  right: 5px;
  bottom: 0;
  z-index: 100000000;

  .notification {
    padding: 5px;
    width: 250px;
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin-bottom: 5px;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }

    &.error {
      background: $color-red;
    }

    &.warning {
      background: $color-orange;
    }

    &.info {
      background: $color-green;
    }

    .unicon-wrapper {
      height: 30px;
      width: 30px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;

      .unicon {
        margin-top: 5px;
      }
    }

    .notification-text {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
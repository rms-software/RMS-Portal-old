<template>
  <div id="dashboard">
    <div id="dashboard-bg">
      <img src="@/assets/logo-dark.png" />
    </div>

    <!-- <div id="dashboard-stats">
      <div class="stat-card">
        <div class="stat-name">Visits</div>

        <div class="stat-body">
          <unicon name="globe" fill="white"></unicon>

          <span class="stat-text">
            <span class="stat-gray">Today:</span> 50<br />
              <span class="stat-gray">Total:</span> 69420
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-name">Sales</div>

        <div class="stat-body">
          <unicon name="bill" fill="white"></unicon>

          <span class="stat-text">
            <span class="stat-gray">Today:</span> $50<br />
            <span class="stat-gray">Total:</span> $69420
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
#dashboard {
  height: 100%;
  position: relative;

  #dashboard-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      width: 50%;
      height: 50%;
      object-fit: contain;
      opacity: 0.1;
    }
  }

  #dashboard-stats {
    position: absolute;
    top: 0;

    .stat-card {
      background: var(--main-theme-light);
      margin: 20px;

      .stat-name {
        background: var(--main-theme);
        color: white;
        font-weight: bold;
        padding: 5px;
      }

      .stat-body {
        padding: 20px;
        display: grid;
        grid-template-columns: 50px auto;
        color: white;
        font-weight: bold;
        align-items: center;

        .stat-gray {
          color: #ccc;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
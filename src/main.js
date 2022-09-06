import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import {
  uniSetting, uniChartLine, uniUsersAlt, uniBox, uniAlignLeft, uniDesktop,
  uniSignout, uniAngleDoubleUp, uniCamera, uniX, uniExclamation, uniLightbulb,
  uniTrash, uniPen, uniPlus, uniCheck, uniFileAlt, uniAngleUp, uniAngleDown,
  uniSave, uniBill, uniGlobe, uniEye, uniPrint
} from 'vue-unicons/dist/icons';

Unicon.add([
  uniSetting, uniChartLine, uniUsersAlt, uniBox, uniAlignLeft, uniDesktop,
  uniSignout, uniAngleDoubleUp, uniCamera, uniX, uniExclamation, uniLightbulb,
  uniTrash, uniPen, uniPlus, uniCheck, uniFileAlt, uniAngleUp, uniAngleDown,
  uniSave, uniBill, uniGlobe, uniEye, uniPrint
]);

Vue.config.productionTip = false;

Vue.use(Unicon);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// for vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// for VeeValidate
import VeeValidate, { Validator } from "vee-validate";
// 日本語ファイルを読み込み
import ja from "vee-validate/dist/locale/ja";

Vue.use(Vuetify);
Vue.use(VeeValidate);

// vuetifyのオプション設定
const opts = {
  icons: { iconfont: "mdiSvg" }
};

// vee-validateの日本語
Validator.localize("ja", ja);
Vue.use(VeeValidate, { locale: ja });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  vuetify: new Vuetify(opts),
  el: "#app",
  components: { App },
  template: "<App/>"
});

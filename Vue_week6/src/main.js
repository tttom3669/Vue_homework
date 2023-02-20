import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// Vue loading 插件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import './assets/all.scss'; // 自定義 bootstrap
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.component('VueLoading', Loading); // 全域元件
app.mount('#app');

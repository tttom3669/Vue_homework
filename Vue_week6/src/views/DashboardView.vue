<template>
  <div class="container">
    <h1>這是後台首頁</h1>
    <router-link to="/admin/products">產品管理列表</router-link> |
    <router-link to="/admin/orders">訂單管理列表</router-link> |
    <router-link to="/">回前台首頁</router-link> |
    <a href="#" @click.prevent="logout">登出</a> |
    <hr />
    <RouterView></RouterView>
  </div>
</template>
<script>
import { RouterView } from 'vue-router';
import Swal from 'sweetalert2';

const { VITE_APP_URL } = import.meta.env;
export default {
  components: {
    RouterView,
  },
  methods: {
    logout() {
      document.cookie = `yoToken=; expires=${new Date()}`;
      this.$router.push('/login');
    },
    // 檢查登入驗證
    checkLogin() {
      const cookieValue = document.cookie
        .split(';')
        .find((row) => row.startsWith('yoToken='))
        ?.split('=')[1];

      this.$http.defaults.headers.common.Authorization = cookieValue;

      const url = `${VITE_APP_URL}/api/user/check`;
      this.$http
        .post(url)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push('/login');
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '請重新登入',
          });
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

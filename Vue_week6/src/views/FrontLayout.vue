<template>
  <div class="container">
    <h1>這是前台首頁</h1>
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">前台產品列表</router-link> |
    <router-link to="/cart">前台購物車</router-link> |
    <router-link to="/login">登入後台</router-link> |
    <hr />
    <RouterView></RouterView>
  </div>
</template>
<script>
import { RouterView } from 'vue-router';

export default {
  components: {
    RouterView,
  },
};
</script>

<template>
  <div>購物車頁面</div>
  <VueLoading v-model:active="isLoading" :is-full-page="fullPage"></VueLoading>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th class="text-center">單價</th>
        <th class="text-center">小計</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteItem(item)"
              :disabled="loadingStatus.loadingItem === item.id"
            >
              x
            </button>
          </td>
          <td>
            <!-- 商品名稱 -->
            {{ item.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <!-- 商品數量/單位 -->
              <div class="input-group mb-3">
                <input
                  min="1"
                  type="number"
                  class="form-control"
                  v-model.number="item.qty"
                  @blur="updateCartItem(item)"
                  :disabled="loadingStatus.loadingItem === item.id"
                />
                <span class="input-group-text" id="basic-addon2">
                  {{ item.product.unit }}
                </span>
              </div>
            </div>
          </td>
          <td class="text-center">
            {{ item.product.price }}
          </td>
          <td class="text-end">
            <!-- <small class="text-success">折扣價：</small> -->
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import Swal from 'sweetalert2';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      cart: {},
      isLoading: false,
      loadingStatus: {
        loadingItem: '', // 存 id、種類，判斷是否讀取中
      },
      fullPage: true,
    };
  },
  methods: {
    // 取得購物車
    getCarts() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    }, // 更新購物車
    updateCartItem(item) {
      this.isLoading = true;
      const data = {
        product_id: item.product.id, // 產品的 id
        qty: item.qty,
      };
      this.loadingStatus.loadingItem = item.id; // 購物車的 id

      this.$http
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          this.getCarts();
          Swal.fire({
            icon: 'success',
            title: `${res.data.message}`,
          });
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    },
    // 刪除購物車單一品項
    deleteItem(item) {
      this.isLoading = true;
      this.loadingStatus = {
        loadingItem: item.id,
        loadingType: 'deleteItem',
      };
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          this.getCarts();
          Swal.fire({
            icon: 'success',
            title: `${res.data.message}`,
          });
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getCarts();
  },
};
</script>

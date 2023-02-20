<template>
  <div>產品列表頁面</div>
  <VueLoading v-model:active="isLoading" :is-full-page="fullPage"></VueLoading>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </td>
        <!-- 商品名稱 -->
        <td>
          {{ product.title }}
        </td>
        <!-- 商品價格 -->
        <td>
          <div class="h5" v-if="product.price === product.origin_price">
            {{ product.price }} 元
          </div>
          <template v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
          </template>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="getProduct(product.id)"
              :disabled="loadingStatus.loadingItem === product.id"
            >
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addToCart(product.id)"
              :disabled="loadingStatus.loadingItem === product.id"
            >
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :temp-product="tempProduct"
    @add-to-cart="addToCart"
    :loading-status="loadingStatus"
  ></ProductModal>
</template>

<script>
import Swal from 'sweetalert2';
import ProductModal from '@/components/ProductModal.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      loadingStatus: {
        loadingItem: '', // 存 id、種類，判斷是否讀取中
      },
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    // 取得產品列表
    getProducts() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    },
    // 顯示單一產品細節
    getProduct(id) {
      this.loadingStatus.loadingItem = id;
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.tempProduct = res.data.product;
          this.isLoading = false;
          this.$refs.productModal.openModal();
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    },
    // 加入購物車
    addToCart(productId, qty = 1) {
      this.isLoading = true;
      const data = {
        product_id: productId,
        qty,
      };
      this.loadingStatus.loadingItem = productId;
      this.$refs.productModal.closeModal();
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: `${res.data.message}`,
          });
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`,
          });
        });
    },
  },
  components: { ProductModal },
  mounted() {
    this.isLoading = true;
    this.getProducts();
  },
};
</script>

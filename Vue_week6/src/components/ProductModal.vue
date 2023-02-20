<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <!--商品名稱-->
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img
                class="img-fluid"
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
              />
            </div>
            <div class="col-sm-6">
              <!--商品類別-->
              <span class="badge bg-primary rounded-pill">{{
                tempProduct.category
              }}</span>
              <p>商品描述：{{ tempProduct.description }}</p>
              <p>商品內容：{{ tempProduct.content }}</p>
              <!-- 商品價格 -->
              <div
                class="h5"
                v-if="tempProduct.price === tempProduct.origin_price"
              >
                {{ tempProduct.price }} 元
              </div>
              <template v-else>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
              </template>

              <div>
                <div class="input-group">
                  <!-- 商品數量 -->
                  <select class="form-select" v-model.number="qty">
                    <option :value="i" v-for="i in 20" :key="i + 'num'">
                      {{ i }}
                    </option>
                  </select>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="$emit('add-to-cart', tempProduct.id, qty)"
                    :disabled="loadingStatus.loadingItem === tempProduct.id"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: {},
      qty: 1,
    };
  },
  props: {
    tempProduct: {
      type: Object,
      default() {
        return {};
      },
    },
    loadingStatus: {
      type: Object,
      default() {
        return {
          loadingItem: '', // 存 id、種類，判斷是否讀取中
          loadingType: '',
        };
      },
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

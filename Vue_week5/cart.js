// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import productModal from './productModal.js';

const { createApp } = Vue;
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { loadLocaleFromURL, localize } = VeeValidateI18n;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = 'tttom3669';

// - 切版 v
// - 取得產品列表 v
// - 按按鈕，顯示單一產品細節 v
// - 加入購物車 (可選擇數量) v
// - 購物車列表 v
// - 調整數量 v
// - 刪除品項 v
// alert 訊息、catch 錯誤 v
// 表單驗證
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});
// 讀取外部的資源
loadLocaleFromURL('./zh_TW.json');

// Activate the locale
configure({
    generateMessage: localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
            cart: {},
            loadingStatus: {
                loadingItem: '', // 存 id、種類，判斷是否讀取中
                loadingType: '',
            },
            user: {
                name: '',
                email: '',
                tel: '',
                address: '',
                message: '',
            }
        }
    },
    methods: {
        // 取得產品列表
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
                .then((res) => {
                    console.log('產品列表', res.data
                        .products);
                    this.products = res.data
                        .products;
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        // 顯示單一產品細節
        getProduct(id) {
            this.loadingStatus = {
                loadingItem: id,
                loadingType: 'getProduct',
            }
            axios.get(`${apiUrl}/api/${apiPath}/product/${id}`)
                .then((res) => {
                    console.log('單一產品列表', res.data
                        .product);
                    this.tempProduct = res.data
                        .product;
                    this.$refs.productModal.openModal();
                    this.loadingStatus.loadingItem = '';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        // 加入購物車
        addToCart(product_id, qty = 1) {
            const data = {
                product_id,
                qty
            };
            this.loadingStatus = {
                loadingItem: product_id,
                loadingType: 'addToCart',
            }
            this.$refs.productModal.closeModal();
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
                .then((res) => {
                    console.log('加入購物車', res.data);
                    alert(res.data.message);
                    this.getCarts();
                    this.loadingStatus.loadingItem = '';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        //取得購物車
        getCarts() {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
                .then((res) => {
                    console.log('取得購物車', res.data);
                    this.cart = res.data.data;
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        // 更新購物車
        updateCartItem(item) {
            const data = {
                product_id: item.product.id, // 產品的 id
                qty: item.qty
            };
            this.loadingStatus.loadingItem = item.id; // 購物車的 id

            console.log(item, this.loadingStatus);
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
                .then((res) => {
                    console.log('更新購物車', res.data);
                    alert(res.data.message);
                    this.getCarts();
                    this.loadingStatus.loadingItem = '';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        // 刪除購物車單一品項
        deleteItem(item) {
            this.loadingStatus = {
                loadingItem: item.id,
                loadingType: 'deleteItem',
            }
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${item.id}`)
                .then((res) => {
                    console.log('刪除單一購物車', res.data);
                    alert(res.data.message);
                    this.getCarts();
                    this.loadingStatus.loadingItem = '';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        // 清空購物車
        deleteCarts() {
            this.loadingStatus.loadingType = 'deleteCarts';
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
                .then((res) => {
                    console.log('清空購物車', res.data);
                    alert('已清空購物車');
                    this.getCarts();
                    this.loadingStatus.loadingType = '';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }
        ,
        onSubmit() {
            alert("已送出訂單");
            this.user = {
                name: '',
                email: '',
                tel: '',
                address: '',
                message: '',
            }
        }
    },
    components: {
        productModal,
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    mounted() {
        this.getProducts();
        this.getCarts();
    },
});

// app.component('VForm', VeeValidate.Form);
// app.component('VField', VeeValidate.Field);
// app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = 'tttom3669';

// - 切版 v
// - 取得產品列表 v
// - 按按鈕，顯示單一產品細節
// - 加入購物車 (可選擇數量)
// - 購物車列表
// - 調整數量
// - 刪除品項


const app = createApp({
    data() {
        return {
            products: [],
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
                });
        },
    },
    mounted() {
        this.getProducts();
    },
});

app.mount('#app');
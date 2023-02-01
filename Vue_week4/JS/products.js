import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import pagination from './pagination.js'

const site = "https://vue3-course-api.hexschool.io/v2";
const api_path = 'tttom3669';

let productModal = {};
let delProductModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: true, // 確認是編輯或新增所使用
            page: {},
        }
    },
    methods: {
        //檢查登入狀況
        checkAdmin() {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith('yoToken='))
                ?.split('=')[1];
            // headers 夾帶 token (有儲存時)
            axios.defaults.headers.common['Authorization'] = cookieValue;
            this.getProducts();
        },
        // 取得產品資料 
        getProducts(page = 1) {
            axios.get(`${site}/api/${api_path}/admin/products/?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.page = res.data.pagination; // 取得頁數
                }).catch((err) => {
                    alert(err.data.message);
                    window.location = "login.html";
                });
        },
        // 更新產品資料
        updateProduct() {
            //用 isNew 判斷 api 要怎麼運行
            //新增產品
            let apiMethod = 'post';
            let apiUrl = `${site}/api/${api_path}/admin/product`;

            //修改產品
            if (!this.isNew) {
                apiMethod = 'put';
                apiUrl = `${site}/api/${api_path}/admin/product/${this.tempProduct.id}`;
            }

            axios[apiMethod](apiUrl, { data: this.tempProduct }).then((res) => {
                productModal.hide(); // 關閉產品頁面
                this.getProducts();
                alert(res.data.message);
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        // 刪除產品資料
        delProduct() {
            axios.delete(`${site}/api/${api_path}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    delProductModal.hide(); // 關閉刪除頁面
                    this.getProducts();
                    alert(res.data.message);
                }).catch((err) => {
                    alert(err.data.message);
                });
        },
        //開啟Modal
        openModal(status, product) {
            // 新增產品頁面
            if (status === "create") {
                // 帶入初始化資料
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            }
            // 編輯產品頁面
            else if (status === 'edit') {
                this.tempProduct = { ...product }; // 取得欲編輯產品內容
                this.isNew = false;
                productModal.show();
            }
            // 刪除產品頁面 
            else if (status === 'delete') {
                this.tempProduct = { ...product };// 取得欲刪除產品內容
                delProductModal.show();
            }
        },
        //新增圖片
        createImages(type) {
            if (type === 'init') {
                this.tempProduct.imagesUrl = [];
            }
            this.tempProduct.imagesUrl.push(''); //多圖區增加存放圖片
        }
    },
    components: {
        pagination
    },
    mounted() {
        // 登入驗證
        this.checkAdmin();
        // 建立 Bootstrap modal 實體
        productModal = new bootstrap.Modal(document.querySelector("#productModal"));
        delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
    },
});

// 編輯/新增產品頁面元件
app.component('product-model', {
    props: ['tempProduct', 'updateProduct', 'createImages'],
    template: `#product-modal-template`
})
// 刪除產品頁面元件
app.component('delProductModal', {
    props: ['tempProduct', 'delProduct'],
    template: `#del-modal-template`
});

app.mount('#app');
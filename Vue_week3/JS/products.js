import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;
const app = {
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: "tttom3669",
            isNew: true,
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    methods: {
        //檢查登入狀況
        checkAdmin() {
            //取出token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // headers夾帶token (有儲存時)
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    this.getData();
                }).catch((err) => {
                    alert('請重新登入');
                    window.location = './login.html';
                });
        },
        // 取得產品資料
        getData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
                .then((res) => {
                    this.products = res.data.products;
                }).catch((err) => {
                    alert(err.data.message);
                });
        },
        // 更新產品資料
        updateProduct() {
            //新增產品
            let apiMethod = 'post';
            let apiUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            //修改產品
            if (!this.isNew) {
                apiMethod = 'put';
                apiUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            }

            axios({
                method: apiMethod,
                url: apiUrl,
                data: { data: { ...this.tempProduct } },
            }).then((res) => {
                alert(res.data.message);
                productModal.hide(); // 關閉產品頁面
                this.getData();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        // 刪除產品資料
        delProduct() {
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    alert(res.data.message);
                    delProductModal.hide(); // 關閉刪除頁面
                    this.getData();
                }).catch((err) => {
                    alert(err.data.message);
                });
        },
        //開啟Model
        openModel(type, item) {
            // 新增產品頁面
            if (type === "new") {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            }
            // 編輯產品頁面
            else if (type === 'update') {
                this.tempProduct = { ...item }; // 取得欲編輯產品內容
                this.isNew = false;
                productModal.show();
            }
            // 刪除產品頁面 
            else if (type === 'delete') {
                this.tempProduct = { ...item };// 取得欲刪除產品內容
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
    mounted() {
        this.checkAdmin();
        //建立 Bootstrap modal 實體
        productModal = new bootstrap.Modal(document.querySelector("#productModal"));
        delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
    },
};
createApp(app).mount('#app');
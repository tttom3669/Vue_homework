import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const site = "https://vue3-course-api.hexschool.io/v2";

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        //使用者登入驗證
        login() {
            axios.post(`${site}/admin/signin`, this.user).then((res) => {
                alert(res.data.message);
                const { token, expired } = res.data;
                // 把token和時效存在cookie中
                document.cookie = `yoToken=${token}; expires=${new Date(expired)};`;
                window.location = 'products.html'; // 轉址
            }).catch(() => {
                alert('帳號密碼錯誤，請重新輸入');
            });
        }
    },
});
app.mount('#app');
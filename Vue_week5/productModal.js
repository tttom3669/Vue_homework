export default {
    data() {
        return {
            modal: {},
            qty: 1,
        }
    },
    props: {
        tempProduct: {
            type: Object,
            default() {
                return {}
            }
        }, loadingStatus: {
            type: Object,
            default() {
                return {
                    loadingItem: '', // 存 id、種類，判斷是否讀取中
                    loadingType: '',
                }
            }
        }
    },
    template: `#userProductModal`,
    methods: {
        openModal() {
            this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);
    },
}
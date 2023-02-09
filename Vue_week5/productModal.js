export default {
    data() {
        return {
            modal: {},
            qty: 1,
        }
    },
    props: ['tempProduct'],
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
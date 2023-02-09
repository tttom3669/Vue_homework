export default {
    data() {
        return {
            modal: {},
        }
    },
    props: ['tempProduct'],
    template: `#userProductModal`,
    methods: {
        openModal() {
            this.modal.show();
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);
    },
}
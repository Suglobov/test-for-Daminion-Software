new Vue({
    el: '#app',
    data: {
        licenseList: [],
        activeRow: 2,
        licenseCount: 10,
    },
    computed: {
        totalPrice () {
            return this.licenseList[this.activeRow] && this.licenseList[this.activeRow].price * this.licenseCount;
        }
    },
    mounted () {
        axios('./licenses.json').then((result) => {
            this.licenseList = result.data;
        });
    }
});

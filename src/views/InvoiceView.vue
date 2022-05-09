<template>
    <div class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'home' }">
            <img src="../assets/icon-arrow-left.svg" alt="" class="icon" />Go
            Back
        </router-link>

        <!-- HEADER -->

        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div
                    class="status-button"
                    :class="{
                        paid: currentInvoice.invoicePaid,
                        draft: currentInvoice.invoiceDraft,
                        pending: currentInvoice.invoicePending,
                    }"
                >
                    <span
                        class="status-button-state"
                        v-if="currentInvoice.invoicePaid"
                        >Paid</span
                    >
                    <span
                        class="status-button-state"
                        v-if="currentInvoice.invoiceDraft"
                        >Draft</span
                    >
                    <span
                        class="status-button-state"
                        v-if="currentInvoice.invoicePending"
                        >Pending</span
                    >
                </div>
            </div>
            <div class="right flex">
                <button @click="editInvoice" class="button button--black">
                    Edit
                </button>
                <button
                    class="button button--red"
                    @click="deleteInvoice(currentInvoice.docId)"
                >
                    Delete
                </button>
                <button
                    v-if="currentInvoice.invoicePending"
                    @click="updateStatusToPaid(currentInvoice.docId)"
                    class="green button button--orange"
                >
                    Mark as Paid
                </button>
                <button
                    v-if="
                        currentInvoice.invoiceDraft ||
                        currentInvoice.invoicePaid
                    "
                    @click="updateStatusToPending(currentInvoice.docId)"
                    class="orange"
                >
                    Mark as Pending
                </button>
            </div>
        </div>

        <!-- INVOICE DETAILS -->
        <div class="invoice-details flex-column">
            <div class="top flex">
                <div class="left flex-column">
                    <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>
                <div class="right flex-column">
                    <p>{{ currentInvoice.billerStreetAddress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                    <p>{{ currentInvoice.billerZipCode }}</p>
                    <p>{{ currentInvoice.billerCountry }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice.invoiceDate }}</p>

                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice.paymentDueDate }}</p>
                </div>
                <div class="bill flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice.clientName }}</p>
                    <p>{{ currentInvoice.clientStreetAddress }}</p>
                    <p>{{ currentInvoice.clientCity }}</p>
                    <p>{{ currentInvoice.clientZipCode }}</p>
                    <p>{{ currentInvoice.clientCountry }}</p>
                </div>
                <div class="sent-to flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div
                        v-for="(item, index) in currentInvoice.invoiceItemList"
                        :key="index"
                        class="item flex"
                    >
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>Amout Due</p>
                    <p>${{ currentInvoice.invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import { mapActions } from "pinia";

export default {
    name: "invoiceView",
    data() {
        return {
            store: useCounterStore(),
            currentInvoice: null,
        };
    },

    created() {
        this.getCurrentInvoice();
    },

    methods: {
        ...mapActions(useCounterStore, [
            "TOGGLE_EDIT_INVOICE",
            "TOGGLE_NEW_INVOICE",
            "REMOVE_INVOICE",
            "UPDATE_INVOICE_STATUS_TO_PAID",
            "UPDATE_INVOICE_STATUS_TO_PENDING",
            "SET_CURRENT_INVOICE",
        ]),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
            this.currentInvoice = this.store.currentInvoiceArray[0];
        },

        editInvoice() {
            this.TOGGLE_EDIT_INVOICE();
            this.TOGGLE_NEW_INVOICE();
        },

        async deleteInvoice(docId) {
            await this.REMOVE_INVOICE(docId);

            this.$router.push({ name: "home" });
        },

        updateStatusToPaid(docId) {
            this.UPDATE_INVOICE_STATUS_TO_PAID(docId);
        },

        updateStatusToPending(docId) {
            this.UPDATE_INVOICE_STATUS_TO_PENDING(docId);
        },
    },

    watch: {
        "store.editInvoice"(NewValue) {
            if (!NewValue) {
                this.currentInvoice = this.store.currentInvoiceArray[0];
            }
        },
    },
};
</script>

<style scoped>
/* HEADER */
.nav-link {
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
    margin-bottom: 32px;
    align-items: center;
}

.nav-link img {
    margin-right: 16px;
    width: 7px;
    height: 10px;
}

.header,
.invoice-details {
    background-color: var(--color-primary);
    border-radius: 20px;
}

.header {
    align-items: center;
    padding: 2.4rem 3.2rem;
    font-size: 1.5rem;
}

.header .left {
    align-items: center;
}

.header .left > span:first-child {
    margin-right: 2rem;
}

.header .right {
    flex: 1;
    justify-content: flex-end;
    gap: 2rem;
}

/* INVOICE DETAILS */
.invoice-details {
    padding: 4.8rem;
    margin-top: 2.4rem;
}

.top > div {
    flex: 1;
}

.top > .left {
    align-items: flex-start;
}

.top .left > p:first-child {
    font-size: 2.4rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.top .left p:nth-child(2) {
    font-size: 2rem;
}

.top .right {
    font-size: 1.8rem;
    font-weight: 300;
    align-items: flex-end;
}

.middle {
    margin-top: 5rem;
    gap: 1.6rem;
    font-weight: 400;
}

.middle h4 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.2rem;
}

.middle p {
    font-size: 1.6remrem;
    text-align: left;
}

.bill,
.payment {
    flex: 1;
}

.payment h4:nth-child(3) {
    margin-top: 3.2rem;
}

.payment > p {
    font-size: 2.2rem;
    font-weight: 600;
}

.bill > p:nth-child(2) {
    font-size: 2.2rem;
    font-weight: 600;
}
.bill p:nth-child(3) {
    margin-top: 2rem;
}

.sent-to {
    flex: 2;
}

.bottom {
    margin-top: 5rem;
}

.billing-items {
    padding: 3.2rem;
    border-radius: 2rem 2rem 0 0;
    background-color: hsl(179, 35%, 45%);
}

.billing-items .heading {
    margin-bottom: 3.2rem;
}

.billing-items .heading p,
.billing-items .item p {
    flex: 1;
    text-align: right;
}

.item {
    padding: 1em 0;
}

.billing-items .heading p:first-child,
.billing-items .item p:first-child {
    flex: 3;
    text-align: left;
}

.total {
    padding: 3.2rem;
    background-color: var(--color-secondary);
    align-items: center;
    border-radius: 0 0 2rem 2rem;
}

.total p {
    flex: 1;
    text-align: left;
}

.total p:nth-child(2) {
    font-size: 2.8rem;
    text-align: right;
}
</style>
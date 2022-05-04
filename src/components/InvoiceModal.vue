<template>
    <div class="invoice-wrap flex-column" @click="checkClick" ref="invoiceWrap">
        <form class="invoice-content" @submit.prevent="submitForm">
            <Loading v-show="loading" />

            <h1 v-if="!store.editInvoice">New Invoice</h1>
            <h1 v-else>Edit Invoice</h1>

            <!-- BILL FROM -->

            <div class="bill-from flex-column">
                <h4>Bill from</h4>
                <div class="input flex-column">
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="billerStreetAddress"
                        v-model="billerStreetAddress"
                        required
                    />
                </div>
                <div class="location-details flex">
                    <div class="input flex-column">
                        <label for="billerCity">City</label>
                        <input
                            type="text"
                            id="billerCity"
                            v-model="billerCity"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="billerZipCode">Zip-Code</label>
                        <input
                            type="text"
                            id="billerZipCode"
                            v-model="billerZipCode"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="billerCountry">Country</label>
                        <input
                            type="text"
                            id="billerCountry"
                            v-model="billerCountry"
                            required
                        />
                    </div>
                </div>
            </div>

            <!-- BILL TO -->

            <div class="bill-to flex-column">
                <h4>Bill To</h4>
                <div class="input flex-column">
                    <label for="clientName">Name</label>
                    <input
                        type="text"
                        id="clientName"
                        v-model="clientName"
                        required
                    />
                </div>
                <div class="input flex-column">
                    <label for="clientEmail">Email</label>
                    <input
                        type="text"
                        id="clientEmail"
                        v-model="clientEmail"
                        required
                    />
                </div>
                <div class="input flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="clientStreetAddress"
                        v-model="clientStreetAddress"
                        required
                    />
                </div>
                <div class="location-details flex">
                    <div class="input flex-column">
                        <label for="clientCity">City</label>
                        <input
                            type="text"
                            id="clientCity"
                            v-model="clientCity"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="clientZipCode">Zip-Code</label>
                        <input
                            type="text"
                            id="clientZipCode"
                            v-model="clientZipCode"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="clientCountry">Country</label>
                        <input
                            type="text"
                            id="clientCountry"
                            v-model="clientCountry"
                            required
                        />
                    </div>
                </div>
            </div>

            <!-- INVOICE WORK DETAIL -->

            <div class="invoice-work flex-column">
                <div class="payment flex">
                    <div class="input flex-column">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            disabled
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            disabled
                            type="text"
                            id="paymentDueDate"
                            v-model="paymentDueDate"
                            required
                        />
                    </div>
                </div>
                <div class="input flex-column">
                    <label for="paymentTerms">Payment Terms</label>
                    <select id="paymentTerms" v-model="paymentTerms" required>
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                    </select>
                </div>
                <div class="input flex-column">
                    <label for="productDescription">Product Description</label>
                    <input
                        type="text"
                        id="productDescription"
                        v-model="productDescription"
                        required
                    />
                </div>
                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading flex">
                            <th class="item-name">Item Name</th>
                            <th class="qty">Qty</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>
                        <tr
                            class="table-items flex"
                            v-for="(item, index) in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <input type="text" v-model="item.itemName" />
                            </td>
                            <td class="qty">
                                <input type="text" v-model="item.qty" />
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price" />
                            </td>
                            <td class="total flex">
                                $ {{ (item.total = item.qty * item.price) }}
                            </td>
                            <img
                                @click="deleteInvoiceItem(item.id)"
                                src="../assets/icon-delete.svg"
                                alt=""
                            />
                        </tr>
                    </table>

                    <div
                        class="flex button button--teal"
                        @click="addNewInvoiceItem"
                    >
                        <img src="../assets/icon-plus.svg" alt="" />
                        Add New Item
                    </div>
                </div>
            </div>

            <!-- SAVE/EXIT -->

            <div class="save flex">
                <div class="left">
                    <button
                        type="button"
                        class="button button--red"
                        @click="closeNewInvoice"
                    >
                        Cancel
                    </button>
                </div>
                <div class="right flex">
                    <button
                        v-if="!store.editInvoice"
                        type="submit"
                        class="button button--black"
                        @click="saveDraft"
                    >
                        Save Draft
                    </button>
                    <button
                        v-if="!store.editInvoice"
                        type="submit"
                        class="button button--orange"
                        @click="publishInvoice"
                    >
                        Create Invoice
                    </button>

                    <button
                        v-if="store.editInvoice"
                        type="submit"
                        class="button button--orange"
                    >
                        Update Invoice
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import { uid } from "uid";
import { collection, updateDoc, addDoc, doc } from "firebase/firestore/lite";
import db from "../firebase/firebaseInit";
import Loading from "./Loading.vue";

export default {
    name: "InvoiceModal",
    components: { Loading },
    data() {
        return {
            store: useCounterStore(),
            dateOptions: { year: "numeric", month: "short", day: "numeric" },
            docId: null,
            loading: null,
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
        };
    },

    created() {
        // Invoice Date
        if (!this.store.editInvoice) {
            this.invoiceDateUnix = Date.now();
            this.invoiceDate = new Date(
                this.invoiceDateUnix
            ).toLocaleDateString("en-us", this.dateOptions);
        }

        if (this.store.editInvoice) {
            const currentInvoice = this.store.currentInvoiceArray[0];
            this.docId = currentInvoice.docId;
            this.billerStreetAddress = currentInvoice.billerStreetAddress;
            this.billerCity = currentInvoice.billerCity;
            this.billerZipCode = currentInvoice.billerZipCode;
            this.billerCountry = currentInvoice.billerCountry;
            this.clientName = currentInvoice.clientName;
            this.clientEmail = currentInvoice.clientEmail;
            this.clientStreetAddress = currentInvoice.clientStreetAddress;
            this.clientCity = currentInvoice.clientCity;
            this.clientZipCode = currentInvoice.clientZipCode;
            this.clientCountry = currentInvoice.clientCountry;
            this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
            this.invoiceDate = currentInvoice.invoiceDate;
            this.paymentTerms = currentInvoice.paymentTerms;
            this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
            this.paymentDueDate = currentInvoice.paymentDueDate;
            this.productDescription = currentInvoice.productDescription;
            this.invoicePending = currentInvoice.invoicePending;
            this.invoiceDraft = currentInvoice.invoiceDraft;
            this.invoiceItemList = currentInvoice.invoiceItemList;
            this.invoiceTotal = currentInvoice.invoiceTotal;
        }
    },

    methods: {
        ...mapActions(useCounterStore, [
            "TOGGLE_MODAL",
            "TOGGLE_NEW_INVOICE",
            "TOGGLE_EDIT_INVOICE",
            "UPDATE_INVOICE",
        ]),

        closeNewInvoice() {
            this.TOGGLE_NEW_INVOICE();
            if (this.store.editInvoice) {
                this.TOGGLE_EDIT_INVOICE();
            }
        },

        checkClick(e) {
            if (e.target === this.$refs.invoiceWrap) {
                this.TOGGLE_MODAL();
            }
        },

        addNewInvoiceItem() {
            this.invoiceItemList.push({
                id: uid(),
                itemName: "",
                qty: 0,
                price: 0,
                total: 0,
            });
        },

        deleteInvoiceItem(id) {
            this.invoiceItemList = this.invoiceItemList.filter(
                (item) => item.id !== id
            );
        },

        saveDraft() {
            this.invoiceDraft = true;
        },

        publishInvoice() {
            this.invoicePending = true;
        },

        calcInvoiceTotal() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach((item) => {
                this.invoiceTotal += item.total;
            });
        },

        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("You have to fill in all the brackets first!");
                return;
            }

            this.loading = true;

            this.calcInvoiceTotal();
            const colRef = await collection(db, "invoices");
            const dataObj = {
                invoiceId: uid(6),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDate: this.invoiceDate,
                invoiceDateUnix: this.invoiceDateUnix,
                paymentTerms: this.paymentTerms,
                paymentDueDate: this.paymentDueDate,
                paymentDueDateUnix: this.paymentDueDateUnix,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoicePaid: null,
            };

            const docRef = await addDoc(colRef, dataObj);

            this.loading = false;

            this.TOGGLE_NEW_INVOICE();
        },

        async changeInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("You have to fill in all the brackets first!");
                return;
            }

            this.loading = true;

            this.calcInvoiceTotal();

            const invoiceRef = doc(db, "invoices", this.docId);

            const dataObj = {
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                paymentTerms: this.paymentTerms,
                paymentDueDate: this.paymentDueDate,
                paymentDueDateUnix: this.paymentDueDateUnix,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
            };

            await updateDoc(invoiceRef, dataObj);
            this.loading = false;

            const data = {
                docId: this.docId,
                routeId: this.$route.params.invoiceId,
            };

            this.UPDATE_INVOICE(data);
        },

        submitForm() {
            if (this.store.editInvoice) {
                this.changeInvoice();
                return;
            }
            this.uploadInvoice();
        },
    },

    watch: {
        paymentTerms() {
            const futureDate = new Date();
            this.paymentDueDateUnix = futureDate.setDate(
                futureDate.getDate() + parseFloat(this.paymentTerms)
            );
            this.paymentDueDate = new Date(
                this.paymentDueDateUnix
            ).toLocaleDateString("en-us", this.dateOptions);
        },
    },
};
</script>

<style scoped>
.invoice-wrap {
    /* max-width: 700px; */
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    height: 100vh;
    z-index: 10;
}

.invoice-wrap h1 {
    margin-bottom: 48px;
    color: white;
}

.invoice-wrap h3 {
    margin-bottom: 16px;
    font-size: 1.8rem;
    color: var(--color-additional);
}

.invoice-wrap h4 {
    color: var(--color-additional);
    font-size: 1.2rem;
    margin-bottom: 24px;
}

.invoice-content {
    width: 100%;
    max-width: 700px;
    position: relative;
    padding: 56px;
    height: 100vh;
    background-color: var(--color-secondary);
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow-y: scroll;
}

.bill-from,
.bill-to {
    margin-bottom: 48px;
}

.location-details {
    gap: 12px;
}
.location-details > div {
    flex: 1;
}

.payment {
    gap: 24px;
}

.payment > div {
    flex: 1;
}

.item-list {
    width: 100%;
}

.work-items .button > img {
    margin-right: 4px;
    width: 12px;
    height: 12px;
}

.table-heading,
.table-items {
    gap: 16px;
    font-size: 12px;
}

.table-items {
    max-width: 700px;
    margin-bottom: 18px;
    align-items: center;
}

.table-items img {
    width: 15px;
    height: 20px;
}

.table-heading {
    margin-bottom: 16px;
}

.table-heading > th {
    text-align: left;
}

.item-name {
    flex-basis: 50%;
}

.qty {
    flex-basis: 10%;
}

.price {
    flex-basis: 20%;
}

.total {
    flex-basis: 20%;
    align-self: center;
}

/* .total--style {
    border-radius: 4px;
    background-color: var(--color-primary);
    height: 38.52px;
    display: flex;
    align-items: center;
} */

.input {
    margin-bottom: 24px;
}

.save {
    margin-top: 60px;
}

.save > div {
    flex: 1;
}

.right {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

label {
    font-size: 12px;
    margin-bottom: 6px;
}

input,
select {
    width: 100%;
    background-color: var(--color-primary);
    color: var(--color-font);
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
}

inpuT:focus,
select:focus {
    outline: none;
}

@media (min-width: 900px) {
    .invoice-wrap {
        left: 90px;
    }
}
</style>
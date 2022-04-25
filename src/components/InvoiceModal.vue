<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex-column">
        <form class="invoice-content" @submit.prevent="submitForm">
            <h1>New Invoice</h1>

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
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                            required
                        />
                    </div>
                    <div class="input flex-column">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            type="text"
                            id="paymentDueDate"
                            v-model="paymentDueDate"
                            required
                        />
                    </div>
                </div>
                <div class="input flex-column">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        type="text"
                        id="paymentTerms"
                        v-model="paymentTerms"
                        required
                    >
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
                                <input type="text" v-model="item.total" />
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
                    <button class="button button--red" @click="closeInvoice">
                        Cancel
                    </button>
                </div>
                <div class="right flex">
                    <button class="button button--black" @click="saveDraft">
                        Save Draft
                    </button>
                    <button
                        class="button button--orange"
                        @click="publishInvoice"
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "InvoiceModal",
    data() {
        return {
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
};
</script>

<style>
.invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100vh;
    /* overflow: scroll; */
}

.invoice-wrap h1 {
    margin-bottom: 48px;
    color: white;
}

.invoice-wrap h3 {
    margin-bottom: 16px;
    font-size: 1.8rem;
    color: #777198;
}

.invoice-wrap h4 {
    color: var(--color-additional);
    font-size: 1.2rem;
    margin-bottom: 24px;
}

.invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
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
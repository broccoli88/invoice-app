<template>
    <div class="home container">
        <!-- HEADER -->

        <div class="header flex">
            <div class="left flex-column">
                <h1>Invoices</h1>
                <span
                    >There are total of
                    {{ store.invoiceData.length }} invoices</span
                >
            </div>
            <div class="right flex">
                <div @click="toggleFilterMenu" class="filter flex">
                    <span
                        >Filter by status
                        <span v-if="filteredInvoice"
                            >: {{ filteredInvoice }}
                        </span></span
                    >
                    <img src="../assets/icon-arrow-down.svg" alt="" />
                    <ul v-show="filterMenu" class="filter-menu">
                        <li @click="filteredInvoices">Draft</li>
                        <li @click="filteredInvoices">Pending</li>
                        <li @click="filteredInvoices">Paid</li>
                        <li @click="filteredInvoices">Clear Filter</li>
                    </ul>
                </div>
                <div
                    @click="store.TOGGLE_NEW_INVOICE"
                    class="flex button button--teal"
                >
                    <div class="inner-button flex">
                        <img src="../assets/icon-plus.svg" alt="" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>

        <!-- Invoices -->

        <div v-if="store.invoiceData.length > 0">
            <Invoice
                v-for="(invoice, index) in filteredData"
                :key="index"
                :invoice="invoice"
            />
        </div>
        <div v-else class="empty flex-column flex-center">
            <img src="../assets/illustration-empty.svg" alt="" />
            <h3>Ther is nothing here</h3>
            <p>
                Create a new invoice by clicking the New Invoice button and get
                started.
            </p>
        </div>
    </div>
</template>


<script>
import Invoice from "../components/Invoice.vue";
import { useCounterStore } from "../stores/counter";

export default {
    name: "Home",
    components: { Invoice },
    data() {
        return {
            filterMenu: null,
            filteredInvoice: null,
            store: useCounterStore(),
        };
    },

    methods: {
        toggleFilterMenu() {
            this.filterMenu = !this.filterMenu;
        },

        filteredInvoices(e) {
            if (e.target.textContent === "Clear Filter") {
                this.filteredInvoice = null;
                return;
            }
            this.filteredInvoice = e.target.textContent;
        },
    },

    computed: {
        filteredData() {
            return this.store.invoiceData.filter((invoice) => {
                if (this.filteredInvoice === "Draft") {
                    return invoice.invoiceDraft === true;
                }
                if (this.filteredInvoice === "Pending") {
                    return invoice.invoicePending === true;
                }
                if (this.filteredInvoice === "Paid") {
                    return invoice.invoicePaid === true;
                }
                return invoice;
            });
        },
    },
};
</script>

<style scoped>
.header {
    margin-bottom: 6.5rem;
}

.left,
.right {
    flex: 1;
}

.right {
    justify-content: flex-end;
    align-items: center;

    gap: 2rem;
}

.filter {
    gap: 1rem;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 0.5em;
}

.filter-menu {
    padding: 0.5em;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
}

.filter-menu > li {
    padding: 0.3em 1em;
    background-color: var(--color-bg-dark);
}

.filter-menu > li:hover {
    filter: brightness(130%);
}

.inner-button {
    border-radius: 50%;
    background-color: var(--color-secondary);
    padding: 0.6em;
}

.inner-button > img {
    width: 1.2rem;
    height: 1.2rem;
}

.empty {
    height: 55vh;
}

.empty img {
    width: 214px;
    height: 200px;
}

.empty h3 {
    margin-top: 3rem;
}
</style>
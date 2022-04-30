<template>
    <router-link
        class="invoice flex"
        :to="{ name: 'invoice', params: { invoiceId: invoice.invoiceId } }"
    >
        <div class="left flex">
            <span class="tracking-number">#{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person">{{ invoice.clientName }}</span>
        </div>
        <div class="right flex">
            <span class="price">${{ invoice.invoiceTotal }}</span>
            <div
                class="status-button flex"
                :class="{
                    paid: invoice.invoicePaid,
                    draft: invoice.invoiceDraft,
                    pending: invoice.invoicePending,
                }"
            >
                <span v-if="invoice.invoicePaid">Paid</span>
                <span v-if="invoice.invoiceDraft">Draft</span>
                <span v-if="invoice.invoicePending">Pending</span>
            </div>
            <div class="icon">
                <img src="../assets/icon-arrow-right.svg" alt="" />
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "invoice",
    props: ["invoice"],
};
</script>

<style scoped>
.invoice {
    margin-bottom: 1.6rem;
    padding: 2.8rem 3.2rem;

    cursor: pointer;

    text-decoration: none;
    color: var(--color-font);
    font-weight: 500;

    background-color: var(--color-primary);
    border-radius: 20px;

    gap: 1.6rem;
    align-items: center;
}

.left {
    flex-basis: 60%;
}
.left span {
    flex: 1;
    text-align: center;
}

.tracking-number {
    text-transform: uppercase;
}

.right {
    gap: 1.6rem;
    flex-basis: 40%;
    align-items: center;
}

.right span {
    flex: 1;
    text-align: center;
}

.price {
    font-size: 120%;
    font-weight: 600;
}

.status-button span {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style> 
<template>
    <div class="home container">
        <div class="header flex">
            <div class="left flex-column">
                <h1>Invoices</h1>
                <span>There are total of 4 invoices</span>
            </div>
            <div class="right flex">
                <div @click="toggleFilterMenu" class="filter flex">
                    <span>Filter by status</span>
                    <img src="../assets/icon-arrow-down.svg" alt="" />
                    <ul v-show="filterMenu" class="filter-menu">
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                        <li>Clear Filter</li>
                    </ul>
                </div>
                <div
                    @click="store.toggleNewInvoice"
                    class="flex button button--teal"
                >
                    <div class="inner-button flex">
                        <img src="../assets/icon-plus.svg" alt="" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useCounterStore } from "../stores/counter";

export default {
    name: "Home",

    data() {
        return {
            filterMenu: null,
            store: useCounterStore(),
        };
    },

    methods: {
        toggleFilterMenu() {
            this.filterMenu = !this.filterMenu;
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
</style>
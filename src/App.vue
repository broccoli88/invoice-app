<template>
    <div v-if="store.dataLoaded">
        <div v-if="!mobile" class="app wrapper flex-column">
            <NavBar />
            <div class="app-content flex-column">
                <Modal v-if="store.modalActive" />
                <transition name="invoice">
                    <InvoiceModal v-if="store.newInvoice" />
                </transition>
                <RouterView />
            </div>
        </div>
        <div v-else class="mobile-message flex-column flex-center">
            <h2>Sorry, this app is not supported on Mobile Devices</h2>
            <p>To use this app, use tablet or computer.</p>
        </div>
    </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import NavBar from "./components/NavBar.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
import { mapActions } from "pinia";

export default {
    components: { NavBar, InvoiceModal, Modal },
    data() {
        return {
            mobile: true,
            store: useCounterStore(),
        };
    },

    created() {
        this.getInvoices();
        this.checkScreen();
        window.addEventListener("resize", this.checkScreen);
    },

    methods: {
        ...mapActions(useCounterStore, ["getInvoices"]),

        checkScreen() {
            const windowWidth = window.innerWidth;

            if (windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
        },
    },
};
</script>

<style>
.flex {
    display: flex;
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.flex-center {
    justify-content: center;
    align-items: center;
}

.wrapper {
    max-width: 100vw;
    min-height: 100vh;
}

.container {
    width: 100%;
    padding: 4rem 1rem;
    max-width: 110rem;
    margin: 0 auto;
}

.app-content {
    position: relative;
    width: 100%;
    min-height: 100vh;
}

.mobile-message {
    width: 80%;
    margin-top: 40%;
    margin-inline: auto;
    text-align: center;
    gap: 2rem;
}

.nav-link {
    width: fit-content;
    align-items: center;
    text-decoration: none;
}

.icon {
    width: 12px;
    height: 16px;
}

.button {
    padding: 1em;
    border-radius: 40px;
    color: var(--color-font);
    font-weight: 500;
    font-size: 1.4rem;
    /* width: 10em; */

    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    border: 0;

    cursor: pointer;
}

.status-button {
    width: 10em;

    font-weight: 600;

    padding: 0.2em 1.5em;
    border-radius: 10px;

    display: flex;
    justify-content: center;
}

.status-button-state {
    margin: 0;
}

.pending {
    background-color: hsl(39, 100%, 45%);
}

.paid {
    background-color: hsl(115, 75%, 40%);
}

.draft {
    background-color: black;
}

.button--teal {
    background-color: var(--color-primary);
}
.button--red {
    background-color: crimson;
}

.button--orange {
    background-color: hsl(39, 100%, 45%);
}

.button--black {
    background-color: black;
}

/* Add Invoice toggle animation */

.invoice-enter-from,
.invoice-leave-to {
    transform: translateX(-700px);
}

.invoice-enter-active,
.invoice-leave-active {
    transition: 0.8s ease all;
}

@media (min-width: 900px) {
    .container {
        padding-top: 7.2rem;
    }

    .wrapper {
        flex-direction: row;
    }
}
</style>

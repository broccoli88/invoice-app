<template>
    <div class="modal flex">
        <div class="modal-content">
            <p>
                Are you sure you want to quit? Your changes will not be saved.
            </p>
            <div class="actions flex">
                <button @click="closeModal" class="button button--orange">
                    Return
                </button>
                <button @click="closeInvoice" class="button button--red">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import { mapActions } from "pinia";

export default {
    name: "modal",
    data() {
        return {
            store: useCounterStore(),
        };
    },

    methods: {
        ...mapActions(useCounterStore, [
            "TOGGLE_MODAL",
            "TOGGLE_EDIT_INVOICE",
            "TOGGLE_NEW_INVOICE",
        ]),

        closeModal() {
            this.TOGGLE_MODAL();
        },

        closeInvoice() {
            this.TOGGLE_MODAL();
            this.store.TOGGLE_NEW_INVOICE();
            if (this.store.editInvoice) {
                this.TOGGLE_EDIT_INVOICE();
            }
        },
    },
};
</script>

<style>
.modal {
    z-index: 200;
    position: fixed;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
}

.modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: var(--color-bg);
    color: #fff;
}

p {
    text-align: center;
}

.actions {
    margin-top: 5rem;
    justify-content: center;
    gap: 4rem;
}

.actions button {
    flex: 1;
}
</style>
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
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
    name: "modal",

    methods: {
        ...mapActions(useCounterStore, ["toggleModal", "toggleNewInvoice"]),

        closeModal() {
            this.toggleModal();
        },

        closeInvoice() {
            this.toggleModal();
            this.toggleNewInvoice();
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
    background-color: #252945;
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
<template>
    <div v-if="!mobile">
        <div class="wrapper flex-column">
            <NavBar />
            <div class="app-content flex-column">
                <RouterView />
                <InvoiceModal />
            </div>
        </div>
    </div>
    <div v-else class="mobile-message flex-column flex-center">
        <h2>Sorry, this app is not supported on Mobile Devices</h2>
        <p>To use this app, use tablet or computer.</p>
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
    components: { NavBar, InvoiceModal },
    data() {
        return {
            mobile: true,
        };
    },

    created() {
        this.checkScreen();
        window.addEventListener("resize", this.checkScreen);
    },

    methods: {
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

.button {
    padding: 1em;
    border-radius: 40px;
    color: var(--color-font);
    /* width: 10em; */

    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    border: 0;

    cursor: pointer;
}

.inner-button {
    border-radius: 50%;
    background-color: var(--color-secondary);
    padding: 0.6em;

    align-items: center;
    justify-content: center;
}

.inner-button img {
    width: 1.2rem;
    height: 1.2rem;
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

@media (min-width: 900px) {
    .container {
        padding-top: 7.2rem;
    }

    .wrapper {
        flex-direction: row;
    }
}
</style>

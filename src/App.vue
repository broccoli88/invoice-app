<template>
    <div v-if="!mobile">
        <div class="wrapper flex-column">
            <NavBar />
            <RouterView />
        </div>
    </div>
    <div v-else class="mobile-message flex-column flex-center">
        <h2>Sorry, this app is not supported on Mobile Devices</h2>
        <p>To use this app, use tablet or computer.</p>
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
    components: { NavBar },
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

.mobile-message {
    width: 80%;
    margin-top: 40%;
    margin-inline: auto;
    text-align: center;
    gap: 2rem;
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

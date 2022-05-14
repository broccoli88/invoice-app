<template>
    <header>
        <div class="branding flex flex-center">
            <img src="../assets/invoice-dollar-solid.png" alt="" />
        </div>
    </header>
</template>

<script>
export default {
    name: "NavBar",
};
</script>

<style>
header {
    position: fixed;
    width: 100%;
    background-color: var(--color-primary);
    z-index: 9999;
}

.branding {
    width: fit-content;
    padding: 2rem;
    border-radius: 0 10px 10px 0;
    background-color: var(--color-secondary);
}

img {
    width: auto;
    height: 30px;
}

@media (min-width: 900px) {
    header {
        max-width: 90px;
        min-height: 100vh;
    }

    .branding {
        width: 100%;
    }
}
</style>
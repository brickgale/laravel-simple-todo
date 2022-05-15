<template>
    <div class="app-container full-height" ref="root">
        <MainHeader />
        <router-view />
    </div>
</template>

<script>
    import MainHeader from '@/partials/mainHeader'
    
    export default {
        components: {
            MainHeader
        },
        setup() {
            return {

            }
        }
    }
</script>

<style lang="scss">
@import '~sass/app.scss';
</style>

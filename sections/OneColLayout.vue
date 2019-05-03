<template>
    <div class="one_col_layout">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'OneColLayout',
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style>
    .one_col_layout {
        width: 100%;
    }
</style>
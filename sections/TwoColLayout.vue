<template>
    <div class="two_col_layout">
        <div><slot name="left"/></div>
        <div><slot name="right"/></div>
    </div>
</template>

<script>
    export default {
        name: 'TwoColLayout'
    }
</script>

<style>
    .two_col_layout {
        width: 100%;
        display: flex;
    }
</style>
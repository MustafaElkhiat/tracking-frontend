<template>
    <div class="card p-4 m-4 d-inline-block" style="background-color: #40c4ff">
        <div style="font-weight: bold">{{name}}</div>
        <div style="color: black;opacity: 54%">{{location}}</div>
        <div style="color: black;opacity: 45%;font-size: 12px">From : {{from}}</div>
        <div style="color: black;opacity: 45%;font-size: 12px">To : {{to}}</div>
    </div>
</template>

<script>
    export default {
        name: "FollowerTrackingCard",
        props: {
            name: String,
            location: String,
            from:String,
            to:String,
        },

    }
</script>

<style scoped>

</style>
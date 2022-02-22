<template>
    <div class="row mt-3">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="location" v-model="location">
                <label for="location">Location</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="latitude" v-model="latitude">
                <label for="latitude">Latitude</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="longitude" v-model="longitude">
                <label for="longitude">Longitude</label>
            </div>
        </div>

    </div>
    <div class="row mt-3">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="from" v-model="from">
                <label for="from">From</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">

                <input type="text" class="form-control" id="to" v-model="to">
                <label for="to">To</label>
            </div>
        </div>
        <div class="col">
            <button
                    class="w-100 h-100 btn btn-lg btn-primary"
                    type="button" @click="addMovement">
                Add Movement
            </button>
        </div>
    </div>
</template>

<script>
    import DataService from '../services/data_service';

    export default {
        name: "AddMovement",
        data() {
            return {
                location: "Alexandria",
                latitude: "31.21564",
                longitude: "29.95527",
                from: "11-02-2022",
                to: "12-02-2022"

            }
        },
        computed: {
            user() {
                return this.$store.state.auth.user
            }
        },
        methods: {
            addMovement() {
                DataService.addMovement(this.latitude, this.longitude, this.location, this.from, this.to).then(
                    response => console.log("response : " + response),
                    error => console.log(error.response)
                )
            }
        }

    }
</script>

<style scoped>

</style>
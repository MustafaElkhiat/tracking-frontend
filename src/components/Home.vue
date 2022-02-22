<template>
    <FollowerTrackingCard v-for="followerTracking in followerTrackingData" :key="followerTracking.id"
                          :name="followerTracking.user.name"
                          :location="followerTracking.location.location" :from="followerTracking.from"
                          :to="followerTracking.to"/>


</template>

<script>
    import DataService from '../services/data_service';
    import FollowerTrackingCard from "./FollowerTrackingCard";

    export default {
        name: "Home",
        components: {FollowerTrackingCard},
        data() {
            return {
                followerTrackingData: ""
            }
        },
        computed: {
            user() {
                return this.$store.state.auth.user
            }
        },
        mounted() {
            console.log(this.user)
            //console.log(DataService.getLastMoveOfFollowersOfLeader())
            if (this.user.authorities[0].authority == "FOLLOWER_ROLE")
                DataService.getLastMoveOfUser().then(
                    data => this.followerTrackingData = data,
                    error => {
                        console.log(error.response)
                    }
                )
            else

                DataService.getLastMoveOfFollowersOfLeader().then(
                    data => this.followerTrackingData = data,
                    error => {
                        console.log(error.response)
                    }
                )
        }
    }


</script>

<style scoped>

</style>
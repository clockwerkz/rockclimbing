<template>
    <div>
        <h2>Profile Page</h2>
        <p>Email: {{email}}</p>
        <label>Climb Rating: </label>
         <select v-model="climbRating" name="climb-rating" @change="change">
            <option value="1">VB - V3</option>
            <option value="2">V4 - V6</option>
            <option value="3">V7 - V9</option>
            <option value="4">V10+</option>
        </select>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
export default {
    name: 'profile',
    data() {
        return {
            email: '',
            climbRating: '',
            desiredLocations: [],
            desiredTripDates: []
        }
    },
    mounted() {
        this.fetchProfile()
    },
    methods: {
        async fetchProfile() {
            let response = await ApiService.profile();
            console.log(response.data);
            if (response && response.data) {
                this.updateState(response.data);
            }
        },
        async change() {
            let profile = {
                climbRating : this.climbRating
            };
            let response = await ApiService.updateProfile(profile);
            if (response && response.data) {
                this.updateState(response.data);
            }
        },
        updateState(profile) {
            this.email = profile.email;
            this.climbRating = profile.climbRating;
            this.desiredLocations = profile.desiredLocations;
            this.desiredTripDates = profile.desiredTripDates;
        }
    }
}
</script>

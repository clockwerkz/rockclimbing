<template>
    <div>
        <h2>Signup Page</h2>
        <p>{{error}}</p>
        <input type="email" id="email" v-model="email" placeholder="Enter your email"/>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" />
        <input type="password" id="password2" v-model="password2" placeholder="Re-enter your password" />
        <button v-on:click="signup()">Login</button>
    </div>
</template>

<script>
export default {
    name: 'signup',
    data() {
        return {
            email: ' ',
            password: '',
            password2: '',
            error: '' 
        }
    },
    methods: {
        signup() {
            if (!this.email) {
                return this.error = "Please enter a password";
            }
            if (this.password==="") {
                return this.error ="Password field cannot be empty";
            }
            if (this.password !== this.password2) {
                return this.error = "Passwords do not match";
            }
        },
        clearError() {
            this.error = "";
        }
    }
}
</script>

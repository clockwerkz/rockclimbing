<template>
    <div>
        <h2>Login Page</h2>
        <input type="email" id="email" v-model="email" placeholder="Enter your email"/>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" />
        <button v-on:click="login()">Login</button>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login(){
            let response = await ApiService.login(this.email, this.password);
            let token = response.data.token;
            localStorage.setItem('rc-token', token);
            this.$router.push('/');
        }
    }
}
</script>

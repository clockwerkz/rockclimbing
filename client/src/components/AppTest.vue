<template>
    <div class="AppTest">
        <p>This is a test to see if the client can access the back end.</p>    
        <p>{{ msg }}</p>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
export default {
    name: 'test',
    data() {
        return {
            msg: 'This is a client side message'
        }
    },
    mounted() {
        this.testAPI()
    },
    methods: {
        async testAPI() {
            const response = await ApiService.fetchTest()
            console.log(response.data);
            this.msg = response.data.msg;
        }
    }
}
</script>

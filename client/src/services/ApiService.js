import Api from '@/services/Api';

export default {
    fetchTest() {
        return Api().get('/test');
    },
    login(email, password) {
        return Api().post('/login', 
             {
                email,
                password
            }
        );
    },
    profile() {
        let token = localStorage.getItem('rc-token');
        return Api().get('/profile', {
            headers: {
                'rc-auth-token' : token
            }
        });
    },

    updateProfile(profile) {
        let token = localStorage.getItem('rc-token');
        return Api().put('/profile', profile, {
            headers: {
                'rc-auth-token' : token
            }
        });
    }
}
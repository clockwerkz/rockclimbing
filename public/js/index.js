
let token = localStorage.getItem("rc_token");
if (!token) {
    window.location.replace("/login.html");
} else {
    fetch('/profile', {
        method: 'GET', 
        headers: {
            'rc-auth-token': token
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then((res)=> {
        if (res.status ===200) {
            return res.json();
        } else {
            localStorage.clear("rc_token");
            window.location.replace("/login.html");
        }
    })
    .then(data => {
        console.log(data);
        const app = document.getElementById('app');
        const profile = `
            <p>email: ${data.email}</p>
        `;
        app.innerHTML = profile;
    });
}


document.getElementById('logout').addEventListener('click', function() {
    fetch('/logout', {
        method: 'GET', 
        headers: {
            'rc-auth-token': token
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(()=> window.location.replace("/login.html"));
});
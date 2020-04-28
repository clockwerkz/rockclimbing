const btn = document.getElementById("submit-login");
btn.addEventListener("click", function(){
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    if (email!=="" && password!=="") {
        let profile = {
            email,
            password
        }
        fetch('/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : JSON.stringify(profile)
        })
        .then((res)=> res.json())
        .then(data => {
            localStorage.setItem("rc_token", data.token);
            window.location.replace("/");
        });
    }
});
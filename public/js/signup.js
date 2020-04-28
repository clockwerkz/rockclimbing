const signUpBtn = document.getElementById("submit-signup");
signUpBtn.addEventListener("click", function(){
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const pw2 = document.getElementById("password-input2").value;
    if (email!=="" && password!=="" && password === pw2) {
        let profile = {
            email,
            password
        }
        fetch('/profile', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : JSON.stringify(profile)
        })
        .then(()=>window.location.replace("/login.html"));
    }
});
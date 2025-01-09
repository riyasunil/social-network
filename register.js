document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await fetch('https://media.riamisu.site/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful!");
            window.location.href = '/login.html';  
        } else {
            alert(data.message || "Something went wrong. Please try again.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

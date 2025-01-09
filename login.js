
document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Send the data to the backend (Node.js Express)
    try {
        const response = await fetch('http://51.79.248.15:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("login successful!");
            localStorage.setItem('token', data.token);
            window.location.href = '/profile.html';  // Redirect to login page
        } else {
            alert(data.message || "Something went wrong. Please try again.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});



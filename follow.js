// Extract follow_id from the URL query string
function getFollowIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    return urlParams.get('/follow_id');  // Get the value of the 'follow_id' query parameter
}

// Fetch the invitation details using the follow_id
async function fetchInviteDetails(followId) {
    try {
        const response = await fetch(`https://media.riamisu.site/api/invites/${followId}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayInviteMessage(data.username);
            document.getElementById('accept-btn').addEventListener('click', () => acceptInvite(followId, data.username));
        } else {
            alert('Invalid invite link or invite not found');
        }
    } catch (error) {
        console.error('Error fetching invite details:', error);
        alert('An error occurred while fetching the invite details.');
    }
}

// Display the invitation message
function displayInviteMessage(inviterUsername) {
    const inviteMessageElement = document.getElementById('invite-message');
    inviteMessageElement.textContent = `${inviterUsername} has invited you to their profile.`;
}

// Accept the invite and add the user to the inviter's following list
async function acceptInvite(followId, inviterUsername) {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
        window.location.href = '/login.html';  // Redirect to login if no token is found
        return;
    }

    try {
        // Send request to accept the invite and add the user to the following list
        const response = await fetch(`https://media.riamisu.site/api/invites/follow/${followId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert('You have successfully followed ' + inviterUsername);
            window.location.href = `profile.html?username=${inviterUsername}`;  // Redirect to inviter's profile
        } else {
            alert(data.message || 'Failed to accept the invite');
        }
    } catch (error) {
        console.error('Error accepting invite:', error);
        alert('An error occurred while accepting the invite');
    }
}

// On page load, fetch invite details and display the message
window.onload = () => {
    const followId = getFollowIdFromURL();
    if (followId) {
        fetchInviteDetails(followId);
    } else {
        alert('Invalid invite link');
    }
};

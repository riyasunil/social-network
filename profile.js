// Function to fetch user profile and posts from the server
async function fetchUserProfile() {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
        window.location.href = '/login.html';  // Redirect to login if no token is found
        return;
    }

    try {
        // Fetch user profile data and posts from the backend

        const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username') || '';  // Default to empty string for logged-in user
    console.log(username)

    // If no username is provided in the URL, we default to the logged-in user's profile
    const profileUrl = username ? `https://media.riamisu.site/profile/${username}` : 'https://media.riamisu.site/profile';


        const response = await fetch(profileUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            // Populate the profile information
            document.getElementById('username').textContent = data.username;
            document.getElementById('bio').textContent = data.profiledata[0].bio || "No bio available"; // Handle empty bio
            document.getElementById('profile-picture').style.backgroundImage = `url('${data.profiledata[0].pfp_url || 'default-image.jpg'}')`;

            // Populate posts grid
            const postsGrid = document.getElementById('posts-grid');
            postsGrid.innerHTML = '';  // Clear any existing posts

            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    ${post.image_url ? `<img src="${post.image_url}" alt="Post Image" class="post-image" />` : ''}
                   
                `;
                postsGrid.appendChild(postElement);
            });
        } else {
            alert(data.message || 'Failed to fetch profile');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('An error occurred while fetching your profile');
    }
}
async function generateInviteLink() {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
        window.location.href = '/login.html';  // Redirect to login if no token is found
        return;
    }

    try {
        // Send request to generate invite link from the backend
        const response = await fetch('https://media.riamisu.site/api/invites/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Display the invite link and copy button
            const inviteLinkContainer = document.getElementById('invite-link-container');
            const inviteLinkInput = document.getElementById('invite-link');
            inviteLinkInput.value = data.invite_link;  // Set the invite link value
            inviteLinkContainer.style.display = 'block'; // Show the container with the invite link

        } else {
            alert(data.message || 'Failed to generate invite link');
        }
    } catch (error) {
        console.error('Error generating invite link:', error);
        alert('An error occurred while generating the invite link');
    }
}

// Function to copy the invite link to the clipboard
function copyInviteLink() {
    // const inviteLinkInput = document.getElementById('invite-link');
    // inviteLinkInput.select();
    // inviteLinkInput.setSelectionRange(0, 99999);  // For mobile devices
    // document.execCommand('copy');
    // alert('Invite link copied to clipboard!');
}

// Add event listeners
document.querySelector('.invite-btn').addEventListener('click', generateInviteLink);
document.getElementById('copy-btn').addEventListener('click', copyInviteLink);


// Fetch the user profile when the page loads
window.onload = fetchUserProfile;

{/* <p>${post.content}</p> */}
{/* <div class="post-date">${new Date(post.post_date).toLocaleString()}</div> */}




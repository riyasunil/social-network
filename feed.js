// Function to fetch the feed posts from the server
async function fetchFeedPosts() {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
        window.location.href = '/login.html';  // Redirect to login if no token is found
        return;
    }

    try {
        // Fetch the feed posts from the backend
        const response = await fetch('http://51.79.248.15:3000/api/feed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Populate the posts grid
            const postsGrid = document.getElementById('posts-grid');
            postsGrid.innerHTML = '';  // Clear any existing posts

            if (data.posts.length === 0) {
                postsGrid.innerHTML = '<p>No posts found from the users you follow.</p>';
            }

            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-header">
                        <span class="username">${post.username}</span>
                        <span class="post-date">${new Date(post.post_date).toLocaleString()}</span>
                    </div>
                    ${post.image_url ? `<img src="${post.image_url}" alt="Post Image" class="post-image" />` : ''}
                    <p class ="post-content">${post.content}</p>
                `;
                postsGrid.appendChild(postElement);
            });
        } else {
            alert(data.message || 'Failed to fetch feed');
        }
    } catch (error) {
        console.error('Error fetching feed:', error);
        alert('An error occurred while fetching the feed');
    }
}

// Fetch the feed posts when the page loads
window.onload = fetchFeedPosts;

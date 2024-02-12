/**
 * Authors: Zeyu Liu
 * Description: This JavaScript file handles the functionalities 
 * for sending messages, fetching conversations, and displaying 
 * them in the UI. It includes functions to extract query parameters,
 * initiate conversation fetch, send messages, display conversations,
 * and format timestamps. Additionally, it sets up event listeners
 * for DOM elements like the send button and username input field.
 */

// Function to extract query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to initiate conversation fetch based on query parameter
function initiateConversationFetch() {
    const otherUser = getQueryParam('user');
    if (otherUser) {
        // Set username in input and fetch conversation
        document.getElementById('userNameInput').value = otherUser;
        fetchAndDisplayConversation(otherUser);
        // Set interval for refreshing the conversation
        if (window.conversationInterval) {
            clearInterval(window.conversationInterval);
        }
        window.conversationInterval = setInterval(() => {
            fetchAndDisplayConversation(otherUser);
        }, 1000);
    }
}

// Set up event listener for DOMContentLoaded to initiate conversation fetch
document.addEventListener('DOMContentLoaded', initiateConversationFetch);

// Event listener for the send button to post a new message
document.getElementById('sendButton').addEventListener('click', function() {
    var recipient = document.getElementById('userNameInput').value;
    var messageContent = document.getElementById('textbox').value;
    var messageData = {
        recipient: recipient,
        content: messageContent
    };
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        console.log(data.message); // Use the 'message' property from the JSON response
    })
    .catch((error) => {
        console.error('Error:', error);
});
});

// Function to fetch and display conversation with a specific user
function fetchAndDisplayConversation(otherUser) {
    fetch(`/get-conversation/${otherUser}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(conversation => {
            const messageDiv = document.getElementById('messageDiv');
            messageDiv.innerHTML = ''; // Clear current messages
            conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            conversation.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                const formattedDate = formatDate(message.timestamp);
                messageElement.innerHTML = `<p>${message.sender}: ${message.content}
                <span class="timestamp">${formattedDate}</span></p>`;
                messageDiv.appendChild(messageElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            displaySearchError('user not found');
        });
}

// Function to display a search error message
function displaySearchError(message) {
    const searchErrorDiv = document.getElementById('searchError');
    searchErrorDiv.textContent = message; 
    searchErrorDiv.style.display = 'block'; 
}

// Function to format timestamps for display
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
}

// Event listener for username input change to refresh conversation
document.getElementById('userNameInput').addEventListener('change', function() {
    var otherUser = this.value;
    if (window.conversationInterval) {
        clearInterval(window.conversationInterval);
    }

    // Set a new interval to refresh the conversation every second
    window.conversationInterval = setInterval(() => {
        fetchAndDisplayConversation(otherUser);
    }, 1000);
});
// Back button functionality to navigate to the main direct message page
backButton.onclick = () => {window.location.href = 'http://localhost:80/dmMain.html'}
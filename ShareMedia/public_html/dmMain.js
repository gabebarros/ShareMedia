/**
 * Authors: Zeyu Liu
 * Description: This JavaScript file handles the functionalities 
 * for displaying received messages in the UI. Code is also included to
 * redirect the user to other pages when they click on the buttons.
 */

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the last messages for each conversation
    fetch('/get-last-messages')
        .then(response => response.json()) // Convert response to JSON
        .then(conversations => {
            const messagesDiv = document.getElementById('messages'); // Locate messages display
            // Loop through each conversation to create buttons
            conversations.forEach(convo => {
                const button = document.createElement('button');
                button.className = 'DM';
                // Set the button content to show the other user and the last message
                button.innerHTML = `
                    ${convo.otherUser}: ${convo.lastMessage.content}
                `;
                // Add an event listener to redirect to the message sending page with the user
                button.addEventListener('click', () => {
                    window.location.href = `sendDM.html?user=${convo.otherUser}`;
                });
                messagesDiv.appendChild(button);
            });
            if (messagesDiv.innerText == ''){
                messagesDiv.innerText = 'You have not received any messages'
            }
        })
        .catch(error => console.error('Error:', error));
});

homeButton.onclick = () => {
    window.location.href = 'http://localhost:80/home.html';
};
newMessage.onclick = () => {
    window.location.href = 'http://localhost:80/sendDM.html';
};
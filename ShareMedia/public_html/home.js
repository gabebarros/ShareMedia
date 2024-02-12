/*
    Name: Gabe Barros
    File description: home.js is a JavaScript file that uses AJAX to send and receive information
    about posts and users from the server. Several functions are created to send requests
    for things like posts, profile pictures, etc.
*/
var username = document.getElementById('username')
var textPosts = document.getElementById('textPosts')
var helpButton = document.getElementById('help')
var likeButton = document.getElementById('likeButton')
var mediaPosts = document.getElementById('mediaPosts')
var postPFP = document.getElementsByClassName('postPFP')
var pfp = document.getElementById('pfp')
var logout = document.getElementById('logOut')
var sidebar = document.getElementById('sidebar')
var mediaPost = document.getElementsByClassName('mediaPost')
var textPost = document.getElementsByClassName('textPost')

function getPFP(){
    /*
    Function: getPFP
    The purpose of this function is to send a get request to the server in order to retreive
    the current user's profile picture. After the profile picture string is received, the src
    for the pfp element is updated to show the actual picture. The function has no parameters,
    and is called when the page loads.
    */
    let url = 'http://localhost:80/profile/get/pfp/'
    fetch(url)
    .then((response) => {
        return response.text()   
    })
    .then((pfpstring) =>{
        if (pfpstring != 'blank-profile-picture-973460_960_720.webp'){
            pfp.src = `uploads/images/${pfpstring.replace(/^"(.*)"$/, '$1')}`}
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

// update username element with user's username
if (document.cookie){
    n = decodeURIComponent(document.cookie).split('=j:')
    if (username != null){
    username.innerText = JSON.parse(n[1]).username}
}

function displayTextPosts(){
    /*
    Function: displayTextPosts
    The purpose of this function is to send a get request to the server in order to retreive
    all the text posts in the database. After the posts string is received, the DOM is updated
    to display the posts. The function has no parameters, and is called when the page loads.
    */
    let url = 'http://localhost:80/home/get/posts/text/'
    fetch(url)
    .then((response) => {
        return response.text()    
    })
    .then((posts) =>{
        if (posts.length != 2){
            textPosts.innerHTML = JSON.parse(posts)
        }
        getTheme()
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function displayMediaPosts(){
    /*
    Function: displayMediaPosts
    The purpose of this function is to send a get request to the server in order to retreive
    all the media posts in the database. After the posts string is received, the DOM is updated
    to display the posts. The function has no parameters, and is called when the page loads.
    */
    let url = 'http://localhost:80/home/get/posts/media/'
    fetch(url)
    .then((response) => {
        return response.text()    
    })
    .then((posts) =>{
        if (posts.length != 2){
            mediaPosts.innerHTML = JSON.parse(posts)
        }
        getTheme()
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function like(id){
    /*
    Function: like
    The purpose of this function is to send a post request to the server to like a post. 
    The server updates the database and sends back a message based on whether or not the post
    has already been liked by this user. Based on this, the text in the like button switches
    between like and unlike. The function has one parameter for the post id, and is called when
    the like button is clicked.
    */
    info = {postID: id}
    let url = `http://localhost:80/home/like/`
    fetch((url), {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
        })
        .then((response) => {
            return response.json();
        })
        .then((information) => {
            let likeButton = document.getElementById('likeButton' + id)
            let likes = document.getElementById('likes' + id)
            if (information[0] == 'Liked'){
                likeButton.innerText = 'Unlike'
            }
            else{
                likeButton.innerText = 'Like'
            }
            likes.innerText = 'Likes: ' + information[1]
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function logOut(){
    /*
    Function: logOut
    The purpose of this function is to log the user out of the application. A get request is sent
    to the server to delete the user's cookie and session, then the user is redirected to the
    login page. Function takes no parameters and is called when the logout button is clicked.
    */
    let url = 'http://localhost:80/home/logout/'
    fetch(url)
    .then((response) => {
        console.log(response.text())    
        window.location.href = 'http://localhost:80/index.html'
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function getTheme(){
    /*
    Function: getTheme
    The purpose of this function is to change the css styling for the page based on the theme that
    the user has set. A get request is sent to the server to retreive the theme, then the styling
    is changed accordingly. The function has no parameters, and is called when the displayTextPost
    and displayMediaPost functions are called.
    */
    let url = 'http://localhost:80/get/theme/'
    fetch(url)
    .then((response) => {
        return response.text()   
    })
    .then((theme) =>{
        if (theme == 'dark'){
            document.body.classList.remove('light-mode'); 
            document.body.classList.add('dark-mode');
            sidebar.classList.add('dark-mode')
            sidebar.classList.remove('light-mode')
            for (i = 0; i < mediaPost.length; i++){
                mediaPost[i].classList.add('dark-mode')
                mediaPost[i].classList.remove('light-mode')
            }
            for (i = 0; i < textPost.length; i++){
                textPost[i].classList.add('dark-mode')
                textPost[i].classList.remove('light-mode')
            }
        }
        if (theme == 'light'){
            document.body.classList.remove('dark-mode'); 
            document.body.classList.add('light-mode');
            sidebar.classList.add('light-mode')
            sidebar.classList.remove('dark-mode')
        }
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

window.onload = () => {
    displayTextPosts()
    displayMediaPosts()
    getPFP()
}

logout.onclick = () => {
    logOut()
}

helpButton.onclick = () => {window.location.href = 'http://localhost:80/help.html'}
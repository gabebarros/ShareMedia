/*
    Name: Gabe Barros
    File description: search.js is a JavaScript file that uses AJAX and JS to perform several
    tasks on the search page of ShareMedia. Most of these things are also done on other pages
    (retreiving posts, pfp, etc.), but profile.js does these things in regards to a specific 
    account that the user specifies in the search bar.
*/
var searchBar = document.getElementById('searchBar')
var searchButton = document.getElementById('searchButton')
var textPosts = document.getElementById('textPosts')
var postPFP = document.getElementsByClassName('postPFP')
var interests = document.getElementById('interests')
var username = document.getElementById('username')
var bio = document.getElementById('bio')
var back = document.getElementById('back')
var mediaPost = document.getElementById('mediaPost')
var textPost = document.getElementById('textPost')

searchButton.onclick = () =>{
    // check if user exists
    p = checkUser(searchBar.value)
    // call functions with username
    p.then((result) =>{
        if (result != 'no user'){
            displayTextPosts(searchBar.value)
            displayMediaPosts(searchBar.value)
            getInterests(searchBar.value)
            getBio(searchBar.value)
            username.innerText = searchBar.value
        }
        else{
            alert('User not found!')
        }
    })
}

function getBio(user){
    /*
    Function: getBio
    The purpose of this function is to retreive the specified user's bio from the server. This is
    done with an AJAX get request. This information is then added to the DOM. The function has one
    parameter, user (username string), and is called when the search button is clicked, if the
    user exists.
    */
    let url = `http://localhost:80/search/get/bio/${user}/`
    fetch(url)
    .then((response) => {
        return response.text()   
    })
    .then((biotext) =>{
        if (biotext.length > 2){
            bio.innerText = `${JSON.parse(biotext)}`
        }
        else{
            bio.innerText = ''
        }
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function checkUser(user){
    /*
    Function: checkUser
    The purpose of this function is check if a user exists with a specific username. This is
    done with an AJAX get request. Based on the result, a string is returned. The function has one
    parameter, user (username string), and is called when the search button is clicked.
    */
    let url = `http://localhost:80/search/check/${user}/`
    return fetch(url)
    .then((response) => {
        return response.json()   
    })
    .then((acc) =>{
        if (acc == null){
            return 'no user'
        }
        else{
            return 'user found'
        }   
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function getInterests(user){
    /*
    Function: getInterests
    The purpose of this function is to retreive a specific user's interests from the server. This
    is done with an AJAX get request. This information is then added to the DOM. The function has
    one parameter: user (username string), and is called when the page loads.
    */
    let url = `http://localhost:80/search/get/interests/${user}`
    fetch(url)
    .then((response) => {
        return response.json()   
    })
    .then((interest) =>{
        if (interest.length == 0){
            interests.innerText = 'No interests'
        }
        else{
            interests.innerText = 'Interests:\n'
            for (i = 0; i < interest.length; i++){
                interests.innerText += `\n${interest[i]}\n`
            }
        }   
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function displayTextPosts(user){
    /*
    Function: displayTextPosts
    The purpose of this function is to send a get request to the server in order to retreive
    a specific user's text posts. After the posts string is received, the DOM is updated
    to display the posts. The function one parameter: user (username string), and is called
    when the page loads.
    */
    textPosts.innerHTML = ''
    let url = `http://localhost:80/search/get/posts/text/${user}/`
    fetch(url)
    .then((response) => {
        return response.text()    
    })
    .then((posts) =>{
        if (posts.length != 2){
            textPosts.innerHTML = JSON.parse(posts)
        }
        getPFP(user)
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function displayMediaPosts(user){
    /*
    Function: displayMediaPosts
    The purpose of this function is to send a get request to the server in order to retreive
    a specific user's media posts. After the posts string is received, the DOM is updated
    to display the posts. The function one parameter: user (username string), and is called
    when the page loads.
    */
    mediaPosts.innerHTML = ''
    let url = `http://localhost:80/search/get/posts/media/${user}`
    fetch(url)
    .then((response) => {
        return response.text()    
    })
    .then((posts) =>{
        if (posts.length != 2){
            mediaPosts.innerHTML = JSON.parse(posts)
        }
        getPFP(user)
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function getPFP(user){
    /*
    Function: getPFP
    The purpose of this function is to send a get request to the server in order to retreive
    a specific user's profile picture. After the profile picture string is received, the src
    for the pfp element is updated to show the actual picture. The function has one parameter: 
    user: (username string), and is called along with displayTextPosts and displayMediaPosts.
    */
    let url = `http://localhost:80/search/get/pfp/${user}`
    fetch(url)
    .then((response) => {
        return response.text()   
    })
    .then((pfpstring) =>{
        if (pfpstring != 'blank-profile-picture-973460_960_720.webp'){
            pfp.src = `uploads/images/${pfpstring.replace(/^"(.*)"$/, '$1')}`
            for (i = 0; i < postPFP.length; i++){
                postPFP[i].src = `uploads/images/${pfpstring.replace(/^"(.*)"$/, '$1')}`
            }
        }
    })
    .catch((error) => {
        alert('THERE WAS A PROBLEM');
        console.log(error);
    });
}

back.onclick = () =>{window.location.href = './home.html'}
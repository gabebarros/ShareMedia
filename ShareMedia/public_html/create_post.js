/*
    Name: Gabe Barros
    File description: create_post.js is a JavaScript file that uses AJAX to send information about
    posts to be created to the server. The file has only one function, createPost that is called
    when the post button is clicked. Clicking the cancel button redirects the user back to the
    home page.
*/
var imageInput = document.getElementById('imageInput')
var postTextbox = document.getElementById('postTextbox')
var cancel = document.getElementById('cancel')
var post = document.getElementById('postButton')
var postForm = document.getElementById('postForm')

function createPost(event){
    /*
    Function: createPost
    The purpose of this function is to send information about the post that is to be created to
    the server. This is done using an AJAX post request. An error message is sent if there was an
    error, and an error message is added to the DOM if the user tries to make a post without any
    text. This function has a parameter 'event' which is used to keep the page from refreshing
    when the request is sent. This function is called whenever the post button is clicked.
    */
    event.preventDefault()
    n = decodeURIComponent(document.cookie).split('=j:')
    username =  JSON.parse(n[1]).username
    const formData = new FormData(postForm)
    formData.append('user', username)
    let url = `http://localhost:80/home/posts/create/`
    fetch((url), {
        method: 'POST',
        body: formData
        })
        .then((response) => {
            return response.text();
        })
        .then((information) => {
            if (information == 'No User'){
                alert('Not logged in')
            }
            if (information == 'No Text'){
                alert('Post must contain text')
            }
            else{
            console.log(information)
            window.location.href = 'home.html'
            }
        })
        .catch((error) => {
            alert('THERE WAS A PROBLEM');
            console.log(error);
});}

cancel.onclick = () => {window.location.href = 'http://localhost:80/home.html'}
post.onclick = createPost
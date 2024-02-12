/*
    Name: Gabe Barros
    File description: login.js is a JavaScript file that uses AJAX to log a user in to the app 
    or create a new account. Two functions are included to do these things, respectively.
*/
var loginUsername = document.getElementById('loginUsername')
var loginPassword = document.getElementById('loginPassword')
var createAccUsername = document.getElementById('createAccUsername')
var createAccPassword = document.getElementById('createAccPassword')
var confirmPassword = document.getElementById('confirmPassword')
var loginButton = document.getElementById('loginButton')
var createAccButton = document.getElementById('createAccButton')
var errorLogin = document.getElementById('errorLogin')
var errorCreateAcc = document.getElementById('errorCreateAcc')

function login(){
    /*
    Function: login
    The purpose of this function is to log the user in to the application. An AJAX post request
    containing the login info is sent to the server. The server checks if this info is correct,
    and returns a message based on this. If the login is correct, the user is logged in and sent
    to the homepage, otherwise an error message is added to the DOM. The function has no 
    parameters, and is called when the login button is clicked.
    */
    info = {username: loginUsername.value, password: loginPassword.value}
    let url = 'http://localhost/home/login/'
    fetch((url), {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then((response) => {
        return (response.text())
    })
    .then((text) => {
        if (text == 'Success'){
            window.location.href = 'http://localhost:80/home.html'
        }
        else{
            errorLogin.innerText = 'Username or password is incorrect'
        }
    })
    .catch((error) => {
        console.log('THERE WAS A PROBLEM');
        console.log(error);
    });
}

function addUser(){
    /*
    Function: addUser
    The purpose of this function is to add a new user to the app. First, the password is checked 
    to see if it meets all the requirements. Then, an AJAX post request containing the login info
    is sent to the server. The server checks if the username is not taken, and if not, it creates
    the new user. If the username is taken, an alert is shown. The function has no 
    parameters, and is called when the create account button is clicked.
    */
    errorCreateAcc.innerText = ''
    var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    info = {username: createAccUsername.value, password: createAccPassword.value}
    if (createAccPassword.value.length < 8){
        errorCreateAcc.innerText += 'Password must be 8 characters\n'
    }
    if (specialCharacters.test(createAccPassword.value) == false){
        errorCreateAcc.innerText += 'Password must contain a special character\n'
    }
    if (createAccPassword.value == createAccPassword.value.toLowerCase()){
        errorCreateAcc.innerText += 'Password must contain an uppercase letter\n'
    }
    if (createAccPassword.value != confirmPassword.value){
        errorCreateAcc.innerText += 'Passwords do not match\n'
    }
    else{
        let url = 'http://localhost:80/home/adduser/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                return response.text();
            })
            .then((information) => {
                if (information == 'Username taken'){
                    alert('Username taken')
                }
                else{
                    alert('User Created!')
                }
            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
    }
}

loginButton.onclick = login
createAccButton.onclick = addUser
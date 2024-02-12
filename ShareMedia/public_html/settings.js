/*
    Name: Gabe Barros
    File description: settings.js is a JavaScript file that uses AJAX and JS to perform several
    tasks on the settings page of ShareMedia. This page adds html to the DOM when the sidebar
    buttons are clicked. This file includes functions for editing bio, changing profile picture, 
    changing password, etc.
*/
var backButton = document.getElementById('backButton')
var addInterestsButton = document.getElementById('addInterests')
var removeInterestsButton = document.getElementById('removeInterests')
var changePasswordButton = document.getElementById('changePassword')
var changeThemeButton = document.getElementById('changeTheme')
var changepfpButton = document.getElementById('changepfp')
var editBioButton = document.getElementById('editBioButton')
var backButton = document.getElementById('backButton')
var settingsDiv = document.getElementById('settingsDiv')
var addInterestInnerButton = document.getElementById('addInterestInnerButton')
var removeInterestInnerButton = document.getElementById('removeInterestInnerButton')
var changePasswordInnerButton = document.getElementById('changePasswordInnerButton')

// Add HTML to DOM when buttons are clicked
addInterestsButton.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Add Interests</h2>
    <h3 class="innerSetting">Enter new Interest:</h3>
    <input type="text" class="innerSetting" id="addInterestInput">
    <button class="innerSetting" id="addInterestInnerButton">Add Interest</button>`
}

removeInterestsButton.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Remove Interests</h2>
    <h3 class="innerSetting">Which interest would you like to remove?</h3>
    <input type="text" class="innerSetting" id="removeInterestInput">
    <button class="innerSetting" id="removeInterestInnerButton">Remove</button>`
}

changePasswordButton.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Change password</h2>
    <h3 class="innerSetting">Enter new Password:</h3>
    <input type="password" class="innerSetting" id="changePasswordInput">
    <h3 class="innerSetting">Confirm new Password:</h3>
    <input type="password" class="innerSetting" id="changePasswordInputConfirm">
    <button class="innerSetting" id="changePasswordInnerButton">Change Password</button>
    <div id="errorChangePassword"></div>`
}

changeThemeButton.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Change Theme</h2>
    <h3 class="innerSetting">Choose Theme:</h3>
    <input type="radio" id="lightTheme" name="theme" value="light">
    <label for="lightTheme">Light</label>
    <input type="radio" id="darkTheme" name="theme" value="dark">
    <label for="darkTheme">Dark</label>`
}

changepfp.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Change Profile Picture</h2>
    <h3 class="innerSetting">Upload image:</h3>
    <form enctype="multipart/form-data" id="changePfpForm">
        <input type="file" accept="image/*" id="imageInput" name="photo">
        <button id="changePfpInnerButton">Confirm</button>
    </form>`
}

editBio.onclick = () =>{
    settingsDiv.innerHTML = `<h2>Edit Bio</h2>
    <h3 class="innerSetting">Bio:</h3>
    <textarea name="text" id="bio" cols="30" rows="10"></textarea>
    <button id="editBioInnerButton">Confirm</button>
    `
}

function addInterest(){
    /*
    Function: addInterest
    The purpose of this function is to add an interest to the user's account. This is done using
    an AJAX post request to the server. This function takes no parameters and is called when the
    add interest button is clicked.
    */
    info = {interest: addInterestInput.value}
    let url = 'http://localhost:80/settings/add/interest/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                alert('Interest Added!')
            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
}
document.addEventListener('click', (event) => {
    if (event.target.id === 'addInterestInnerButton') {
        const addInterestInput = document.getElementById('addInterestInput');
        // check if addInterestInput exists
        if (addInterestInput) {
            addInterest();
        } else {
            console.error('addInterest not found');
        }
    }
});

function removeInterest(){
    /*
    Function: addInterest
    The purpose of this function is to remove an interest to the user's account. This is done 
    using an AJAX post request to the server. This function takes no parameters and is called
    when the add interest button is clicked. If no interest exists, an alert is sent to the user.
    */
    info = {interest: removeInterestInput.value}
    let url = 'http://localhost:80/settings/remove/interest/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                return response.text()
            })
            .then((text) =>{
                if (text == 'removed'){
                    alert('Interest removed!')
                }
                else{
                    alert('Interest not found')
                }
            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
}
document.addEventListener('click', (event) => {
    if (event.target.id === 'removeInterestInnerButton') {
        // Check if removeInterestInput exists
        const removeInterestInput = document.getElementById('removeInterestInput');
        if (removeInterestInput) {
            removeInterest();
        } else {
            console.error('removeInterest not found');
        }
    }
});

document.addEventListener('click', (event) => {
    if (event.target.id === 'darkTheme') {
        changeTheme('dark')
    }
    if (event.target.id === 'lightTheme') {
        changeTheme('light')
    }
});

function changeTheme(theme){
    /*
    Function: changeTheme
    The purpose of this function is to change the user's theme. This is done 
    using an AJAX post request to the server. This function takes one parameter: theme (string) 
    and is called when the add interest button is clicked. 
    */
    info = {theme: theme}
    let url = 'http://localhost:80/settings/change/theme/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                return response.text()
            })
            .then((message) => {
                console.log(message)
            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
}

document.addEventListener('click', (event) => {
    if (event.target.id === 'changePfpInnerButton') {
        // Check if imageInput exists
        const image = document.getElementById('imageInput');
        if (image) {
            changePFP(event);
        } else {
            console.error('image not found');
        }
    }
});

function changePFP(event){
    /*
    Function: changePFP
    The purpose of this function is to change the user's profile picture. This is done 
    using an AJAX post request to send the form data to the server. This function takes
    one parameter: event and is called when the change profile picture button is clicked. 
    */
    event.preventDefault()
    var changePfpForm = document.getElementById('changePfpForm')
    n = decodeURIComponent(document.cookie).split('=j:')
    username =  JSON.parse(n[1]).username
    const formData = new FormData(changePfpForm)
    formData.append('user', username)
    let url = `http://localhost:80/settings/change/pfp/`
    fetch((url), {
        method: 'POST',
        body: formData
        })
        .then((response) => {
            return response.text();
        })
        .then((information) => {
            if (information == 'no image'){
                alert('No image')
            }
            if (information == 'pfp updated'){
                alert('Profile Picture Updated')
            }
            else{
            console.log(information)
            }
        })
        .catch((error) => {
            alert('THERE WAS A PROBLEM');
            console.log(error);
});}

document.addEventListener('click', (event) => {
    if (event.target.id === 'editBioInnerButton') {
        // Check if bio exists
        const bio = document.getElementById('bio');
        if (bio) {
            changeBio();
        } else {
            console.error('bio not found');
        }
    }
});

function changeBio(){
    /*
    Function: changeBio
    The purpose of this function is to change the user's bio. This is done 
    using an AJAX post request to the server. This function takes
    no parameters and is called when the change bio button is clicked. 
    */
    info = {bio: bio.value}
    let url = 'http://localhost:80/settings/change/bio/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                return response.text()
            })
            .then((message) => {
                console.log(message)
                alert('Bio changed!')
            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
}


function changePassword(){
    /*
    Function: changePassword
    The purpose of this function is to change the user's password. This is done 
    using an AJAX post request to the server. This function takes no parameters and is called
    when the change password button is clicked. 
    */
    info = {password: changePasswordInput.value}
    let url = 'http://localhost:80/settings/change/password/'
        fetch((url), {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
            })
            .then((response) => {
                return response.text()
            })
            .then((message) => {
                if (message == 'passwords are the same'){
                    alert('Password must be different than current password')
                }
                if (message == 'password changed'){
                    alert('Password changed successfully!')
                }

            })
            .catch((error) => {
                console.log('THERE WAS A PROBLEM');
                console.log(error);
            });
}

document.addEventListener('click', (event) => {
    if (event.target.id === 'changePasswordInnerButton') {
        // Check if changePasswordInput exists
        const changePasswordInput = document.getElementById('changePasswordInput');
        const changePasswordInputConfirm = document.getElementById('changePasswordInputConfirm')
        const errorChangePassword = document.getElementById('errorChangePassword')
        errorChangePassword.innerText = ''
        var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        if (changePasswordInput && changePasswordInputConfirm) {
            if (changePasswordInput.value != changePasswordInputConfirm.value){
                errorChangePassword.innerText += 'Passwords do not match\n'
            }
            else if (changePasswordInput.value.length < 8){
                errorChangePassword.innerText += 'Password must be 8 characters\n'
            }
            else if (specialCharacters.test(changePasswordInput.value) == false){
                errorChangePassword.innerText += 'Password must contain a special character\n'
            }
            else if (changePasswordInput.value == changePasswordInput.value.toLowerCase()){
                errorChangePassword.innerText += 'Password must contain an uppercase letter\n'
            }
            else {
            changePassword()
            }
    }
}});

backButton.onclick = () => {window.location.href = 'http://localhost:80/profile.html'}
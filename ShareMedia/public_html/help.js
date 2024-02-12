/*
    Name: Gabe Barros
    File description: help.js is a JavaScript file that contains JS code for the help page of
    ShareMedia. There are no functions, the only code contained is to add the collapsible effect
    to the buttons, and to redirect back to the home page.
*/
var homeButton = document.getElementById("homeButton")
var helpSubject = document.getElementsByClassName("helpSubject");

for (i = 0; i < helpSubject.length; i++) {
    helpSubject[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

homeButton.onclick = () =>{
    window.location.href = "http://localhost:80/home.html"
}
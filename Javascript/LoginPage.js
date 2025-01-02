/*function redirectToPage() {
           window.location.href = "Transactions.html";
       }
       document.getElementById('signupText').addEventListener('click', () => {
           document.getElementById('loginForm').style.display = 'none';
           document.getElementById('signupForm').style.display = 'block';
       });

       document.getElementById('loginText').addEventListener('click', () => {
           document.getElementById('signupForm').style.display = 'none';
           document.getElementById('loginForm').style.display = 'block';
       });
*/


document.getElementById('SwipeBtn_image').addEventListener('click', function (event) {
    event.preventDefault();
    // Prevent form submission 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Retrieve stored user input from localStorage 
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    // Check if the entered credentials match the stored credentials 
    if (username === storedUsername && password === storedPassword) {
        //alert('Login Successful!');
        // Redirect to another page 
        window.location.href = 'Balance&Budgets.html'; L
    } else {
        alert('Invalid Username or Password');
    }
});

document.querySelector(".cancelButton").addEventListener('click', function () { window.location.href = 'index.html'; });
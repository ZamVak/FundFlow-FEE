// quick way to go to transaction page 
/* function redirectToPage() {
     window.location.href = "Transaction.html";
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
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Store user input in localStorage 
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    alert('Sign-Up Successful!');
    // Redirect to login page 
    window.location.href = 'LoginPage.html';
});

document.querySelector(".cancelButton").addEventListener('click', function () { window.location.href = 'index.html'; });
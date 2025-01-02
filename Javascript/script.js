document.querySelector('.Login_button').addEventListener('mouseout', function () {
    const signupButton = document.querySelector('.Signup_button');
    const loginButton = document.querySelector('.Login_button');
    loginButton.classList.add('Login_buttonStyle');
    loginButton.classList.remove('Signup_buttonStyle');
    signupButton.classList.add('Signup_buttonStyle');
    signupButton.classList.remove('Login_buttonStyle');
});

document.querySelector('.Login_button').addEventListener('mouseover', function () {
    const signupButton = document.querySelector('.Signup_button');
    const loginButton = document.querySelector('.Login_button');
    loginButton.classList.remove('Login_buttonStyle');
    loginButton.classList.add('Signup_buttonStyle');
    signupButton.classList.remove('Signup_buttonStyle');
    signupButton.classList.add('Login_buttonStyle');
});
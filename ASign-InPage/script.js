const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('pwd');
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');

let isLoginMode = true;
const toggleAuthMode = document.getElementById('toggleAuthMode');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const submitBtn = document.getElementById('submitBtn');

const emailGroup = document.getElementById('emailGroup');
const genderGroup = document.getElementById('genderGroup');

if(togglePassword) {
    togglePassword.addEventListener('click', function (e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
}

// Auth Mode Toggle
if(toggleAuthMode) {
    toggleAuthMode.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        if(isLoginMode) {
            formTitle.textContent = "Sign In";
            formSubtitle.textContent = "Enter your details to access your account.";
            submitBtn.textContent = "Login to Eventra";
            toggleAuthMode.textContent = "Need an account? Register";
            
            emailGroup.style.display = 'none';
            genderGroup.style.display = 'none';
            email.removeAttribute('required');
        } else {
            formTitle.textContent = "Create Account";
            formSubtitle.textContent = "Join the biggest event platform in Nepal.";
            submitBtn.textContent = "Register Now";
            toggleAuthMode.textContent = "Already have an account? Login";
            
            emailGroup.style.display = 'block';
            genderGroup.style.display = 'flex';
            email.setAttribute('required', 'true');
        }
    });
}

function checkLoginState() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if(activeUser) {
        window.location.href = "../mainEvent/profile.html";
    }
}

// Form Submit (Login / Register logic)
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        if (username.value.length < 3) {
            username.style.borderColor = 'red';
            isValid = false;
        }
        if (password.value.length < 6) {
            password.style.borderColor = 'red';
            isValid = false;
        }

        if(!isValid) {
            alert("Please accurately fulfill all required fields.");
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};

        if(!isLoginMode) {
            // Register Logic
            if(users[username.value]) {
                alert('Username already exists! Please login instead.');
                return;
            }
            users[username.value] = {
                password: password.value,
                email: email.value,
                tickets: [],
                hosted: []
            };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('activeUser', JSON.stringify({username: username.value}));
            
        } else {
            // Login Logic
            if(!users[username.value] || users[username.value].password !== password.value) {
                alert('Invalid username or password!');
                return;
            }
            localStorage.setItem('activeUser', JSON.stringify({username: username.value}));
        }
        
        checkLoginState();
    });
}

// Run check on load to immediately redirect logged in user
checkLoginState();
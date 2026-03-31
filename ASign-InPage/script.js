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

// ── Helpers ──────────────────────────────────────────────────────────────────
/**
 * Self-Repair Helper: Cleans up any corrupted localStorage data on load.
 */
function repairStorage() {
    try {
        const usersRaw = localStorage.getItem('users');
        if (usersRaw) {
            const parsed = JSON.parse(usersRaw);
            // If users was stored as an array or something else, fix it immediately
            if (Array.isArray(parsed) || typeof parsed !== 'object') {
                console.warn("Corrupted 'users' data detected. repairing...");
                localStorage.setItem('users', JSON.stringify({}));
            }
        } else {
            localStorage.setItem('users', JSON.stringify({}));
        }
    } catch (e) {
        localStorage.setItem('users', JSON.stringify({}));
    }
}

// Run repair on file load
repairStorage();

/**
 * Safely parses JSON from localStorage or returns a default value.
 */
function safeJSONParse(key, defaultValue = {}) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        const parsed = JSON.parse(item);
        // If we expect an object but get something else (like an array stored as users), revert to default
        if (defaultValue !== null && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
             if (Array.isArray(parsed) || typeof parsed !== 'object') return defaultValue;
        }
        return parsed;
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return defaultValue;
    }
}

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
    const activeUser = safeJSONParse('activeUser', null);
    if(activeUser && activeUser.username) {
        // Redundant nav update for immediate feedback
        const loginBtns = document.querySelectorAll('.login-btn');
        loginBtns.forEach(btn => {
            btn.innerHTML = `<i class="fa fa-user-circle"></i> Hi, ${activeUser.username}`;
            btn.href = "../mainEvent/profile.html";
        });

        setTimeout(() => {
            window.location.href = "../mainEvent/profile.html";
        }, 100);
    }
}

// Form Submit (Login / Register logic)
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        if (username.value.trim().length < 3) {
            username.style.borderColor = 'red';
            isValid = false;
        } else {
            username.style.borderColor = '';
        }
        if (password.value.length < 6) {
            password.style.borderColor = 'red';
            isValid = false;
        } else {
            password.style.borderColor = '';
        }

        if(!isValid) {
            alert("Please fulfill all fields correctly (Username: 3+ chars, Password: 6+ chars).");
            return;
        }

        let users = safeJSONParse('users', {});

        if(!isLoginMode) {
            // Register Logic
            if(users[username.value]) {
                alert('Username already exists! Please login instead.');
                return;
            }
            users[username.value] = {
                password: password.value,
                email: email.value || '',
                tickets: [],
                hosted: []
            };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('activeUser', JSON.stringify({username: username.value}));
            alert('Registration Successful! Sending you to your dashboard...');
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

// Run check on load
checkLoginState();
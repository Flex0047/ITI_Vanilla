// Authentication JavaScript for Login and Sign-up pages

document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Sign-up form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        const passwordStrength = document.getElementById('passwordStrength');
        
        if (passwordInput && passwordStrength) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }

        // Confirm password validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                validatePasswordMatch();
            });
        }
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });
});

// Login form handler
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    clearErrors();
    
    // Basic validation
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return;
    }
    
    // Show loading state
    showLoading('loginForm');
    
    // Simulate API call
    setTimeout(() => {
        // Check if user exists in localStorage (for demo purposes)
        const users = JSON.parse(localStorage.getItem('learnspace_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Successful login
            const loginData = {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    interests: user.interests
                },
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };
            
            localStorage.setItem('learnspace_auth', JSON.stringify(loginData));
            
            showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            hideLoading('loginForm');
            showError('passwordError', 'Invalid email or password');
        }
    }, 1500);
}

// Sign-up form handler
function handleSignup() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const interests = document.getElementById('interests').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Clear previous errors
    clearErrors();
    
    // Validation
    let hasErrors = false;
    
    if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        hasErrors = true;
    }
    
    if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        hasErrors = true;
    }
    
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        hasErrors = true;
    }
    
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        hasErrors = true;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        hasErrors = true;
    }
    
    if (!agreeTerms) {
        showError('agreeTerms', 'You must agree to the terms and conditions');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('learnspace_users') || '[]');
    if (users.find(u => u.email === email)) {
        showError('emailError', 'An account with this email already exists');
        return;
    }
    
    // Show loading state
    showLoading('signupForm');
    
    // Simulate API call
    setTimeout(() => {
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password, // In real app, this would be hashed
            interests,
            newsletter,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('learnspace_users', JSON.stringify(users));
        
        // Auto-login the user
        const loginData = {
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                interests: newUser.interests
            },
            loginTime: new Date().toISOString(),
            rememberMe: false
        };
        
        localStorage.setItem('learnspace_auth', JSON.stringify(loginData));
        
        showSuccess('Account created successfully! Redirecting...');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// Social login handler
function handleSocialLogin(provider) {
    showSuccess(`${provider} login would be implemented here`);
    
    // In a real application, this would redirect to the OAuth provider
    setTimeout(() => {
        // Simulate successful social login
        const mockUser = {
            id: Date.now().toString(),
            email: `user@${provider.toLowerCase()}.com`,
            firstName: 'Social',
            lastName: 'User',
            interests: ''
        };
        
        const loginData = {
            user: mockUser,
            loginTime: new Date().toISOString(),
            rememberMe: false,
            provider: provider
        };
        
        localStorage.setItem('learnspace_auth', JSON.stringify(loginData));
        window.location.href = 'index.html';
    }, 1500);
}

// Password strength checker
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let text = 'Very Weak';
    let color = '#ff4757';
    
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    switch (strength) {
        case 0:
        case 1:
            text = 'Very Weak';
            color = '#ff4757';
            break;
        case 2:
            text = 'Weak';
            color = '#ff6b6b';
            break;
        case 3:
            text = 'Fair';
            color = '#ffa502';
            break;
        case 4:
            text = 'Good';
            color = '#26de81';
            break;
        case 5:
            text = 'Strong';
            color = '#20bf6b';
            break;
    }
    
    strengthBar.style.width = `${(strength / 5) * 100}%`;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

// Password match validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('confirmPasswordError');
    
    if (confirmPassword && password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
    } else {
        errorElement.textContent = '';
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error handling
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Loading states
function showLoading(formId) {
    const form = document.getElementById(formId);
    const btnText = form.querySelector('.btn-text');
    const btnLoading = form.querySelector('.btn-loading');
    const submitBtn = form.querySelector('.auth-btn');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
}

function hideLoading(formId) {
    const form = document.getElementById(formId);
    const btnText = form.querySelector('.btn-text');
    const btnLoading = form.querySelector('.btn-loading');
    const submitBtn = form.querySelector('.auth-btn');
    
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
}

// Success message
function showSuccess(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #20bf6b;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(32, 191, 107, 0.3);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Check if user is already logged in
function checkAuthStatus() {
    const auth = localStorage.getItem('learnspace_auth');
    if (auth) {
        const authData = JSON.parse(auth);
        // Update navigation to show user info
        updateNavForLoggedInUser(authData.user);
    }
}

// Update navigation for logged-in users
function updateNavForLoggedInUser(user) {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.cta-btn');
    
    if (loginBtn && signupBtn) {
        loginBtn.textContent = `Hi, ${user.firstName}`;
        loginBtn.onclick = () => showUserMenu();
        
        signupBtn.textContent = 'Logout';
        signupBtn.onclick = () => logout();
    }
}

// User menu (placeholder)
function showUserMenu() {
    alert('User menu would be implemented here');
}

// Logout functionality
function logout() {
    localStorage.removeItem('learnspace_auth');
    window.location.href = 'index.html';
}

// Initialize auth status check
checkAuthStatus();


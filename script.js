document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. EVENT HANDLING
    // ======================
    
    // Hover effect on subtitle
    const subtitle = document.querySelector('.subtitle');
    subtitle.addEventListener('mouseenter', function() {
        subtitle.textContent = "You found the hover effect! 🎉";
        subtitle.style.color = "#f1c40f";
        subtitle.style.fontWeight = "bold";
    });
    
    subtitle.addEventListener('mouseleave', function() {
        this.textContent = "Hover over me to see a surprise!";
        this.style.color = "";
        this.style.fontWeight = "";
    });
    
    // Button color changer
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    const button_output = document.getElementById('button-output') 
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
         colorChanger.style.backgroundColor = colors[colorIndex];
          button_output.textContent = `Button color changed `;
    });
    
    // Secret double click button
    const secretButton = document.getElementById('secret-button');
    secretButton.addEventListener('dblclick', function() {
        createConfetti();
        document.getElementById('button-output').textContent = "🎉 Secret double click activated! 🎉";
    });
    
    // Keypress detection
    document.addEventListener('keydown', function(e) {
        const output = document.getElementById('button-output');
        output.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // ======================
    // 2. INTERACTIVE ELEMENTS
    // ======================
    
    // Image gallery
    const images = document.querySelectorAll('.gallery-container img');
    let currentImage = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }
    
    document.getElementById('next-btn').addEventListener('click', function() {
        currentImage = (currentImage + 1) % images.length;
        showImage(currentImage);
    });
    
    document.getElementById('prev-btn').addEventListener('click', function() {
        currentImage = (currentImage - 1 ) % images.length;
        showImage(currentImage);
    });
    
    // Auto-rotate gallery
    let galleryInterval = setInterval(() => {
        currentImage = (currentImage + 1) % images.length;
        showImage(currentImage);
    }, 3000);
    
    // Pause auto-rotate on hover
    const gallery = document.querySelector('.gallery-container');
    gallery.addEventListener('mouseenter', () => clearInterval(galleryInterval));
    gallery.addEventListener('mouseleave', () => {
        galleryInterval = setInterval(() => {
            currentImage = (currentImage + 1) % images.length;
            showImage(currentImage);
        }, 3000);
    });
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ======================
    // 3. FORM VALIDATION
    // ======================
    
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const error = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            error.textContent = 'Name is required';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const error = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            error.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            error.textContent = 'Please enter a valid email';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const error = document.getElementById('password-error');
        const lengthRule = document.getElementById('length-rule');
        const numberRule = document.getElementById('number-rule');
        const hasNumber = /\d/.test(passwordInput.value);
        
        // Validate length
        if (passwordInput.value.length >= 8) {
            lengthRule.classList.add('valid');
        } else {
            lengthRule.classList.remove('valid');
        }
        
        // Validate number
        if (hasNumber) {
            numberRule.classList.add('valid');
        } else {
            numberRule.classList.remove('valid');
        }
        
        if (passwordInput.value.trim() === '') {
            error.textContent = 'Password is required';
            return false;
        } else if (passwordInput.value.length < 8) {
            error.textContent = 'Password must be at least 8 characters';
            return false;
        } else if (!hasNumber) {
            error.textContent = 'Password must contain at least 1 number';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            createConfetti();
            form.reset();
            document.querySelectorAll('.password-rules li').forEach(li => {
                li.classList.remove('valid');
            });
        } else {
            alert('Please fix the errors in the form');
        }
    });
    
    // ======================
    // BONUS: Confetti Effect
    // ======================
    function createConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            document.getElementById('confetti-container').appendChild(confetti);
            
            const animationDuration = Math.random() * 3 + 2;
            
            confetti.animate([
                { top: -10 + 'px', opacity: 1 },
                { top: window.innerHeight + 'px', opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                fill: 'forwards'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }
    }
});
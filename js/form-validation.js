/*
  Sweet Crumbs Bakery - Form Validation
  Author: Web Developer
  Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (validateForm(name, email, message)) {
            // In a real application, this would submit to a server
            // For now, we'll simulate a successful submission
            simulateFormSubmission(name, email, phone, subject, message);
        }
    });
    
    // Form validation
    function validateForm(name, email, message) {
        // Reset previous error messages
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        formStatus.style.display = 'none';
        
        // Validate name
        if (name === '') {
            showError('Please enter your name');
            return false;
        }
        
        // Validate email
        if (email === '') {
            showError('Please enter your email address');
            return false;
        } else if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        
        // Validate message
        if (message === '') {
            showError('Please enter your message');
            return false;
        }
        
        return true;
    }
    
    // Show error message with animation
    function showError(message) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        formStatus.style.display = 'block';
        formStatus.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            formStatus.style.animation = '';
        }, 500);
    }
    
    // Show success message with animation
    function showSuccess(message) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        formStatus.style.display = 'block';
        formStatus.style.animation = 'fadeIn 0.5s ease-in-out';
    }
    
    // Email validation regex
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simulate form submission (in a real application, this would send data to a server)
    function simulateFormSubmission(name, email, phone, subject, message) {
        // Show loading state with animation
        formStatus.className = 'form-status';
        formStatus.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Sending your message...</span>
        `;
        formStatus.style.display = 'flex';
        
        // Disable the submit button during "submission"
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate network delay
        setTimeout(function() {
            // Clear form fields
            contactForm.reset();
            
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Show success message
            showSuccess('Thank you for your message! We will get back to you soon.');
            
            // Log the data (for demonstration purposes only)
            console.log('Form submitted with data:', {
                name,
                email,
                phone,
                subject,
                message
            });
        }, 1500);
    }
    
    // Real-time form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput && emailInput && messageInput) {
        // Validate name on blur
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
        
        // Validate email on blur
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email === '' || !isValidEmail(email)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
        
        // Validate message on blur
        messageInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

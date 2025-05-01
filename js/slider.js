/*
  Sweet Crumbs Bakery - Testimonial Slider
  Author: Web Developer
  Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize the slider
    function initSlider() {
        // Set first slide and dot as active
        showSlide(currentSlide);
        
        // Start automatic slide show
        startSlideShow();
        
        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                startSlideShow();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                startSlideShow();
            });
        }
        
        // Add event listeners to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                currentSlide = parseInt(this.getAttribute('data-index'));
                showSlide(currentSlide);
                startSlideShow();
            });
        });
    }
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start automatic slideshow
    function startSlideShow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        
        // Set new interval
        slideInterval = setInterval(function() {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Initialize when DOM is loaded
    initSlider();
    
    // Pause slideshow on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            startSlideShow();
        });
    }
    
    // Handle visibility change (if user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startSlideShow();
        }
    });
});

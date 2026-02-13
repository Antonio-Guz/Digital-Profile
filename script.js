// Wait for DOM to load
document.addEventListener('DOMContentDidLoad', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all image sliders
    initializeSliders();
    
    // Add touch/swipe support for mobile
    addTouchSupport();
});

// Function to initialize all sliders
function initializeSliders() {
    // Get all sliders on the page
    const sliders = document.querySelectorAll('.card-image-slider');
    
    sliders.forEach(slider => {
        // Get elements for this specific slider
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dots = slider.querySelectorAll('.dot');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Function to update slider position
        function updateSlider() {
            // Move track to show current slide
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update slide active state
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // Auto-advance slides (optional - comment out if not wanted)
        // setInterval(nextSlide, 5000);
    });
}

// Add touch/swipe support for mobile
function addTouchSupport() {
    const sliders = document.querySelectorAll('.card-image-slider');
    
    sliders.forEach(slider => {
        let startX = 0;
        let endX = 0;
        
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchmove', function(e) {
            endX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', function() {
            const threshold = 50; // Minimum swipe distance
            
            // Swipe left (next slide)
            if (startX - endX > threshold) {
                const nextBtn = this.querySelector('.next-btn');
                if (nextBtn) nextBtn.click();
            }
            
            // Swipe right (previous slide)
            if (endX - startX > threshold) {
                const prevBtn = this.querySelector('.prev-btn');
                if (prevBtn) prevBtn.click();
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const watchBtn = document.getElementById('watchBtn');
    const timerModal = document.getElementById('timerModal');
    const countdownElement = document.getElementById('countdown');
    const countdownTextElement = document.getElementById('countdownText');
    const loadingProgress = document.getElementById('loadingProgress');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Target URL to redirect to
    const redirectUrl = 'https://123moviesfree.bitbucket.io/';
    
    // Timer duration in seconds
    let timerDuration = 5;
    let currentTime = timerDuration;
    let timerInterval;
    
    // Watch button click handler
    watchBtn.addEventListener('click', function() {
        showTimerModal();
        startCountdown();
    });
    
    // One Piece button click handler
    const onePieceBtn = document.querySelector('.btn-primary');
    if (onePieceBtn) {
        onePieceBtn.addEventListener('click', function() {
            showTimerModal(10); // 10 second timer for One Piece button
            startCountdown(10);
        });
    }
    
    // Show the timer modal
    function showTimerModal(customDuration = timerDuration) {
        timerModal.style.display = 'block';
        
        // Reset timer values
        currentTime = customDuration;
        countdownElement.textContent = currentTime;
        countdownTextElement.textContent = currentTime;
        loadingProgress.style.width = '0%';
    }
    
    // Start the countdown timer
    function startCountdown(customDuration = timerDuration) {
        const totalDuration = customDuration;
        timerInterval = setInterval(function() {
            currentTime--;
            
            // Update countdown display
            countdownElement.textContent = currentTime;
            countdownTextElement.textContent = currentTime;
            
            // Update progress bar
            const progressPercentage = ((totalDuration - currentTime) / totalDuration) * 100;
            loadingProgress.style.width = progressPercentage + '%';
            
            // Add animation effects
            if (currentTime <= 3) {
                countdownElement.style.color = '#ff4444';
                countdownElement.style.animation = 'pulse 0.5s ease-in-out';
            }
            
            // When timer reaches 0, redirect
            if (currentTime <= 0) {
                clearInterval(timerInterval);
                redirectToSite();
            }
        }, 1000);
    }
    
    // Redirect to the target site
    function redirectToSite() {
        // Add a brief delay for better UX
        setTimeout(function() {
            window.location.href = redirectUrl;
        }, 500);
    }
    
    // Close modal when clicking outside of it
    timerModal.addEventListener('click', function(event) {
        if (event.target === timerModal) {
            closeModal();
        }
    });
    
    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal function
    function closeModal() {
        timerModal.style.display = 'none';
        
        // Clear the timer if it's running
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Reset styles
        countdownElement.style.color = '#ffd700';
        countdownElement.style.animation = 'none';
    }
    
    // Handle escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && timerModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Add some interactive effects to other buttons
    const allButtons = document.querySelectorAll('.btn, .search-btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search functionality (basic)
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // For demo purposes, just show an alert
            // In a real application, this would perform actual search
            alert(`Searching for: "${searchTerm}". This is a demo - search functionality would be implemented here.`);
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to the page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .content-section > div {
        animation: fadeIn 0.6s ease-out;
    }
`;
document.head.appendChild(style);
/**
 * Adhvaga Platform - Main Logic Script
 * Author: Reddappa M R
 */

document.addEventListener('DOMContentLoaded', () => {
    initGreeting();
    initAccordions();
    initScrollEffects();
});

/**
 * 1. Time-based Dynamic Greeting
 * Updates the 'Namaskaram' text based on Bengaluru time.
 */
function initGreeting() {
    const greetingElement = document.querySelector('.nav-greeting');
    if (!greetingElement) return;

    const hours = new Date().getHours();
    let message = "Namaskaram"; // Default

    if (hours >= 5 && hours < 12) {
        message = "Shubhodaya"; // Good Morning
    } else if (hours >= 12 && hours < 17) {
        message = "Namaskaram"; // Good Afternoon/Evening
    } else if (hours >= 17 && hours < 21) {
        message = "Shubhasanje"; // Good Evening
    } else {
        message = "Shubharatri"; // Good Night
    }

    greetingElement.innerText = message;
}

/**
 * 2. Accordion Logic (Q&A Sections)
 * Handles expanding/collapsing of technical notes.
 */
function initAccordions() {
    // We use event delegation to handle clicks efficiently
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const item = header.parentElement;
        const container = item.parentElement;
        const isActive = item.classList.contains('active');

        // Optional: Close other open items in the same container
        container.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
}

/**
 * 3. Scroll Reveal Effect
 * Adds a subtle fade-in as you scroll down the blog or portfolio.
 */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Apply to sections and cards
    const elements = document.querySelectorAll('section, .project-card, .spark-box');
    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
}
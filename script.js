    var swiper = new Swiper(".mySwiper", {
      speed: 1500,
      parallax: true,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
});

$('nav ul li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});


// Get the navbar element
const navbar = document.querySelector('nav');

let lastScrollY = window.scrollY; // Store the last scroll position

// Function to handle the scroll events
function handleScroll() {
    // When the page is scrolled down
    if (window.scrollY > lastScrollY) {
        // Add the 'hidden' class to hide the navbar
        navbar.classList.add('hidden');
    } else {
        // When scrolling up, show the navbar again
        navbar.classList.remove('hidden');
    }

    // Change color when scrolling
    if (window.scrollY > 50) {  // Change 50 to adjust the scroll threshold
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update last scroll position to the current scroll position
    lastScrollY = window.scrollY;
}

// Listen for the scroll event
window.addEventListener('scroll', handleScroll);






function animateCounter(element) {
  // Get the target value from the data-count attribute
  let target = element.getAttribute('data-count');
  
  // Remove commas for calculation and parse the number (allow for floating point numbers)
  let targetNumber = parseFloat(target.replace(/,/g, ''));

  let count = 0;
  let increment = targetNumber / 100;

  let interval = setInterval(function () {
    count += increment;
    if (count >= targetNumber) {
      count = targetNumber;
      clearInterval(interval);
    }

    // Format the number with commas and ensure it has the same decimal places as the original
    element.textContent = formatNumber(count, target);
  }, 30);
}

// Function to format the number (with commas and decimal points)
function formatNumber(number, original) {
  // Get the number of decimal places in the original value
  const decimals = (original.split('.')[1] || []).length;

  // Format the number with commas for thousands
  let formatted = number.toLocaleString();

  // If the original number had decimal places, ensure the formatted number matches
  if (decimals > 0) {
    formatted = parseFloat(formatted).toFixed(decimals); // Round to original decimal places
  }

  return formatted;
}
// Function to trigger animations when section is visible
function onSectionVisible(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start the animation when the section is in view
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => animateCounter(counter));

      // Remove the observer after the animation has started
      observer.unobserve(entry.target);

      // Set opacity to 1 for the section to fade in
      entry.target.style.opacity = '1';
    }
  });
}

// Set up the IntersectionObserver
const observer = new IntersectionObserver(onSectionVisible, {
  threshold: 0.5 // Trigger when 50% of the section is in view
});

// Start observing the counter section
const counterSection = document.querySelector('#counter-section');
const counterSection2 = document.querySelector('#counter-section2');
observer.observe(counterSection);
observer.observe(counterSection2);


AOS.init();
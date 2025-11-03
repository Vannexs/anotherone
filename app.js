document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page with a package container
    const packageContainer = document.querySelector('.package-container');
    if (packageContainer) {
        loadPackages(packageContainer);
    }

    // Check if we are on the contact page with a form
    const contactForm = document.querySelector('#contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

function loadPackages(container) {
    fetch('packages.json')
        .then(response => response.json())
        .then(packages => {
            // Check if this is the homepage by looking for the hero section
            const isHomePage = document.querySelector('.hero');
            const packagesToDisplay = isHomePage ? packages.slice(0, 3) : packages;

            packagesToDisplay.forEach(pkg => {
                const packageElement = document.createElement('div');
                packageElement.classList.add('package');
                packageElement.innerHTML = `
                    <h3>${pkg.name}</h3>
                    <p>${pkg.description}</p>
                    <p class="price">$${pkg.price}</p>
                    <button class="book-now-button">Book Now</button>
                `;
                container.appendChild(packageElement);
            });

            addPackageEventListeners();
        });
}

function addPackageEventListeners() {
    // Mouseover effect for safari packages
    document.querySelectorAll('.package').forEach(pkg => {
        pkg.addEventListener('mouseover', () => {
            pkg.style.transform = 'scale(1.05)';
            pkg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        pkg.addEventListener('mouseout', () => {
            pkg.style.transform = 'scale(1)';
            pkg.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // "Book Now" button alert
    document.querySelectorAll('.book-now-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Thank you for your interest! This feature is coming soon.');
        });
    });
}

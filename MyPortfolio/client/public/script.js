// Projects Data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-featured online store with cart, checkout, and payment integration.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["React", "Node.js", "Stripe"],
        category: "Web App",
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 2,
        title: "Analytics Dashboard",
        description: "Real-time data visualization tool for business intelligence and reporting.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["Vue.js", "D3.js", "Python"],
        category: "SaaS",
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Social Network App",
        description: "Community platform with real-time messaging and content sharing features.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["Next.js", "Socket.io", "MongoDB"],
        category: "Social",
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 4,
        title: "Task Manager Pro",
        description: "Intuitive project management tool with drag-and-drop functionality.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["React", "Firebase", "TypeScript"],
        category: "Productivity",
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 5,
        title: "Modern Blog Platform",
        description: "Content management system with markdown support and SEO optimization.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["Next.js", "MDX", "Prisma"],
        category: "CMS",
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 6,
        title: "Weather Forecast App",
        description: "Beautiful weather application with detailed forecasts and location search.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        tags: ["React", "Weather API", "Chart.js"],
        category: "API",
        demoUrl: "#",
        githubUrl: "#"
    }
];

// DOM Elements - will be initialized after DOM loads
let navbar, navLinks, mobileMenuToggle, navMenu, projectsGrid, contactForm, toast;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements after page loads
    navbar = document.getElementById('navbar');
    navLinks = document.querySelectorAll('.nav-link');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    navMenu = document.getElementById('navMenu');
    projectsGrid = document.getElementById('projectsGrid');
    contactForm = document.getElementById('contactForm');
    toast = document.getElementById('toast');
    
    renderProjects();
    setupNavigation();
    setupMobileMenu();
    setupScrollEffects();
    setupContactForm();
});

// Render Projects
function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-testid="project-${project.id}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <div class="project-tags">
                    <span class="project-tag category">${project.category}</span>
                    <span class="project-tag tech">${project.tags[0]}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <a href="${project.demoUrl}" class="project-link" data-testid="project-${project.id}-demo">
                        View Demo
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                    <a href="${project.githubUrl}" class="project-link" data-testid="project-${project.id}-github">
                        GitHub
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Navigation
function setupNavigation() {
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu immediately
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Setup Mobile Menu
function setupMobileMenu() {
    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = mobileMenuToggle.contains(e.target);
        const isClickOnNavLink = Array.from(navLinks).some(link => link.contains(e.target));
        
        if (!isClickInsideMenu && !isClickOnToggle && !isClickOnNavLink) {
            navMenu.classList.remove('active');
        }
    });
}

// Setup Scroll Effects
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Setup Contact Form
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        try {
            // In a real application, you would send this to a backend API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showToast('There was a problem sending your message. Please try again.', 'error');
        }
    });
}

// Show Toast Notification
function showToast(message, type = 'success') {
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Smooth scroll for all hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

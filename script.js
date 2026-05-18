/* ==========================================================================
   JAVASCRIPT CONTROLLER: LEON NGUYEN PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Theme Customizer Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeSidebar = document.getElementById('themeSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeOptButtons = document.querySelectorAll('.theme-opt-btn');

    // Load persisted theme or default to cyberpunk
    const savedTheme = localStorage.getItem('portfolio-theme') || 'cyberpunk';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        themeSidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
    });

    const closeSidebar = () => {
        themeSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    };

    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    themeOptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeName = btn.getAttribute('data-theme');
            setTheme(themeName);
            
            // Mark active
            themeOptButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Auto close sidebar after a short delay for premium feel
            setTimeout(closeSidebar, 300);
        });
    });

    function setTheme(themeName) {
        document.body.className = ''; // Reset body classes
        document.body.classList.add(`theme-${themeName}`);
        localStorage.setItem('portfolio-theme', themeName);

        // Update active class on options in sidebar
        themeOptButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Animated hamburger morphing
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // 4. Shrink Navbar on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 5. Scroll spy active link highlights
        let currentSectionId = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Typewriter Text Animation
    const typedTextEl = document.getElementById('typed-text');
    const words = [
        "Full-stack Developer",
        "NestJS & Node.js Expert",
        "Microservices Architect",
        "React & Angular Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typedTextEl) {
        type();
    }

    // 7. GGT Featured Case Study Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Set buttons active status
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Set pane content active status
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === `tab-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // 8. Dynamic Live GitHub Integration Component
    const usernameInput = document.getElementById('github-username-input');
    const fetchBtn = document.getElementById('fetch-repos-btn');
    const reposGrid = document.getElementById('repos-grid');
    const profileCard = document.getElementById('github-profile-info');

    // Language colors map matching standard Github languages
    const langColors = {
        html: '#e34c26',
        css: '#563d7c',
        javascript: '#f1e05a',
        typescript: '#3178c6',
        python: '#3572A5',
        go: '#00ADD8',
        rust: '#dea584',
        java: '#b07219',
        ruby: '#701516',
        php: '#4F5D95',
        default: '#8b5cf6'
    };

    // Default auto-fetch Leon's preconfigured profile on load
    fetchGitHubData('Leon0102');

    fetchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchBtn.disabled = true;
            fetchBtn.innerHTML = `<i data-lucide="loader-2" class="btn-icon animate-spin"></i> Fetching...`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            fetchGitHubData(username);
        }
    });

    async function fetchGitHubData(username) {
        // Show skeleton screens
        renderSkeletons();
        profileCard.classList.add('hide');

        try {
            // A. Fetch profile metadata
            const profileRes = await fetch(`https://api.github.com/users/${username}`);
            
            if (!profileRes.ok) {
                throw new Error('User profile not found');
            }
            const profileData = await profileRes.ok ? await profileRes.json() : null;

            // B. Fetch repos
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            
            if (!reposRes.ok) {
                throw new Error('Repositories not found');
            }
            const reposData = await reposRes.json();

            // Render profile and repositories
            if (profileData) {
                renderProfile(profileData);
            }
            renderRepositories(reposData);

        } catch (error) {
            console.error(error);
            renderErrorState(error.message);
        } finally {
            // Restore button text
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = `<i data-lucide="refresh-cw" class="btn-icon"></i> Fetch Repositories`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    function renderSkeletons() {
        reposGrid.innerHTML = Array(3).fill(0).map(() => `
            <div class="skeleton-card glass">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-desc"></div>
                <div class="skeleton skeleton-desc short"></div>
                <div class="skeleton-meta">
                    <div class="skeleton skeleton-circle"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        `).join('');
    }

    function renderProfile(user) {
        document.getElementById('github-avatar').src = user.avatar_url;
        document.getElementById('github-name').textContent = user.name || user.login;
        document.getElementById('github-bio').textContent = user.bio || 'Full-stack Developer';
        document.getElementById('github-public-repos').textContent = user.public_repos;
        document.getElementById('github-followers').textContent = user.followers;
        document.getElementById('github-location').textContent = user.location || 'Vietnam';
        document.getElementById('github-profile-link').href = user.html_url;
        profileCard.classList.remove('hide');
    }

    function renderRepositories(repos) {
        if (!repos || repos.length === 0) {
            reposGrid.innerHTML = `
                <div class="error-state text-center" style="grid-column: 1 / -1; padding: 2rem;">
                    <i data-lucide="folder-open" style="width:48px; height:48px; color:var(--text-secondary); margin-bottom:1rem;"></i>
                    <p>No public repositories found for this user.</p>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        reposGrid.innerHTML = repos.map(repo => {
            const lang = repo.language ? repo.language.toLowerCase() : 'default';
            const dotColor = langColors[lang] || langColors.default;
            const description = repo.description || 'No description provided for this repository.';
            
            return `
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card glass">
                    <div>
                        <div class="repo-header">
                            <span class="repo-name" title="${repo.name}">${repo.name}</span>
                            <i data-lucide="git-fork" class="repo-icon-git"></i>
                        </div>
                        <p class="repo-description">${description}</p>
                    </div>
                    <div class="repo-footer">
                        <span class="repo-lang">
                            <span class="lang-dot" style="background-color: ${dotColor}"></span>
                            ${repo.language || 'Plain Text'}
                        </span>
                        <div class="repo-counters-group">
                            <span class="repo-counter"><i data-lucide="star"></i> ${repo.stargazers_count}</span>
                            <span class="repo-counter"><i data-lucide="git-branch"></i> ${repo.forks_count}</span>
                        </div>
                    </div>
                </a>
            `;
        }).join('');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function renderErrorState(message) {
        profileCard.classList.add('hide');
        reposGrid.innerHTML = `
            <div class="error-state text-center" style="grid-column: 1 / -1; padding: 3rem 1rem;">
                <i data-lucide="alert-triangle" style="width:48px; height:48px; color:#ef4444; margin-bottom:1rem; animation: bounce 1s infinite alternate;"></i>
                <h4>Could Not Fetch GitHub Data</h4>
                <p style="color:var(--text-secondary); margin-top:0.5rem; max-width:400px; margin-left:auto; margin-right:auto;">
                    ${message}. Please make sure the GitHub username is spelled correctly or try again later (API rate limit may be reached).
                </p>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // 9. Contact Form Simulation & Success Alert triggers
    const contactForm = document.getElementById('contact-form');
    const formSuccessAlert = document.getElementById('form-success-alert');
    const closeAlertBtn = document.getElementById('close-alert-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI Button state transition
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="animate-pulse">Sending Message...</span>`;

            // Mock server response delay
            setTimeout(() => {
                contactForm.classList.add('hide');
                formSuccessAlert.classList.remove('hide');
                
                // Reset form values
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" id="btn-icon-send"></i>`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 1200);
        });
    }

    if (closeAlertBtn) {
        closeAlertBtn.addEventListener('click', () => {
            formSuccessAlert.classList.add('hide');
            contactForm.classList.remove('hide');
        });
    }
});

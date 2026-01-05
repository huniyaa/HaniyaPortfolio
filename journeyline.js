// Show sidebar navigation after scrolling past hero section
const projectNav = document.getElementById('projectNav');
const heroSection = document.getElementById('hero');

if (projectNav && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.scrollY + 64; // Header height
    
    if (scrollPosition > heroBottom) {
      projectNav.classList.add('visible');
    } else {
      projectNav.classList.remove('visible');
    }
  });
}

// Active link highlighting while scrolling
const sections = Array.from(document.querySelectorAll('.content-section'));
const navLinks = Array.from(document.querySelectorAll('.project-nav a'));

function updateActiveLink() {
  const scrollPos = window.scrollY + 120; // Offset for header + some padding
  let currentId = sections[0] && sections[0].id;

  for (let section of sections) {
    if (section.id === 'hero') continue; // Skip hero section
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').slice(1);
    if (href === currentId) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('resize', updateActiveLink);
updateActiveLink(); // Initialize on load

// SIMPLER VERSION - More reliable
const leftPupil = document.querySelector('.left-pupil');
const rightPupil = document.querySelector('.right-pupil');

document.addEventListener('mousemove', (e) => {
  // Get viewport dimensions
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  
  // Calculate mouse position as percentage of viewport
  const mouseX = e.clientX / vw;
  const mouseY = e.clientY / vh;
  
  // Map to pupil movement range (-3px to 3px)
  const moveRange = 3;
  const leftMoveX = (mouseX - 0.5) * moveRange * 2;
  const leftMoveY = (mouseY - 0.5) * moveRange * 2;
  const rightMoveX = (mouseX - 0.5) * moveRange * 2;
  const rightMoveY = (mouseY - 0.5) * moveRange * 2;
  
  // Apply transforms
  leftPupil.style.transform = `translate(${leftMoveX}px, ${leftMoveY}px)`;
  rightPupil.style.transform = `translate(${rightMoveX}px, ${rightMoveY}px)`;
});

document.addEventListener('mouseleave', () => {
  leftPupil.style.transform = 'translate(0px, 0px)';
  rightPupil.style.transform = 'translate(0px, 0px)';
});

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Smooth scroll for project sidebar navigation
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll for sidebar links
document.querySelectorAll('.project-sidebar a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    // account for fixed header offset
    const headerOffset = 64;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset - 12;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  });
});

// Active link highlighting while scrolling
const sections = Array.from(document.querySelectorAll('.content-section'));
const navLinks = Array.from(document.querySelectorAll('.project-sidebar a'));

function onScroll() {
  const scrollPos = window.scrollY + 80; // a little past header
  let currentId = sections[0] && sections[0].id;

  for (let section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').slice(1);
    if (href === currentId) link.classList.add('active');
  });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
onScroll(); // init on load

document.addEventListener('DOMContentLoaded', () => {
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">×</span>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Add click handlers to all content images
  document.querySelectorAll('.content-image img').forEach(img => {
    img.parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close with close button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close when clicking background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Prevent image click from closing lightbox
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".project-nav");
  const overview = document.querySelector("#overview");

  if (!nav || !overview) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        nav.classList.add("visible");
      } else {
        // Hide again only if we're above overview (scrolling back up)
        const overviewTop = overview.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY < overviewTop - 120) nav.classList.remove("visible");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-96px 0px -70% 0px", // accounts for sticky header
    }
  );

  io.observe(overview);
});
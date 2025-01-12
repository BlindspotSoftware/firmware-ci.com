// Handle active states for navigation items
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header__items a:not(.button)');
  const sections = new Map();

  // Build map of section IDs to nav links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const section = document.getElementById(id);
      if (section) {
        sections.set(section, link);
      }
    }
  });

  const updateActiveStates = () => {
    const pathname = window.location.pathname;
    
    // On homepage, handle sections
    if (pathname === '/') {
      // First remove all active states
      navLinks.forEach(link => {
        link.removeAttribute('data-state');
        link.removeAttribute('aria-current');
      });

      // Check if any section is in viewport
      let activeSectionFound = false;
      sections.forEach((link, section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;
        
        if (isInView) {
          link.setAttribute('data-state', 'active');
          activeSectionFound = true;
        }
      });

      // If no section is in view and we're at the top, set Home as active
      if (!activeSectionFound && window.scrollY < 100) {
        const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === '/');
        if (homeLink) {
          homeLink.setAttribute('aria-current', 'page');
        }
      }
    } 
    // On other pages, just set the current page as active
    else {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.includes('#') && href === pathname) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
          link.removeAttribute('data-state');
        }
      });
    }
  };

  // Update on scroll (debounced)
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      updateActiveStates();
    });
  });
  
  // Update on hash change
  window.addEventListener('hashchange', updateActiveStates);
  
  // Update on initial load
  updateActiveStates();
});

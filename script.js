// ===========================
// Navigation toggle (mobile)
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===========================
// Dark / Light Theme Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');

// Function to apply a theme to <html>
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Check if a theme was saved previously
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Handle theme toggle button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

// ===========================
// Update footer year
// ===========================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---- Verify "View Code"/"View Demo" links exist (HEAD request) ----
(function verifyProjectLinks() {
  const links = document.querySelectorAll('a[data-verify]');
  links.forEach(a => {
    const sameOrigin = a.href.startsWith(location.origin) || a.href.startsWith('./') || a.href.startsWith('../');
    if (!sameOrigin) return;

    fetch(a.href, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          a.insertAdjacentHTML('afterend',
            ' <small class="link-warn" title="This link returned an error. Check the filename or path.">⚠︎ link not found</small>');
        }
      })
      .catch(() => {
        a.insertAdjacentHTML('afterend',
          ' <small class="link-warn" title="Couldn’t verify this link (network or CORS).">⚠︎ verify failed</small>');
      });
  });
})();

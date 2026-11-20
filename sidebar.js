const sidebarLinks = [...document.querySelectorAll('#links a')];
function markLocation() {
  const hash = location.hash || '#home';
  const section = hash === '#parking' ? '#visit' : hash;
  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === section) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', markLocation);
markLocation();
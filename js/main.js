// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.getElementById('mobileMenuBtn');
  var navList = document.querySelector('.nav-list');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', function() {
      navList.classList.toggle('open');
    });
    // Close menu on link click
    navList.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navList.classList.remove('open');
      });
    });
  }
  // Sticky nav shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,.12)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,.1)';
      }
    });
  }
});

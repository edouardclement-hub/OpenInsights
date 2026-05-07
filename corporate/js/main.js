/**
 * Open Insights — main.js
 *
 * 1. Scroll-reveal animation for sections
 * 2. Active nav link highlight on scroll
 * 3. Newsletter signup handler (stub — wire up to email provider)
 * 4. Smooth nav height offset for anchor links
 */

(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.framework-cell, .service-card, .partner-cell, .commitment-item'
  );
  targets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach(el => observer.observe(el));
})();

(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav-link--active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );
  sections.forEach(section => observer.observe(section));
})();

/**
 * Newsletter signup — stub.
 *
 * To wire up, pick an email provider and replace the placeholder block:
 *
 *   Mailchimp   — Audience → Signup Forms → Embedded forms → copy action URL
 *   Buttondown  — https://buttondown.email/api/emails/embed-subscribe/<username>
 *   Formspree   — https://formspree.io/f/<id> (POST JSON {email})
 */
const newsletterBtn = document.getElementById('newsletter-btn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Newsletter signup coming soon. In the meantime, email deven@openinsights.ca to be added to the list.');
  });
}

(function initAnchorOffset() {
  const NAV_HEIGHT = 72;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

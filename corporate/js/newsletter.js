/**
 * Newsletter signup — /newsletter
 *
 * Posts to /api/subscribe (api/subscribe.js), which talks to Mailchimp with
 * the API key server-side. Mailchimp then sends its double opt-in email, so
 * a successful post means "check your inbox", not "subscribed".
 *
 * Wording, consent text and sender line match the EPM site's form in
 * frontend/src/lib/newsletter-copy.ts — change one and check the other.
 *
 * Also drives the footer signup bar on every page. That bar collects the
 * email only and hands off to this page for the details and the consent
 * tick, so the CASL wording lives in exactly one place.
 */

/* Carries the footer bar's email to /newsletter. sessionStorage rather than
   a query string, so an address never lands in a URL, a server log or the
   browser's history. */
var NL_STASH_KEY = 'oi-newsletter-email';
var NL_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
(function initNewsletterForm() {
  const form = document.getElementById('nl-form');
  if (!form) return;

  const done = document.getElementById('nl-done');
  const doneTitle = document.getElementById('nl-done-title');
  const doneBody = document.getElementById('nl-done-body');
  const errorEl = document.getElementById('nl-error');
  const submitBtn = document.getElementById('nl-submit');
  const emailEl = document.getElementById('nl-email');
  const consentEl = document.getElementById('nl-consent');

  const EMAIL_RE = NL_EMAIL_RE;

  // Arrived from the footer bar: carry the address over, then forget it.
  try {
    const stashed = sessionStorage.getItem(NL_STASH_KEY);
    if (stashed) {
      emailEl.value = stashed;
      sessionStorage.removeItem(NL_STASH_KEY);
    }
  } catch (err) {
    /* private mode / storage disabled — the visitor just retypes it */
  }

  const ERRORS = {
    invalid_email: 'Please enter a valid email address.',
    consent_required: 'Please tick the box to confirm you want to receive the newsletter.',
    forgotten_email: 'This address was permanently removed from our list. Please contact us to resubscribe.',
    rate_limited: 'Too many attempts. Please try again in a few minutes.',
    generic: 'Something went wrong. Please try again later.'
  };

  function showError(key) {
    errorEl.textContent = ERRORS[key] || ERRORS.generic;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  function finish(alreadySubscribed) {
    doneTitle.textContent = alreadySubscribed ? 'Stay informed' : 'Check your inbox';
    doneBody.textContent = alreadySubscribed
      ? "You're already subscribed. Thanks for reading."
      : "We've sent you an email. Click the link in it to confirm your subscription.";
    form.hidden = true;
    done.hidden = false;
    done.focus();
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearError();

    const email = emailEl.value.trim();
    if (!EMAIL_RE.test(email)) {
      showError('invalid_email');
      emailEl.setAttribute('aria-invalid', 'true');
      emailEl.focus();
      return;
    }
    emailEl.removeAttribute('aria-invalid');

    if (!consentEl.checked) {
      showError('consent_required');
      consentEl.focus();
      return;
    }

    const payload = {
      email: email,
      firstName: document.getElementById('nl-fname').value.trim(),
      lastName: document.getElementById('nl-lname').value.trim(),
      organization: document.getElementById('nl-org').value.trim(),
      role: document.getElementById('nl-role').value,
      language: 'en',
      consent: true,
      website: document.getElementById('nl-website').value // honeypot
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        // server_config and mailchimp_error have no visitor-facing wording:
        // they are our problem, not theirs, so they fall back to generic.
        showError(Object.prototype.hasOwnProperty.call(ERRORS, data.error) ? data.error : 'generic');
        return;
      }

      finish(data.status === 'subscribed');
    } catch (err) {
      showError('generic');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  });
})();

/**
 * Footer signup bar — every page.
 *
 * Takes the email and sends the visitor to /newsletter to finish. On
 * /newsletter itself there is nothing to navigate to, so it fills the form
 * in place and scrolls to it.
 */
(function initFooterSignup() {
  const form = document.getElementById('footer-nl-form');
  if (!form) return;

  const input = document.getElementById('footer-nl-email');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = input.value.trim();

    // Let the browser show its own message rather than inventing one here.
    if (!NL_EMAIL_RE.test(email)) {
      input.setAttribute('aria-invalid', 'true');
      input.reportValidity();
      return;
    }
    input.removeAttribute('aria-invalid');

    const pageEmail = document.getElementById('nl-email');
    if (pageEmail) {
      pageEmail.value = email;
      input.value = '';
      pageEmail.scrollIntoView({ behavior: 'smooth', block: 'center' });
      pageEmail.focus({ preventScroll: true });
      return;
    }

    try {
      sessionStorage.setItem(NL_STASH_KEY, email);
    } catch (err) {
      /* storage disabled — /newsletter opens with an empty field */
    }
    window.location.href = '/newsletter';
  });
})();

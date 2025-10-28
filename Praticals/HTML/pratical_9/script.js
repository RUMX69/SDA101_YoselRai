document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const submitBtn = form.querySelector('button[type="submit"]');

  // create per-field error containers if not present
  function ensureErrorEl(input, idSuffix) {
    let el = document.getElementById(input.id + idSuffix);
    if (!el) {
      el = document.createElement('div');
      el.id = input.id + idSuffix;
      el.className = 'field-error';
      el.style.color = '#f87171'; // red-ish
      el.style.fontSize = '0.9rem';
      el.style.marginTop = '6px';
      input.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  const usernameError = ensureErrorEl(username, 'Error');
  const emailError = ensureErrorEl(email, 'Error');
  const passwordError = ensureErrorEl(password, 'Error');
  const confirmError = ensureErrorEl(confirmPassword, 'Error');

  // validators
  function validateUsername() {
    const val = username.value.trim();
    if (val.length < 3) {
      username.setAttribute('aria-invalid', 'true');
      usernameError.textContent = 'Username must be at least 3 characters long.';
      return false;
    }
    username.removeAttribute('aria-invalid');
    usernameError.textContent = '';
    return true;
  }

  function validateEmail() {
    const val = email.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      email.setAttribute('aria-invalid', 'true');
      emailError.textContent = 'Enter a valid email (e.g., someone@example.com).';
      return false;
    }
    email.removeAttribute('aria-invalid');
    emailError.textContent = '';
    return true;
  }

  function validatePassword() {
    const val = password.value;
    const errors = [];
    if (val.length < 8) errors.push('Minimum 8 characters');
    if (!/[A-Z]/.test(val)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(val)) errors.push('At least one lowercase letter');
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(val)) errors.push('At least one special character');

    if (errors.length) {
      password.setAttribute('aria-invalid', 'true');
      passwordError.textContent = 'Password must include: ' + errors.join(', ') + '.';
      return false;
    }
    password.removeAttribute('aria-invalid');
    passwordError.textContent = '';
    return true;
  }

  function validateConfirm() {
    if (confirmPassword.value !== password.value) {
      confirmPassword.setAttribute('aria-invalid', 'true');
      confirmError.textContent = 'Passwords do not match.';
      return false;
    }
    confirmPassword.removeAttribute('aria-invalid');
    confirmError.textContent = '';
    return true;
  }

  function updateSubmitState() {
    const allValid = validateUsername() && validateEmail() && validatePassword() && validateConfirm();
    submitBtn.disabled = !allValid;
  }

  // real-time validation
  username.addEventListener('input', () => { validateUsername(); updateSubmitState(); });
  email.addEventListener('input', () => { validateEmail(); updateSubmitState(); });
  password.addEventListener('input', () => { validatePassword(); validateConfirm(); updateSubmitState(); });
  confirmPassword.addEventListener('input', () => { validateConfirm(); updateSubmitState(); });

  // initial state
  submitBtn.disabled = true;

  // final submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateUsername() && validateEmail() && validatePassword() && validateConfirm()) {
      // form is valid — replace with real submit logic
      alert('Form submitted successfully.');
      form.reset();
      updateSubmitState();
    }
  });
});
// API endpoint for user registration
const API_URL = 'https://backend-moment4-1-k1rb.onrender.com/api/auth/register';

// Grab elements from the DOM
const form = document.getElementById('register-form') as HTMLFormElement;
const feedbackDiv = document.getElementById('feedback') as HTMLDivElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;

// Hide the feedback box by default
feedbackDiv.style.display = 'none';

// Validation function for username and password fields
const validate = (): string[] => {
  const errors: string[] = [];

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Username validation
  if (!username) {
    errors.push('Användarnamn krävs.');
  } else if (username.length < 4) {
    errors.push('Användarnamnet måste vara minst 4 tecken.');
  }

  // Password validation
  if (!password) {
    errors.push('Lösenord krävs.');
  } else {
    if (password.length < 12) {
      errors.push('Lösenordet måste vara minst 12 tecken långt.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Lösenordet måste innehålla en liten bokstav.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Lösenordet måste innehålla en stor bokstav.');
    }
    if (!/\d/.test(password)) {
      errors.push('Lösenordet måste innehålla minst en siffra.');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Lösenordet måste innehålla minst ett specialtecken (!@#$%^&*).');
    }
  }

  return errors;
};

// Real-time validation while typing
const showErrors = () => {
  const issues = validate();
  if (issues.length > 0) {
    feedbackDiv.className = 'error';
    feedbackDiv.innerHTML = issues.map(err => `<p>${err}</p>`).join('');
    feedbackDiv.style.display = 'block';
    registerBtn.disabled = true;
  } else {
    feedbackDiv.innerHTML = '';
    feedbackDiv.style.display = 'none';
    registerBtn.disabled = false;
  }
};

// Attach validation on input
usernameInput.addEventListener('input', showErrors);
passwordInput.addEventListener('input', showErrors);

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const errors = validate();

  if (errors.length > 0) {
    feedbackDiv.className = 'error';
    feedbackDiv.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
    feedbackDiv.style.display = 'block';
    return;
  }

  // Send POST request to register new user
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      feedbackDiv.className = 'error';
      feedbackDiv.innerHTML = `<p>${data.error || 'Registreringen misslyckades.'}</p>`;
      feedbackDiv.style.display = 'block';
      return;
    }

    // Success feedback
    feedbackDiv.className = 'success';
    feedbackDiv.innerHTML = '<p>Konto skapat! Du kan nu logga in.</p>';
    feedbackDiv.style.display = 'block';
    form.reset();
  } catch (err) {
    feedbackDiv.className = 'error';
    feedbackDiv.innerHTML = '<p>Kunde inte ansluta till servern.</p>';
    feedbackDiv.style.display = 'block';
  }
});

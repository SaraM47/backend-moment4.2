// API endpoint for user login
const API_URL = 'https://backend-moment4-1-k1rb.onrender.com/api/auth/login';

// Get form and feedback element from the DOM

const form = document.getElementById('login-form') as HTMLFormElement;
const feedbackDiv = document.getElementById('feedback') as HTMLDivElement;

// Hide the feedback area initially
feedbackDiv.style.display = 'none'; 

// Handle form submission, get values from the form fields
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = (document.getElementById('username') as HTMLInputElement).value.trim();
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (!username || !password) {
    feedbackDiv.textContent = 'Fyll i både användarnamn och lösenord.';
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      feedbackDiv.textContent = data.error || 'Inloggning misslyckades.';
      return;
    }

    // Save the token to localStorage
    localStorage.setItem('token', data.token);
    feedbackDiv.textContent = 'Inloggning lyckades!';

    // Redirect to the dashboard
    window.location.href = '/src/pages/dashboard.html';
  } catch (err) {
    feedbackDiv.textContent = 'Kunde inte ansluta till servern.';
  }
});

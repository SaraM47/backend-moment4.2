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

  // Clear previous feedback message and styles
  // (reset state before new attempt)
  feedbackDiv.textContent = '';
  feedbackDiv.classList.remove('success', 'error');
  feedbackDiv.style.display = 'none'; 

  const username = (document.getElementById('username') as HTMLInputElement).value.trim();
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (!username || !password) {
    feedbackDiv.textContent = 'Fyll i både användarnamn och lösenord.';
    feedbackDiv.classList.add('error'); 
    feedbackDiv.style.display = 'block';
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
      feedbackDiv.classList.add('error'); 
      feedbackDiv.style.display = 'block'; 
      return;
    }

    // Save the token to localStorage
    localStorage.setItem('token', data.token);

    // Show success message
    feedbackDiv.textContent = 'Inloggning lyckades!';
    feedbackDiv.classList.add('success');      
    feedbackDiv.style.display = 'block';  

    // Redirect to the dashboard after 1 second
    setTimeout(() => {
      window.location.href = '/src/pages/dashboard.html';
    }, 1000);                                    
  } catch (err) {
    feedbackDiv.textContent = 'Kunde inte ansluta till servern.';
    feedbackDiv.classList.add('error');         
    feedbackDiv.style.display = 'block';          
  }
});

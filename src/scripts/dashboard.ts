const API_URL = 'https://backend-moment4-1-k1rb.onrender.com/api/protected';
const MOVIES_URL = `${API_URL}/movies`;

const welcomeMsg = document.getElementById('welcome-msg') as HTMLParagraphElement;
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
const form = document.getElementById('movie-form') as HTMLFormElement;
const titleInput = document.getElementById('title') as HTMLInputElement;
const genreInput = document.getElementById('genre') as HTMLInputElement;
const movieFeedback = document.getElementById('movie-feedback') as HTMLDivElement;

// Create a container for displaying movies
const movieList = document.createElement('ul');
movieList.id = 'movie-list';
document.body.appendChild(movieList);

const token = localStorage.getItem('token');

if (!token) {
  welcomeMsg.textContent = 'Du är inte inloggad. Du skickas till inloggning.';
  setTimeout(() => {
    window.location.href = '/src/pages/login.html';
  }, 2000);
} else {
  fetchProtectedData();
}

// Function to fetch protected data and movie list
function fetchProtectedData() {
  // Fetch welcome message
  fetch(API_URL, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('Ogiltig eller utgången token');
      const data = await res.json();
      welcomeMsg.textContent = data.message;

      // Fetch movies 
      return fetch(MOVIES_URL, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
    })
    .then(async (res) => {
      if (!res.ok) throw new Error('Kunde inte hämta filmer');
      const movies = await res.json();

      // Display movies
      movieList.innerHTML = '<h2>Favoritfilmer:</h2>' +
        movies.map((m: { title: string, genre: string }) =>
          `<li><strong>${m.title}</strong> – ${m.genre}</li>`).join('');
    })
    .catch(() => {
      welcomeMsg.textContent = 'Din session är ogiltig. Du loggas ut.';
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/src/pages/login.html';
      }, 2000);
    });
}

// Logout user
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/src/pages/login.html';
});

// Add new movie
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const genre = genreInput.value.trim();

  if (!title || !genre) {
    movieFeedback.textContent = "Både titel och genre krävs.";
    movieFeedback.className = 'error';
    return;
  }

  try {
    const res = await fetch(MOVIES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title, genre })
    });

    const data = await res.json();

    if (!res.ok) {
      movieFeedback.textContent = data.error || 'Kunde inte spara film.';
      movieFeedback.className = 'error';
      return;
    }

    movieFeedback.textContent = 'Film tillagd!';
    movieFeedback.className = 'success';
    form.reset();

    // Fetch updated movie list
    fetchProtectedData();
  } catch (err) {
    movieFeedback.textContent = 'Serverfel vid postning.';
    movieFeedback.className = 'error';
  }
});

// Check if a JWT token is stored in localStorage. If not, the user is not logged in, redirect to login page
if (!localStorage.getItem("token")) {
    window.location.href = "/src/pages/login.html"; 
  }
  
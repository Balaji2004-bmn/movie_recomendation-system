const API_KEY = 'your_omdb_api_key'; // Replace with your OMDb API key
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loginForm = document.getElementById('loginForm');
const mainApp = document.getElementById('mainApp');
const movieContainer = document.getElementById('movieContainer');
const logoutButton = document.getElementById('logoutButton');
const loginContainer = document.getElementById('loginContainer');
const errorMessage = document.getElementById('errorMessage');

const VALID_USERNAME = 'user123';
const VALID_PASSWORD = 'password123';

// Check if the user is already logged in
if (localStorage.getItem('loggedIn') === 'true') {
    showMainApp();
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem('loggedIn', 'true');
        showMainApp();
    } else {
        errorMessage.textContent = 'Invalid Username or Password!';
    }
});

function showMainApp() {
    loginContainer.style.display = 'none';
    mainApp.style.display = 'block';
    fetchMovieRecommendations();
}

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    window.location.reload();
});

// Listen for click on the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    }
});

// Allow searching by pressing "Enter" key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        }
    }
});

function searchMovies(query) {
    const apiUrl = `https://www.omdbapi.com/?apikey=9b2b62c1&s=${query}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                movieContainer.innerHTML = `<p>No results found for "${query}". Try again.</p>`;
            }
        })
        .catch(error => console.log('Error:', error));
}

function fetchMovieRecommendations() {
    const apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=action`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayMovies(data.Search))
        .catch(error => console.log('Error:', error));
}

function displayMovies(movies) {
    movieContainer.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        </div>
    `).join('');
}

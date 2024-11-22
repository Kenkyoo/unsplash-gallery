// app.js
const TU_API_KEY = "_Lo9ruec1rqQ_-ERrp_NHgqbfBdANyAzPYaSLwGdXh0";

// Endpoints
const randomPhoto = "/photos/random/?";
const randomPhotos = "/photos/random?count=10&";
const photos_per_page = 22;
const newPhotos = `/photos?per_page=${photos_per_page}&`;
const getWallpaper = "/search/photos?per_page=100&query=wallpaper&";
const topics = "/topics?per_page=4&";
const collectiones = "/collections?per_page=4&";
const users = "/users/marekpiwnicki?";
const stats = "/stats/total?";

// Theme toggle
const toggle = document.getElementById("toggle");

toggle.addEventListener('click', (e) => {
  const html = document.querySelector('html');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    e.target.innerHTML = 'Dark mode';
  } else {
    html.classList.add('dark');
    e.target.innerHTML = 'Light mode';
  }
});

// Fetch photos from Unsplash API
async function fetchPhotos(endpoint, callback) {
  const client_id = "client_id=";
  const unsplash = "https://api.unsplash.com";
  const url = `${unsplash}${endpoint}${client_id}${TU_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch data from Unsplash API. Please try again later.');
  }
}

// Generate images and add them to the DOM
function generateImages(data) {
  const container = document.getElementById("container");
  let box = "";
  data.forEach(item => {
    box += `
      <div class="photo-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
        <a href="${item.links.html}" target="_blank">
          <img src="${item.urls.regular}" alt="${item.alt_description}" />
        </a>
        <aside class="photo-box-caption">
          <span>by <a href="${item.user.html}" target="_blank">${item.user.name}</a></span>
        </aside>
      </div>
    `;
  });
  container.insertAdjacentHTML('beforeend', box);
}

// Set wallpaper image
function setWallpaper(data) {
  const splashContainer = document.querySelector(".splash-container");
  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomImage = data.results[randomIndex];
    splashContainer.style.backgroundImage = `url(${randomImage.urls.regular})`;
  } else {
    console.error("No se encontraron resultados en los datos proporcionados.");
  }
}

// Get random photo and display it
function getRandomPhoto(data) {
  const randomImg = document.getElementById("randomImg");
  randomImg.src = data.urls.small;
}

const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
  fetchPhotos(randomPhoto, getRandomPhoto);
});

// Get topics and add them to the DOM
function getTopics(data) {
  const topicsContainer = document.getElementById("topicsContainer");
  let box = "";
  data.forEach(element => {
    box += `            
      <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
        <h3 class="content-subhead">
          <i class="fa fa-rocket"></i>
          <a href="${element.links.html}">${element.title}</a>
        </h3>
        <p>${element.description}</p>
        <img src="${element.cover_photo.urls.small_s3}" alt="${element.title}" class="pure-img" style="height: 200px; width: 100%;"/>
      </div>
    `;
  });
  topicsContainer.innerHTML = box;
}

// Get collections and add them to the DOM
function getCollections(data) {
  const collections = document.getElementById("collections");
  let box = "";
  data.forEach(element => {
    box += `            
      <div class="pure-u-1-4">
        <a href="${element.links.html}"><img class="pure-img-responsive" src="${element.cover_photo.urls.regular}" alt="${element.title}"></a>
      </div>
    `;
  });
  collections.innerHTML = box;
}

// Get user info and add to the DOM
function getUser(data) {
  const ribbon = document.getElementById("ribbon");
  let box = `            
    <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
      <img alt="Profile Picture" class="pure-img-responsive profile" src="${data.profile_image.large}">
    </div>
    <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
      <h2 class="content-head content-head-ribbon">${data.name}</h2>
      <p>${data.bio}</p>
    </div>
  `;
  ribbon.innerHTML = box;
}

// Get stats and display them
function getStats(data) {
  const items = document.querySelectorAll(".item");
  const stats = [data.views, data.downloads, data.photos, data.photographers];
  items.forEach((item, index) => {
    item.innerHTML = stats[index];
  });
}

// Fetch data on page load
fetchPhotos(newPhotos, generateImages);
fetchPhotos(getWallpaper, setWallpaper);
fetchPhotos(randomPhoto, getRandomPhoto);
fetchPhotos(topics, getTopics);
fetchPhotos(collectiones, getCollections);
fetchPhotos(users, getUser);
fetchPhotos(stats, getStats);


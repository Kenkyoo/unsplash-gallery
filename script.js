// script.js
const TU_API_KEY = "_Lo9ruec1rqQ_-ERrp_NHgqbfBdANyAzPYaSLwGdXh0";

const btn = document.getElementById("btn");

async function fetchPhotos(endpoint, callback) {
  const client_id = "client_id=";
  const unsplash = "https://api.unsplash.com";
  const url = `${unsplash}${endpoint}&${client_id}${TU_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function searchPhotos(data) {
  const imgContainer = document.getElementById("imgContainer");
  const totalResult = document.getElementById("total");
  totalResult.innerHTML = "Resultados: " + data.total;
  let box = "";
  data.results.forEach(element => {
    box += `
      <div class="pure-u-1-3 divider">
        <a href="${element.links.html}"><img class="pure-img" src="${element.urls.small}" alt=""></a>
      </div>
    `;
  });
  imgContainer.innerHTML = box;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const method = "/search/photos?per_page=30&query=";
  const input = document.getElementById("input");
  const value = document.getElementById("value");
  const inputValue = input.value; 
  value.innerHTML = "Termino de busqueda: " + inputValue;
  fetchPhotos(method + inputValue, searchPhotos);
});


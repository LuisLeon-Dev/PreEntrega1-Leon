//Api key y url
const API_KEY = "eec652da8605c8604e41a14d3a43835c";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

// Función para obtener los datos del país desde la API
const getCountryData = (country) => {
  fetch(`${API_URL}?q=${country}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Validar si se obtiene respuesta
      if (data.cod === 200) {
        const countryData = [data];
        displayCards(countryData);
      } else {
        console.log("No fue posible obtener la información del país.");
      }
    })
    .catch((error) => {
      console.log("Se produjo un error:", error);
    });
};

//Creacion de la card con el contenido de los paises
const createCard = (country, isFavorite) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const countryName = document.createElement("h2");
  countryName.textContent = country.name;

  const weatherInfo = document.createElement("p");
  weatherInfo.textContent = `Temperatura: ${country.main.temp}°C, Condicion: ${country.weather[0].description}`;

  const button = document.createElement("button");
  button.textContent = isFavorite ? "Borrar" : "Guardar";
  button.addEventListener("click", () => {
    if (isFavorite) {
      deleteCountryFromFavorites(country);
      Swal.fire("Eliminado Correctamente");
    } else {
      saveCountryAsFavorite(country);
      Swal.fire("Guardado Correctamente");
    }
  });

  card.appendChild(countryName);
  card.appendChild(weatherInfo);
  card.appendChild(button);

  return card;
};

//Card con error
const emptyCard = () => {
  const card = document.createElement("div");
  card.classList.add("card");

  const countryName = document.createElement("h2");
  countryName.textContent = "No fue posible encontrar el pais seleccionado";
};

// Función para mostrar las cards en el DOM
const displayCards = (countries, isFavorite = false) => {
  const containerId = isFavorite ? "favorites-container" : "cards-container";
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  countries.forEach((country) => {
    const card = createCard(country, isFavorite);
    container.appendChild(card);
  });
};

// Función para guardar el país como favorito en el localStorage
const saveCountryAsFavorite = (country) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(country);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  showFavorites();
};

// Función para eliminar el país de la seccion favoritos y del localStorage
function deleteCountryFromFavorites(country) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((favorite) => favorite.name !== country.name);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  showFavorites();
}

// Función para mostrar los países favoritos en el DOM
const showFavorites = () => {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar los nuevos favoritos

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  displayCards(favorites, true);
};

// Manejador de eventos para el formulario de búsqueda
const searchFormSubmit = (e) => {
  e.preventDefault(); // Evitar el envío del formulario

  const input = document.getElementById("country-input");
  const country = input.value.trim();

  if (country !== "") {
    getCountryData(country);
  } else {
    emptyCard();
  }

  input.value = ""; // Limpiar el campo de búsqueda después de realizar la búsqueda
};

// Obtener referencia al formulario de búsqueda
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searchFormSubmit);

// Mostrar los países favoritos al cargar la página
showFavorites();

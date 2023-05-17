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
        const countries = document.getElementById("cards-container");
        countries.innerHTML = "";
        noCountryFound();
      }
    })
    .catch((error) => {
      console.log("Se produjo un error:", error);
    });
};

const noCountryFound = () => {
  const infoDOM = document.getElementById("cards-container");
  const info = document.createElement("div");
  info.classList.add("info");

  const infoText = document.createElement("p");
  infoText.textContent = `No fue posible encontrar el país, intentalo otra vez`;

  info.appendChild(infoText);
  infoDOM.appendChild(info);
};

//Creacion de la card con el contenido de los paises
const createCard = (country, isFavorite) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const temp = document.createElement("div");
  temp.classList.add("temp");

  const countryName = document.createElement("h2");
  countryName.textContent = country.name;

  const icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/wn/${country.weather[0].icon}.png`;
  icon.alt = country.weather[0].description;

  const weather = document.createElement("p");
  weather.className = "temp";
  weather.textContent = `${country.main.temp}°C `;

  const weatherInfo = document.createElement("p");
  weatherInfo.textContent = `Condicion: ${country.weather[0].description}`;

  const button = document.createElement("button");

  button.textContent = isFavorite ? "Eliminar" : "Añadir a favoritos";
  button.className = isFavorite ? "button--eliminar" : "button--guardar";
  button.addEventListener("click", () => {
    if (isFavorite) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(53, 236, 46)",
        cancelButtonColor: "rgb(255, 56, 56)",
        confirmButtonText: "Si, deseo eliminarlo",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCountryFromFavorites(country);
          Swal.fire(
            "Eliminado!",
            "El pais se elimino correctamente.",
            "success",
            "#45aafd"
          );
        }
      });
    } else {
      saveCountryAsFavorite(country);
      Swal.fire({
        title: "Añadido a favoritos",
        icon: "success",
        text: "Se agrego correctamente a tus favoritos!",
        confirmButtonColor: "#45aafd",
      });
    }
  });

  temp.appendChild(icon);
  temp.appendChild(weather);

  card.appendChild(countryName);
  card.appendChild(temp);
  card.appendChild(weatherInfo);
  card.appendChild(button);

  return card;
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
const deleteCountryFromFavorites = (country) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((favorite) => favorite.name !== country.name);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  showFavorites();
};

//funcion para mostrar un mensaje si no se ha agregado nada a favoritos
const noFavoritesAdded = () => {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = "";

  const mensaje = document.createElement("p");
  mensaje.classList.add("info");
  mensaje.textContent = "Todavía no se ha agregado favoritos";

  favoritesContainer.appendChild(mensaje);
};

// Función para mostrar los países favoritos en el DOM
const showFavorites = () => {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar los nuevos favoritos

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    noFavoritesAdded();
  } else {
    displayCards(favorites, true);
  }
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

  input.value = ""; // Limpiar el input de búsqueda después de realizar la búsqueda
};

// Obtener datos dcel formulario de búsqueda
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searchFormSubmit);

showFavorites();

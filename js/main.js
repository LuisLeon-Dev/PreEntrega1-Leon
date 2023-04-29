class Weather {
  constructor(id, country, city, cityWeather) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.cityWeather = cityWeather;
  }
}

//Ingresando la informacion de los paises
const elSalvador = new Weather(1, "El Salvador", "San Salvador", "33 °C");
const guatemala = new Weather(2, "Guatemala", "Ciudad de Guatemala", "28 °C");
const honduras = new Weather(3, "Honduras", "Tegucigalpa", "32 °C");
const nicaragua = new Weather(4, "Nicaragua", "Managua", "36 °C");
const costaRica = new Weather(5, "Costa Rica", "San Jose", "26 °C");

//array que almacena todos los objetos
const weatherArray = [elSalvador, guatemala, honduras, nicaragua, costaRica];

//variables
const card = document.getElementById("weather");
const button = document.getElementById("button");

//funcion para obtener el valor del input
const getInput = () => {
  const userSelection = document.getElementById("city").value;
  if (userSelection === "El Salvador") {
    return 1;
  } else if (userSelection === "Guatemala") {
    return 2;
  } else if (userSelection === "Honduras") {
    return 3;
  } else if (userSelection === "Nicaragua") {
    return 4;
  } else if (userSelection === "Costa Rica") {
    return 5;
  }
};

//funcion que busca el pais seleccionado
const findCountry = () => {
  weatherArray.find(({ id, country, city, cityWeather }) => {
    if (id === getInput()) {
      return (card.innerHTML = `
      <div>
          <p>Pais: ${country}</p>
          <p>Ciudad: ${city}</p>
          <p>Temperatura: ${cityWeather}</p>
          <button type="submit" id="buttonFavoritos">añadir a favoritos</button>
        </div>
    
    `);
    } else {
      card.innerHTML = `
        <p>Datos no encontrados</p>
      `;
    }
  });

  //evento para guardar en localStorge las ciudades favoritas
  const buttonFavoritos = document.getElementById("buttonFavoritos");

  const agregarFavoritos = () => {
    // Agregar el objeto a un array de favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.push(weatherArray[getInput() - 1]);

    // Guardar el array de favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  };
  buttonFavoritos.addEventListener("click", (e) => {
    e.preventDefault();
    agregarFavoritos();
  });
  mostrarFavoritos();
};

//Evento que muestra la card con el pais buscado
button.addEventListener("click", (e) => {
  e.preventDefault();
  findCountry();
});

//funcion para mostrar los paises guardados en la seccion de favoritos
const mostrarFavoritos = () => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  favoritos.forEach(({ country, city, cityWeather }) => {
    const sectionFavoritos = document.getElementById("favoritos");
    sectionFavoritos.innerHTML = `
          <p>Pais: ${country}</p>
          <p>Ciudad: ${city}</p>
          <p>Temperatura: ${cityWeather}</p>
          <button type="submit" id="eliminarFavoritos">Eliminar</button>
    `;
  });
};
mostrarFavoritos();

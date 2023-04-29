class Weather {
  constructor(country, city, cityWeather) {
    this.country = country;
    this.city = city;
    this.cityWeather = cityWeather;
  }
}

//Ingresando la informacion de los paises
const elSalvador = new Weather("El Salvador", "San Salvador", "33 °C");
const guatemala = new Weather("Guatemala", "Ciudad de Guatemala", "28 °C");
const honduras = new Weather("Honduras", "Tegucigalpa", "32 °C");
const nicaragua = new Weather("Nicaragua", "Managua", "36 °C");
const costaRica = new Weather("Costa Rica", "San Jose", "26 °C");

//array que almacena todos los objetos
const weatherArray = [elSalvador, guatemala, honduras, nicaragua, costaRica];

//variables
const Selection = "Guatemala";
const card = document.getElementById("weather");
const button = document.getElementById("button");

//funcion para obtener el valor del input
const getInputText = () => {
  const userSelection = document.getElementById("city").value;
  return userSelection;
};

//funcion que busca el pais seleccionado
const findCountry = () => {
  weatherArray.find(({ country, city, cityWeather }) => {
    if (country === getInputText()) {
      return (card.innerHTML = `
      <div>
          <p>Pais: ${country}</p>
          <p>Ciudad: ${city}</p>
          <p>Temperatura: ${cityWeather}</p>
          <button type="submit" id="favoritos">añadir a favoritos</button>
        </div>
    
    `);
    } else {
      card.innerHTML = `
        <p>Datos no encontrados</p>
      `;
    }
  });
};

//Evento que renderiza la card
button.addEventListener("click", (e) => {
  e.preventDefault();
  findCountry();
});

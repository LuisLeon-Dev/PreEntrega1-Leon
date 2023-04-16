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

//seleccion del usuario
let userSelection = prompt(
  `Digita el nombre del pais desees saber el clima: \n1. El Salvador \n2. Guatemala \n3. Honduras \n4. Nicaragua \n5. Costa Rica \n6. Salir`
);

//Encontrar en el array el pais seleccionado
const foundWeather = weatherArray.find((city) => {
  if (city.country === userSelection) {
    return alert(
      `Nombre del país: ${city.country} \nCapital del país: ${city.city} \nEl clima es de: ${city.cityWeather}`
    );
  }
});

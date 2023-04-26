'use strict';

const weatherContainer = document.querySelector('.home-container');
const cityInput = document.querySelector('#city-name');
const submit = document.querySelector('.submit');
const futureForecast = document.querySelector('.future-forecast');

const API_KEY = 'a44ad5f82165f41164364da884fd9c8c';

// clear input field
const clearField = function () {
	cityInput.value = '';
};

// manual input location
const getCityByName = function () {
	const city = cityInput.value;
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
	)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);

			if (data.cod === '404')
				weatherContainer.innerHTML = `<h1>'${city}' not found, try again!</h1>`;

			const weatherDesc = data.weather[0].description;
			const temperature = data.main.temp;
			const tempFeelsLike = data.main.feels_like;
			const cityName = data.name;
			const region = data.sys.country;
			const windSpeed = data.wind.speed;

			let imgSrc;
			if (weatherDesc.includes('clouds'))
				imgSrc = 'images/cloudy (1).png';
			else if (weatherDesc.includes('rain')) imgSrc = 'images/rain.png';
			else if (weatherDesc.includes('snow')) imgSrc = 'images/snow.png';
			else if (
				weatherDesc.includes('sun') ||
				weatherDesc.includes('clear sky')
			)
				imgSrc = 'images/sunny.png';
			else imgSrc = 'images/cloudy.png';

			weatherContainer.innerHTML = `
                <h1>${cityName}, ${region}</h1>
                <img src='${imgSrc}'/>
                <h3>The current temperature is ${Math.round(
					temperature
				)}°C...</h3>
                <h4>but it feels like ${Math.round(tempFeelsLike)}°C</h4>
                <p>${weatherDesc}</p>
                <p><strong>Winds are up to ${windSpeed}km/h</strong></p>
`;
		})
		.catch((error) => {
			console.log(error.message);
		});
};

submit.addEventListener('click', function () {
	getCityByName();
	clearField();
});

cityInput.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		getCityByName();
		clearField();
	}
});

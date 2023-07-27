// test #1 "Manipulating the DOM with JavaScript"

const changeText = () => {
	let text = document.getElementById("textSec1");
	text.innerHTML = "Text changed!";
};

// test #3 "Consuming an API"

function fetchRandomPokemon() {
	const pokemonId = Math.floor(Math.random() * 898) + 1; // number of 1st gen Pokémons
	const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

	return fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.catch((error) => {
			console.error("Error fetching Pokémon data:", error);
		});
}

function displayPokemonCard(pokemonData) {
	const pokemonCard = document.getElementById("pokemonCard");
	pokemonCard.innerHTML = `<div class="pokemon_card_inner">
	<h2 class="poke_name">${pokemonData.name}</h2>
	<img class="poke_img" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
	<p>Type: ${pokemonData.types[0].type.name}</p>
	<p>Height: ${pokemonData.height}</p>
	<p>Weight: ${pokemonData.weight}</p>
	</div>
    `;
}

function getRandomPokemonCard() {
	fetchRandomPokemon().then((pokemonData) => {
		displayPokemonCard(pokemonData);
	});
}

document
	.getElementById("contactForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const nameInput = document.getElementById("name");
		const emailInput = document.getElementById("email");
		const messageInput = document.getElementById("message");

		// Validate if fields are not empty
		if (!nameInput.value.trim()) {
			displayError(nameInput, "Name is required");
			return;
		}

		if (!emailInput.value.trim()) {
			displayError(emailInput, "E-mail is required");
			return;
		}

		if (!messageInput.value.trim()) {
			displayError(messageInput, "Message is required");
			return;
		}

		// Validate e-mail format using a regular expression
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(emailInput.value)) {
			displayError(emailInput, "Please enter a valid e-mail address");
			return;
		}

		// If everything is valid, you can proceed with form submission here
		// For this example, we'll just show an alert
		alert("Form submitted successfully!");
	});

function displayError(inputElement, errorMessage) {
	// Clear previous errors, if any
	const errorDiv = inputElement.parentElement.querySelector(".error");
	if (errorDiv) {
		errorDiv.remove();
	}

	const errorDivNew = document.createElement("div");
	errorDivNew.className = "error";
	errorDivNew.textContent = errorMessage;

	const parentElement = inputElement.parentElement;
	parentElement.appendChild(errorDivNew);

	inputElement.addEventListener("input", function () {
		errorDivNew.remove();
	});
}

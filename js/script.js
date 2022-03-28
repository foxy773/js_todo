async function fetchCountries() {
	const API = `https://restcountries.com/v3.1/all`;

	const res = await fetch(API);
	const results = await res.json();

	return results;
 }

const filteredList = function(search) {	
	let filteredList = filteredCountries.filter((country) => {
		return country.name.common
		.toLowerCase()
		.includes(search)
	})

	const todoList = document.querySelector("#todo-list")
	todoList.innerHTML = ""
	setUpCountries(filteredList)
	storeInLocal(filteredList)
	
}

const search = document.querySelector("#new-todo").addEventListener("input", function (e){
	filteredList(e.target.value.toLowerCase())
})

const setUpEventListeners = function (array) {
	const allCheckBoxes = document.querySelectorAll(".complete")
	const input = document.querySelector("#new-todo")
	
	allCheckBoxes.forEach((button, index) => {
		 button.addEventListener("click", function (e) {
			  toggleDone(array[index])
			  filteredList("")
		 })
	});

	input.addEventListener("keyup", function (e) {
		const enter = 13

		if (e.keyCode === enter) {
			input.blur()
		}
	})
}

function toggleDone(country){
	return country.done = !country.done
}

const setUpCountries = function (array) {
	array.map((country) => {

		// Creates HTML elements.
		const todoList = document.querySelector("#todo-list")
		const li = document.createElement("li")
		const divView = document.createElement("div")
		const checkButton = document.createElement("button")	
		const countryName = document.createElement("label")
		const removeButton = document.createElement("button")

		// Gives elements classes.
		divView.className = "view"
		checkButton.className = "complete"
		removeButton.className = "destroy"

		// Gives elements properties.
		countryName.innerText = `${country.name.common}`

		if (country.done) {
			checkButton.classList.add("yes")
		} else {
			checkButton.classList.add("no")
		}

		//append elements
		todoList.appendChild(li)
		li.appendChild(divView)
		divView.appendChild(checkButton)
		divView.appendChild(countryName)
		divView.appendChild(removeButton)
	})
	setUpEventListeners(array)
}

async function organizeArray() {
	let unorganized = await fetchCountries()
 	let organized = []

 	unorganized.forEach((country) => {
		country = {...country, done:false}
		organized.push(country)
 	})
	 
	filteredCountries = organized
	setupDone = true

	filteredList("")
}

function storeInLocal() {
	localStorage.setItem("Countries", JSON.stringify(filteredCountries))
 }

function getFromLocal() {
	filteredCountries = JSON.parse(localStorage.getItem("Countries"))
	filteredList("")
 }

function checkLocalStorage() {   // Checks if localstorage contains any data. If it does it will get the data.
	if (localStorage.getItem("Countries") !== null || localStorage.length > 0) {
	  getFromLocal() 					// LocalStorage has data.
	} else {
	  organizeArray()					// LocalStorage has no data and will fetch new data.
	}
 }

 checkLocalStorage()
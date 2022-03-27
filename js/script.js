let filteredCountries = []
let setupDone = false
let searchText = ""

async function fetchCountries() {
	const API = `https://restcountries.com/v3.1/all`;

	const res = await fetch(API);
	const results = await res.json();

	return results;
 }

 // To be called on every change.
const filteredList = function() {
	let filteredList = filteredCountries.filter((country) => {
		return country.name.common
		.toLowerCase()
		.includes(searchText)
	})
	console.log(filteredList)
	setUpCountries(filteredList)
}

const setUpCountries = function (array) {
	array.map((country) => {

		// Creates HTML elements.
		const todoList = document.querySelector("#todo-list") //ul
		const li = document.createElement("li")					//li
		const divView = document.createElement("div")			//div
		const checkButton = document.createElement("button")	//button
		const countryName = document.createElement("label")	//label
		const removeButton = document.createElement("button")	//button

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
}

async function organizeArray() {
	let unorganized = await fetchCountries()
 	let organized = []
 	unorganized.forEach((country) => {
		country = {...country, done:false}
		organized.push(country)
 	})
	 
	filteredCountries = organized
	console.log(filteredCountries, "filtered COuntries")
	setupDone = true

	filteredList()
}

function storeInLocal() {
	localStorage.setItem("Countries", JSON.stringify(filteredCountries))
 }

function getFromLocal() {
	filteredCountries = JSON.parse(localStorage.getItem("Countries"))
 }

function checkLocalStorage() {   // Checks if localstorage contains any data. If it does it will get the data
	if (localStorage.getItem("Countries") !== null || localStorage.length > 0) {
	  getFromLocal() // LocalStorage is empty
	  console.log("Getting from Local")
	} else {
	  organizeArray()
	  console.log("Not anything in local")
	}
 }

 checkLocalStorage()
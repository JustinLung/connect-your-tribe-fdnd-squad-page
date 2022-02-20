// Variables
const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");
const baseURL = "https://tribe.api.fdnd.nl/v1";
const memberEndpoint = "/member";
const errorMsg = document.querySelector(".error");
const preloader = document.querySelector(".preloader");
const totalRandomNFTS = 6;

menu.addEventListener('click', () => {
	menu.classList.toggle('active');
	nav.classList.toggle('active');
});

getRandomData();

// Functions
// Function that gets the data from the Tribe API
async function getData() {
	try {
		const request = await fetch(`${baseURL}${memberEndpoint}`);
		const response = await request.json();
		hidePreloader();
		renderMarketData(response.data.filter(student=>student.squadId === 1));
		return response.data.filter(student => student.squadId === 1)
	} catch (err) {
		errorMessage();
		hidePreloader();
		throw new Error(err);
	}
}

async function renderMarketData(members) {
	// Filters the members on squadId.
	for (let i = 0; i < members.length; i++) {
		document.querySelector(".overviewPageCardContainer").insertAdjacentHTML(
			"afterbegin",
			`          
			<div class="card">
            <figure>
              <img src="${members[i].avatar}" alt="Profile Picture" class="card-image"/>
            </figure>
            <div class="card-header">
              <div class="name-container">
                <p class="name-header">FDND ${members[i].type}</p>
                <p class="name">${members[i].name} ${members[i].surname}</p>
              </div>
              <div class="price-container">
                <p class="price-header">Price</p>
                <p class="price-tag">1.2</p>
              </div>
            </div>
            <a href="detail.html?memberId=${members[i].memberId}">Buy Now</a>
          </div>`
		);
		// If member has no avatar, than it will show another image
		if (members[i].avatar === "") document.querySelector(".card-image").src = "../assets/not-available.png";
	}
}

// Function that renders the data for the market section
async function renderHomeData(members) {
	// Filters the members on squadId.
	for (let i = 0; i < members.length; i++) {
		document.querySelector(".market-container").insertAdjacentHTML(
			"afterbegin",
			`          
			<div class="card">
            <figure>
              <img src="${members[i].avatar}" alt="Profile Picture" class="card-image"/>
            </figure>
            <div class="card-header">
              <div class="name-container">
                <p class="name-header">FDND ${members[i].type}</p>
                <p class="name">${members[i].name} ${members[i].surname}</p>
              </div>
              <div class="price-container">
                <p class="price-header">Price</p>
                <p class="price-tag">1.2</p>
              </div>
            </div>
            <a href="detail.html?memberId=${members[i].memberId}">Buy Now</a>
          </div>`
		);
		// If member has no avatar, than it will show another image
		if (members[i].avatar === "") document.querySelector(".card-image").src = "../assets/not-available.png";
	}
}

/**
 * description
 * @async
 * @returns {Array} Array with randomNfts (students)
 */
async function getRandomData() {
	const data = await getData();
	let randomNfts = [];
	for (let i = 0; i < totalRandomNFTS; i++) {
		let random = Math.floor(Math.random() * data.length);
		while (randomNfts.includes(data[random])) {
			random = Math.floor(Math.random() * data.length);
		}
		randomNfts.push(data[random]);

	}
	renderHomeData(randomNfts)
}

/**
 * 
 * hide preloader after a certain amount of time.
 * @function
 */
function hidePreloader() {
	setTimeout(() => {
		preloader.style.opacity = 0;
		setTimeout(() => {
			document.body.removeChild(preloader)
		}, 300)
	}, 2000)
}

/**
 * error message function that will be hidden after a certain amount of time.
 * @function
 */
function errorMessage() {
	setTimeout(() => {
		errorMsg.style.opacity = 1,
			errorMsg.style.transform = "translateX(0)";
		setTimeout(() => {
			errorMsg.style.opacity = 0,
				errorMsg.style.transform = "translateX(4em)";
		}, 5000)
	}, 300)
}
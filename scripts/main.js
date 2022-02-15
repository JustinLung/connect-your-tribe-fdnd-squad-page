// Variables
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');

const errorMsg = document.querySelector(".error");
const nameEl = document.querySelector('.name');

menu.addEventListener('click', () => {
	menu.classList.toggle('active');
	nav.classList.toggle('active');
});

getData();

// Functions
async function getData() {
	try {
		const request = await fetch("https://tribe.api.fdnd.nl/v1/member");
		const response = await request.json();
		renderData(response.data);
	} catch (err) {
		errorMessage();
		throw new Error(err);
	}
}

async function renderData(members) {
	const memberFilter = members.filter(member => member.squadId == 1)
	for (let i = 0; i < 6; i++) {
		document.querySelector(".market-container").insertAdjacentHTML(
			"afterbegin",
			`          
			<div class="card">
            <figure>
              <img src="${memberFilter[i].avatar}" alt="Profile Picture" class="card-image"/>
            </figure>
            <div class="card-header">
              <div class="name-container">
                <p>${memberFilter[i].type}</p>
                <p class="name">${memberFilter[i].name}</p>
              </div>
              <div class="price-container">
                <p>Price</p>
                <p>1.2</p>
              </div>
            </div>
            <a href="#">Buy Now</a>
          </div>`
		);
		if (memberFilter[i].avatar === "") document.querySelector(".card-image").src = "../assets/not-available.png";
	}
}
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
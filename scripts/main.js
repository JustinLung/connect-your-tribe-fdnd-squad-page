const nav = document.querySelector('.nav')
const menu = document.querySelector('.menu')

menu.addEventListener('click', () => {
	menu.classList.toggle('active')
	nav.classList.toggle('active')
})

getData();

async function getData() {
	try {
		const request = await fetch("https://tribe.api.fdnd.nl/v1/list");
		const response = await request.json()
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function render() {
	//Sla data in variablen op
	const data = await getData();
	console.log(data);
	//Map de array zodat alle namen uppercase zijn
	// const upperCaseName = data.map(person => person.name.toUpperCase());
	//Filter op de array voor iedereen waarbij de naam begint met een H
	const sort = data.filter(tribe => tribe.tribeName == "FDND Founders")
	sort.forEach(tribe => {
		const personEl = Object.assign(document.createElement('p'), {
			textContent: tribe.memberName
		})
		document.querySelector("main").appendChild(personEl)
	})
	console.log(sort);
}

render()
export default class SwapiService {
	_apiURL = "https://swapi.co/api/";
	_getImageURL = "https://starwars-visualguide.com/assets/img";
	people = "people";
	starships = "starships";
	planets = "planets";
	personImgBaseName = "characters";

	//main api call
	getData = async (data = "", id = "") => {
		const response = await fetch(`${this._apiURL}${data}/${id}`);
		return await response.json();
	};
	//obtainig the id of the object in order to get the photo of it from another server
	getID = item => {
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	};

	//getting pictures for individual objects

	getPersonImg = id => {
		return `${this._getImageURL}/${this.personImgBaseName}/${id}.jpg`;
	};
	getStarshipImg = id => {
		return `${this._getImageURL}/${this.starships}/${id}.jpg`;
	};
	getPlanetImg = id => {
		return `${this._getImageURL}/${this.planets}/${id}.jpg`;
	};
	//transforming elements in order to get the neccessary information

	_transformPerson = item => {
		return {
			id: this.getID(item),
			name: item.name,
			gender: item.gender,
			birthYear: item.birth_year,
			eyeColor: item.eye_color
		};
	};

	_transformStarship = item => {
		return {
			id: this.getID(item),
			name: item.name,
			model: item.model,
			costInCredits: item.cost_in_credits,
			length: item.length,
			passengers: item.passengers
		};
	};

	_transformPlanet = item => {
		return {
			id: this.getID(item),
			name: item.name,
			population: item.population,
			rotationPeriod: item.rotation_period,
			diameter: item.diameter,
			img: this.getPlanetImg(this.getID(item))
		};
	};

	//gettting list of the elements
	getAllPeople = async () => {
		const allPeople = await this.getData(this.people);
		const results = allPeople.results.map(el => this._transformPerson(el));
		allPeople.results = results;
		return allPeople;
	};
	getAllPlanets = async () => {
		const allPlanets = await this.getData(this.planets);
		const results = allPlanets.results.map(el => this._transformPlanet(el));
		allPlanets.results = results;
		return allPlanets;
	};

	getAllStarships = async () => {
		const allStarships = await this.getData(this.starships);
		const results = allStarships.results.map(el => this._transformStarship(el));
		allStarships.results = results;
		return allStarships;
	};

	//getting individual elements
	getPerson = async id => {
		const person = await this.getData(this.people, id);
		return this._transformPerson(person);
	};
	getStarship = async id => {
		const starship = await this.getData(this.starships, id);
		return this._transformStarship(starship);
	};
	getPlanet = async id => {
		const planet = await this.getData(this.planets, id);
		return this._transformPlanet(planet);
	};
}

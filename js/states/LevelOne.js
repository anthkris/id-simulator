import {
  setDataText,
  randomScenario,
} from '../main.js';


let starters;

export const getBasicData = () => {
	fetch('./data/starterData.json')
		.then((response) => {
			return response.json();
		})
		.then((starters) => {
			self.starters = starters;
			// Get a random starter
			setDataText(randomScenario(starters), starters);
		});
};
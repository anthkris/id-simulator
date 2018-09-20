import {
  setDataText,
  randomOpportunity,
} from '../main.js';

export const getLevelOneData = () => {
	fetch('./data/LevelOneData.json')
		.then((response) => {
			return response.json();
		})
		.then((levelOneOpps) => {
			const oppsCopy = levelOneOpps.slice(0);
			// Get a random starter
			setDataText(randomOpportunity(oppsCopy), oppsCopy);
		});
};


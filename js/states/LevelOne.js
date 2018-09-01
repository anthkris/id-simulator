let starters;

const getBasicData = () => {
	fetch('/js/data/starterData.json')
		.then((response) => {
			return response.json();
		})
		.then((starters) => {
			self.starters = starters;
			// Get a random starter
			setDataText(randomScenario(starters), starters);
		});
};
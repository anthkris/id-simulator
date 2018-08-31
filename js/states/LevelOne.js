let starters;

const getBasicData = () => {
	fetch('/js/data/starterData.json')
		.then((response) => {
			return response.json();
		})
		.then((starters) => {
			self.starters = starters;
			// TODO: Get a random starter
			setDataText(starters[0], starters);
		});
};

//TODO: Need to update stats in scenarios now
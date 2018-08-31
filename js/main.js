const setDataText = (scenario, allData) => {
	const cardContent = document.getElementById('card-content');
	const content = document.getElementById('content-div');
	const contentText = document.getElementById('content-text');
	const personaDiv = document.getElementById('persona-div');
	personaDiv.innerHTML = '';
	const personaName = document.getElementById('persona-name');

	contentText.innerHTML = scenario.opportunity;

	const personaImg = document.createElement('img');
	personaImg.setAttribute('src', scenario.image);
	personaImg.setAttribute('class', 'persona-img');
	personaDiv.append(personaImg);

	personaName.innerHTML = `<p>${scenario.character}</p>`;

	setButtons(scenario, allData);
};

const setButtons = (scenario, allData) => {
	const cardFooter = document.getElementById('card-footer');
	cardFooter.setAttribute('class', 'columns');
	cardFooter.innerHTML = '';

	const leftColumn = document.createElement('div');
	leftColumn.setAttribute('class', 'column');
	const yesButton = document.createElement('button');
	yesButton.setAttribute('class', 'button is-success is-fullwidth');
	yesButton.innerHTML = 'Yes';
	yesButton.addEventListener('click', (e) => {
		console.log(allData);
		respondToAction(scenario, allData, 'yes');
	});
	leftColumn.append(yesButton);

	const rightColumn = document.createElement('div');
	rightColumn.setAttribute('class', 'column');
	const noButton = document.createElement('button');
	noButton.setAttribute('class', 'button is-danger is-fullwidth');
	noButton.innerHTML = 'No';
	noButton.addEventListener('click', (e) => {
		respondToAction(scenario, allData, 'no');
	});
	rightColumn.append(noButton);

	const oneColumn = document.createElement('div');
	oneColumn.setAttribute('class', 'column');
	const continueButton = document.createElement('button');
	continueButton.setAttribute('class', 'button is-info is-fullwidth');
	continueButton.innerHTML = 'Continue';
	continueButton.addEventListener('click', (e) => {
		if (scenario.response.type === 'last') {
			respondToAction(scenario, allData, 'last', getBasicData);
		} else {
			respondToAction(scenario, allData, 'continue');
		}
	});
	oneColumn.append(continueButton);

	switch(scenario.response.type) {
		case 'y/n':
			cardFooter.append(leftColumn);
			cardFooter.append(rightColumn);
			break;
		case 'continue':
		case 'last':
			cardFooter.append(oneColumn);
			break;
	}
};

const respondToAction = (scenario, allData, type, func = () => {}) => {
	let newText;
	const responseData = scenario.response;

	switch (type) {
		case 'yes':
			newText = allData[responseData.yes];
			setDataText(newText, allData);
			break;
		case 'no':
			newText = allData[responseData.no];
			setDataText(newText, allData);
			break;
		case 'continue':
			newText = allData[responseData.goto];
			setDataText(newText, allData);
			break;
		case 'last':
			func();
			break;
	}
};
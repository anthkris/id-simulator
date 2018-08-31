const STARTERDATA = {
	"money": 1,
	"happiness": 30,
	"skill": 20,
	"influence": 0
};

let instructions;

const createIcons = (starterData) => {
	const cardHeader = document.getElementById('card-header');
	cardHeader.setAttribute('class', 'columns is-mobile is-multiline');

	const moneyDiv = document.createElement('div');
	moneyDiv.setAttribute('id', 'money');
	moneyDiv.setAttribute('class', 'column is-half-mobile');
	const moneyInnerDiv = document.createElement('div');
	moneyInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const moneyIcon = document.createElement('img');
	moneyIcon.setAttribute('src', '/icons/money_stack_DL.svg');
	moneyIcon.setAttribute('alt', 'Your money');
	moneyIcon.setAttribute('class', 'heading-icon money-icon');
	const moneyText = document.createElement('span');
	moneyText.setAttribute('id', 'money-text');
	moneyText.innerHTML = `$${starterData.money}K`;
	moneyInnerDiv.append(moneyIcon);
	moneyInnerDiv.append(moneyText);
	moneyDiv.append(moneyInnerDiv);

	const happyDiv = document.createElement('div');
	happyDiv.setAttribute('id', 'happiness');
	happyDiv.setAttribute('class', 'column is-half-mobile');
	const happyInnerDiv = document.createElement('div');
	happyInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const happyIcon = document.createElement('img');
	happyIcon.setAttribute('src', '/icons/happyheart_DL.svg');
	happyIcon.setAttribute('alt', 'Client Happiness');
	happyIcon.setAttribute('class', 'heading-icon happy-icon');
	const happyText = document.createElement('span');
	happyText.setAttribute('id', 'happy-text');
	happyText.innerHTML = `${starterData.happiness}`;
	happyInnerDiv.append(happyIcon);
	happyInnerDiv.append(happyText);
	happyDiv.append(happyInnerDiv);

	const likeDiv = document.createElement('div');
	likeDiv.setAttribute('id', 'influence');
	likeDiv.setAttribute('class', 'column is-half-mobile');
	const likeInnerDiv = document.createElement('div');
	likeInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const likeIcon = document.createElement('img');
	likeIcon.setAttribute('src', '/icons/like_DL.svg');
	likeIcon.setAttribute('alt', 'Influence');
	likeIcon.setAttribute('class', 'heading-icon happy-icon');
	const likeText = document.createElement('span');
	likeText.setAttribute('id', 'influence-text');
	likeText.innerHTML = `${starterData.influence}`;
	likeInnerDiv.append(likeIcon);
	likeInnerDiv.append(likeText);
	likeDiv.append(likeInnerDiv);

	const skillDiv = document.createElement('div');
	skillDiv.setAttribute('id', 'skill');
	skillDiv.setAttribute('class', 'column is-half-mobile');
	const skillInnerDiv = document.createElement('div');
	skillInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const skillIcon = document.createElement('img');
	skillIcon.setAttribute('src', '/icons/gears0001_DL.svg');
	skillIcon.setAttribute('alt', 'Influence');
	skillIcon.setAttribute('class', 'heading-icon skill-icon');
	const skillText = document.createElement('span');
	skillText.setAttribute('id', 'skill-text');
	skillText.innerHTML = `${starterData.skill}`;
	skillInnerDiv.append(skillIcon);
	skillInnerDiv.append(skillText);
	skillDiv.append(skillInnerDiv);

	cardHeader.append(moneyDiv);
	cardHeader.append(happyDiv);
	cardHeader.append(likeDiv);
	cardHeader.append(skillDiv);
};

const getInstructionData = () => {
	fetch('/js/data/instructionData.json')
		.then((response) => {
			return response.json();
		})
		.then((instructions) => {
			self.instructions = instructions;
			setInstructionText(instructions[0]);
		});
};

const setInstructionText = (instructions) => {
	const cardContent = document.getElementById('card-content');
	const content = document.getElementById('content-div');
	const contentText = document.getElementById('content-text');
	const personaDiv = document.getElementById('persona-div');
	personaDiv.innerHTML = '';
	const personaName = document.getElementById('persona-name');

	console.log(instructions);
	contentText.innerHTML = instructions.opportunity;

	const personaImg = document.createElement('img');
	personaImg.setAttribute('src', instructions.image);
	personaImg.setAttribute('class', 'persona-img');
	personaDiv.append(personaImg);

	personaName.innerHTML = `<p>${instructions.character}</p>`;

	setButtons(instructions);
};

const setButtons = (data) => {
	const cardFooter = document.getElementById('card-footer');
	cardFooter.setAttribute('class', 'columns');
	cardFooter.innerHTML = '';

	const leftColumn = document.createElement('div');
	leftColumn.setAttribute('class', 'column');
	const yesButton = document.createElement('button');
	yesButton.setAttribute('class', 'button is-success is-fullwidth');
	yesButton.innerHTML = 'Yes';
	yesButton.addEventListener('click', (e) => {
		respondToAction(data.response, 'yes');
	});
	leftColumn.append(yesButton);

	const rightColumn = document.createElement('div');
	rightColumn.setAttribute('class', 'column');
	const noButton = document.createElement('button');
	noButton.setAttribute('class', 'button is-danger is-fullwidth');
	noButton.innerHTML = 'No';
	noButton.addEventListener('click', (e) => {
		respondToAction(data.response, 'no');
	});
	rightColumn.append(noButton);

	const oneColumn = document.createElement('div');
	oneColumn.setAttribute('class', 'column');
	const continueButton = document.createElement('button');
	continueButton.setAttribute('class', 'button is-info is-fullwidth');
	continueButton.innerHTML = 'Continue';
	continueButton.addEventListener('click', (e) => {
		respondToAction(data.response, 'continue');
	});
	oneColumn.append(continueButton);

	switch(data.response.type) {
		case 'y/n':
			cardFooter.append(leftColumn);
			cardFooter.append(rightColumn);
			break;
		case 'continue':
			cardFooter.append(oneColumn);
			break;
	}
};

const respondToAction = (responseData, type) => {
	let newInstructions;

	switch (type) {
		case 'yes':
			newInstructions = self.instructions[responseData.yes];
			setInstructionText(newInstructions);
			break;
		case 'no':
			newInstructions = self.instructions[responseData.no];
			setInstructionText(newInstructions);
			break;
		case 'continue':
			newInstructions = self.instructions[responseData.goto];
			setInstructionText(newInstructions);
			break;
	}
};

const initGameUI = () => {
	createIcons(STARTERDATA);
	getInstructionData();
};

initGameUI();
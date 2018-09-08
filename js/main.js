import {
  createIcons,
  STARTERDATA,
} from './states/InstructionState'
import {
  getBasicData,
} from './states/LevelOne'
import '../css/main.scss'
import idb from 'idb';

console.log('idb', idb)

export const setDataText = (scenario, allData) => {
	const cardContent = document.getElementById('card-content');
	const content = document.getElementById('content-div');
	const contentText = document.getElementById('content-text');
	const personaDiv = document.getElementById('persona-div');
	personaDiv.setAttribute('class', 'aspect-ratio-container');
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
	// Clear
	cardFooter.innerHTML = '';

	const leftColumn = document.createElement('div');
	leftColumn.setAttribute('class', 'column');
	const yesButton = document.createElement('button');
	yesButton.setAttribute('class', 'button green-button is-fullwidth');
	yesButton.innerHTML = 'Yes';
	yesButton.addEventListener('click', (e) => {
		console.log(allData);
		respondToAction(scenario, allData, 'yes');
	});
	leftColumn.append(yesButton);

	const rightColumn = document.createElement('div');
	rightColumn.setAttribute('class', 'column');
	const noButton = document.createElement('button');
	noButton.setAttribute('class', 'button red-button is-fullwidth');
	noButton.innerHTML = 'No';
	noButton.addEventListener('click', (e) => {
		respondToAction(scenario, allData, 'no');
	});
	rightColumn.append(noButton);

	const oneColumn = document.createElement('div');
	oneColumn.setAttribute('class', 'column');
	const continueButton = document.createElement('button');
	continueButton.setAttribute('class', 'button blue-button is-fullwidth');
	continueButton.innerHTML = 'Continue';
	continueButton.addEventListener('click', (e) => {
		if (scenario.response.type === 'last') {
			respondToAction(scenario, allData, 'last', getBasicData);
		} else if (scenario.response.type === 'once') {
			respondToAction(scenario, allData, 'once');
		} else {
			respondToAction(scenario, allData, 'continue');
		}
	});
	oneColumn.append(continueButton);
	console.log(scenario.response.type);

	// Keyboard navigation
	const yKeyDown = (e) => {
		e.preventDefault();
		if (e.keyCode === 89) {
			respondToAction(scenario, allData, 'yes');
			removeEventListeners();
		}
	};

	const nKeyDown = (e) => {
		e.preventDefault();
		if (e.keyCode === 78) {
			respondToAction(scenario, allData, 'no');
			removeEventListeners();
		}
	};

	const spaceKeyDown = (e) => {
		e.preventDefault();
		if (e.keyCode === 32) {
			if (scenario.response.type === 'continue') {
				respondToAction(scenario, allData, 'continue');
				removeEventListeners();
			} else if (scenario.response.type === 'once') {
				respondToAction(scenario, allData, 'once');
				removeEventListeners();
			} else if (scenario.response.type === 'last') {
				respondToAction(scenario, allData, 'last', getBasicData);
				removeEventListeners();
			}
		}
	};

	const removeEventListeners = () => {
		document.removeEventListener('keydown', yKeyDown, false);
		document.removeEventListener('keydown', nKeyDown, false);
		document.removeEventListener('keydown', spaceKeyDown, false);
	};

	if (scenario.response.type === 'y/n') {
		document.addEventListener('keydown', yKeyDown, false);
		document.addEventListener('keydown', nKeyDown, false);
	}

	if (scenario.response.type === 'continue') {
		document.addEventListener('keydown', spaceKeyDown, false);
	}

	if (scenario.response.type === 'last') {
		document.addEventListener('keydown', spaceKeyDown, false);
	}

	switch(scenario.response.type) {
		case 'y/n':
			cardFooter.append(leftColumn);
			cardFooter.append(rightColumn);
			break;
		case 'continue':
		case 'last':
		case 'once':
			cardFooter.append(oneColumn);
			break;
	}
};

const respondToAction = (scenario, allData, type, func = () => {}) => {
	let newText;
	let id;
	const responseData = scenario.response;

	switch (type) {
		case 'yes':
			id = responseData.yes;
			break;
		case 'no':
			id = responseData.no;
			break;
		case 'continue':
			id = responseData.goto;
			break;
		case 'once':
			id = responseData.goto;
			// Delete once scenarios from data
			allData.splice(findScenarioIndex(allData, scenario.id, "id"), 1);
			allData.splice(findScenarioIndex(allData, scenario.response.delete[0], "id"), 1);
			allData.splice(findScenarioIndex(allData, scenario.response.delete[1], "id"), 1);
			break;
		case 'last':
			func();
			return;
			break;
	}
	if (id === -1) {
		newText = randomScenario(allData);
		console.log(newText);
		setDataText(newText, allData);
	} else {
		newText = allData.find((data) => {
			return data.id === id;
		});
		setDataText(newText, allData);
	}
};

const findScenarioIndex = (allData, value, param) => {
	let found;
    allData.filter((scenario, i) => {
        if (scenario[param] === value) {
            found = i;
            console.log(scenario, found);
            return;
        };
    })
    return found;
}

export const randomScenario = (allData) => {
	// Return a psuedorandom scenario id
	// As long as that scenario is not a responseType of continue
	const filteredData = allData.filter((scenario) => {
		return scenario.response.type !== "continue" && scenario.response.type !== "once" ;
	});

	const random = filteredData[Math.floor(Math.random()*filteredData.length)];
	return random;

};

let instructions;

const getInstructionData = () => {
  fetch('./data/instructionData.json')
    .then((response) => {
      return response.json();
    })
    .then((instructions) => {
      self.instructions = instructions;
      setDataText(instructions[0], instructions);
    });
};

const initGameUI = () => {
  createIcons(STARTERDATA);
  getInstructionData();
};

initGameUI();

// TODO: Should be able to update stats based on yes or no
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

    switch (scenario.response.type) {
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

const respondToAction = (scenario, allData, type, func = () => { }) => {
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
            updateStats(scenario); //Method declared below
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
        }
    });
    return found;
};


export const randomScenario = (allData) => {
    // Return a psuedorandom scenario id
    // As long as that scenario is not a responseType of continue
    const filteredData = allData.filter((scenario) => {
        return scenario.response.type !== "continue" && scenario.response.type !== "once";
    });

    const random = filteredData[Math.floor(Math.random() * filteredData.length)];
    return random;

};

// TODO: Should be able to update stats based on yes or no
const updateStats = (scenario) => {

    updateMoneyStats(scenario); //using money-text
    updateHappinessStats(scenario); //using happy-text
    updateInfluenceStats(scenario); //using influence-text
    updateSkillStats(scenario); //using skil-text

};

const updateMoneyStats = (scenario) => {
    var str = document.getElementById('money-text').innerHTML; //grab current value

    //don't need this check if not using decimals comment/uncomment to see difference
    //var thousand = str.indexOf('K') > -1; //see if current value is over 1,000

    var tempMoney = str.replace(new RegExp('\\$|\\.|\\,|K', 'g'), ''); //remove special chars
    if (typeof scenario.rewards !== 'undefined') //make sure there is value to add and then display correctly
    {
        if (tempMoney.length > 1) {
            //this produces a decimal value comment/uncomment to see difference
            //str = (thousand && parseInt(scenario.rewards.money) > 0) ? (parseInt(tempMoney * 100) + parseInt(scenario.rewards.money)) / 1000 : parseInt(tempMoney * 100) / 1000;

            //this produces a non decimal value comment/uncomment to see difference
            str = (parseInt(scenario.rewards.money) > 0) ? (parseInt(tempMoney) + parseInt(scenario.rewards.money)) : parseInt(tempMoney);
        }
        else {
            //this produces a decimal value comment/uncomment to see difference
            //str = (thousand && parseInt(scenario.rewards.money) > 0) ? (parseInt(tempMoney * 1000) + parseInt(scenario.rewards.money)) / 1000 : parseInt(tempMoney * 1000) / 1000;

            //this produces a decimal value comment/uncomment to see difference
            str = (parseInt(scenario.rewards.money) > 0) ? (parseInt(tempMoney * 1000) + parseInt(scenario.rewards.money)) : parseInt(tempMoney * 1000);
        }
    }
    //don't need this if using decimal values for display
    else if (tempMoney.length < 2) {
        str = tempMoney * 1000;
    }
    else
        str = tempMoney;

    //this will display the decimal value
    //document.getElementById('money-text').innerHTML = '$' + str + 'K';

    //this will display the non decimal value
    document.getElementById('money-text').innerHTML = formatter.format(str);
};

//this method formats the money string as a cerrency
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

const updateHappinessStats = (scenario) => {
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('happy-text').innerHTML = parseInt(document.getElementById('happy-text').innerHTML) + parseInt(scenario.rewards.happiness);
    }
};

const updateInfluenceStats = (scenario) => {
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('influence-text').innerHTML = parseInt(document.getElementById('influence-text').innerHTML) + parseInt(scenario.rewards.influence);
    }
};


const updateSkillStats = (scenario) => {

    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('skill-text').innerHTML = parseInt(document.getElementById('skill-text').innerHTML) + parseInt(scenario.rewards.skill);
    }
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


import {
  createIcons,
  setYesButton,
  setNoButton,
  setContinueButton
} from './GUI';
import {
  getInstructionData,
} from './states/InstructionState';
import {
  updateStats
} from './Stats';
import {
  setEventListeners,
  setClickListeners,
  setMouseEnterListeners
} from './Input';
import {
  getLevelOneData
} from './states/LevelOne';
import '../css/main.scss';
import idb from 'idb';


console.log('idb', idb);

export let playerStats = {
    "money": 1000,
    "health": 100,
    "workload": 0,
    "reputation": 50,
};

const MAX_WORKLOAD = 15;

let globalTurns = 0;

// Could I generate a random professional-sounding email? And put it in the context of the instructions: "You need an email address to start your business. Make it a good one...""

// Threshold: Number between 0 and 1 that represents how tough it is to get this opportunity
// Min: Number between 0 and 1 that represents the minimum likelihood of this opportunity occuring
// Max: Number between 0 and 1 that represents the maximum likelihood of this opportunity occuring
// Max Impact: Number between 0 and 100 that represents how impactful this opportunity is to the player's in-game career
// Status: Represents the status of the opportunity
  // Future means that the opportunity can be presented in the game
  // Present means that the opportunity is being presented in the game
  // Past means that the opportunity can no longer be presented in the game
// Reuse: An object describing if and how this opportunity can be reused. 
  // Max resuse is the max number of times the opportunity can be offered (based on acceptance)
  // Used is the number of times the opportunty has been accepted
  // Last used represents the number of turns since the opportunity was last used
  // Turns represents the minimum number of turns that must elapse before the status of this opportunity can go back to future
// Rewards: An object implemented on either a yes or a no response that indicates the changes to be made to the player's stats
  // Money
  // Health
  // Workload 
  // Reputation
// Impact: An object on yes and no responses that represents the consequences of the response on other opportunities
// Game Play and Win/Lose Conditions
  // An in-game year lasts 30 turns (I totally just made that up)
  // As a part of the year, the player will be presented with an opportunity each turn
  // Every accepted opportunity affects the one or more of the players stats (money, health, workload, repuation)
  // If the player's health dips below 10 (I also totally just made that up) they will be in hospital due to stress and anxiety and they will lose
  // If the player's money dips below $500 (yup, made up) they will be unable to keep up with expenses and they will lose
  // If the player's reputation dips below 10 (you guessed it), they will be unable to find clients and they will lose
  // If the player's workload goes beyond 15 projects, then it will begin to negatively affect their health (to a large extent) and reputation (to a lesser extent)
  // Workload should "wear off" in some number of turns, depending on the opportunity
  // If a player makes it 5 in-game years, they should have the opportunity to go for their CPPMPLP which will be an opportunity with a +workload, -money; +reputation on completion
  // Upon successful completion of the CPPMPLP, the player wins
  // If a player has completed certain opportunities (such as starting a blog, starting a podcast, accepting speaking engagements), they should be invited to join the Thot Leader Club (after having to a yes/no dispute maybe? boss battle-like), which will +++reputation



export const setDataText = (opportunity, allOpps) => {
	const cardContent = document.getElementById('card-content');
	const content = document.getElementById('content-div');
	const contentText = document.getElementById('content-text');
	const personaDiv = document.getElementById('persona-div');
	personaDiv.setAttribute('class', 'aspect-ratio-container');
	personaDiv.innerHTML = '';
	const personaName = document.getElementById('persona-name');

    contentText.innerHTML = opportunity.opportunity;

    const personaImg = document.createElement('img');
    personaImg.setAttribute('src', opportunity.image);
    personaImg.setAttribute('class', 'persona-img');
    personaDiv.append(personaImg);

    personaName.innerHTML = `<p>${opportunity.character}</p>`;

    if (opportunity.status) {
        opportunity.status = 'present';
    }

    setButtons(opportunity['response_type'].type, opportunity, allOpps);
};

const setButtons = (responseType, opportunity, allOpps, yesOrNo) => {
    const cardFooter = document.getElementById('card-footer');
    cardFooter.setAttribute('class', 'columns');
    // Clear
    cardFooter.innerHTML = '';
    
    switch (responseType) {
        case 'y/n':
            cardFooter.append(setYesButton(opportunity, allOpps));
            cardFooter.append(setNoButton(opportunity, allOpps));
            break;
        case 'continue':
        case 'last':
            cardFooter.append(setContinueButton(opportunity, allOpps));
            break;
    }

    setEventListeners(responseType, opportunity, allOpps, yesOrNo);
    setClickListeners(responseType, opportunity, allOpps, yesOrNo);
    setMouseEnterListeners(responseType, opportunity, allOpps, yesOrNo);
};

// On click yes or no,
// Show updated text and continue button

const updateAfterChoice = (response, opportunity, allOpps, yesOrNo) => {
    let nextOpp;
    const contentText = document.getElementById('content-text');
    contentText.innerHTML = response['response_text'];

    if (opportunity.status) {
        opportunity.status = 'past';
    }

    // Update stats if possible
    // Update workload by subtracting current workload after duration
    if (response.rewards !== undefined) {
        playerStats = updateStats(response, opportunity, playerStats);
    }

    // Update reuse.used and reuse.last_used
    if (opportunity['reuse'] !== undefined) {
        console.log('got a real yes/no opportunity');
        // Increment global turns once we get a real opportunity
        globalTurns++;
        if(yesOrNo === 'yes') {
            opportunity['reuse'].used++;
            opportunity['reuse']['last_used'] = globalTurns;
        }
    }

    console.log(opportunity)

    setButtons('continue', opportunity, allOpps, yesOrNo);
    
};


// On click continue button, go to goto

export const respondToAction = (responseType, opportunity, allOpps, yesOrNo, func) => {
    let nextOpp;
    let id;
    console.log(func);

    if (responseType === 'last') {
        // Passing function name as a string, so need to get the real function
        switch (func) {
            case "getLevelOneData": getLevelOneData(); break;
        }
        return;
    }

    if (responseType === 'y/n') {
        updateAfterChoice(opportunity[`response_${yesOrNo}`], opportunity, allOpps);
        return;
    }

    if (responseType === 'continue' && opportunity['go_to_step']) {
        id = opportunity['go_to_step'];
        nextOpp = findMatchingOpp(allOpps, id);
    } else {
        console.log('is it random?')
        nextOpp = randomOpportunity(allOpps, playerStats);
    }

    setDataText(nextOpp, allOpps);

    // if (goto && goto !== -1) {
    //     nextOpp = findMatchingOpp(allOpps, goto);
    //     setDataText(nextOpp, allOpps);
    //     return;
    // }

    // switch (type) {
    //     case 'yes':
    //         id = opportunity['response_yes'].goto || -1;
    //         updateAfterChoice(opportunity['response_yes'], id, opportunity, allOpps, 'yes');
    //         return;
    //         break;
    //     case 'no':
    //         id = opportunity['response_no'].goto || -1;
    //         updateAfterChoice(opportunity['response_yes'], id, opportunity, allOpps, 'no');
    //         return;
    //         break;
    //     case 'continue':
    //         if (opportunity['response_continue']) {
    //             id = opportunity['response_continue'].goto;
    //             nextOpp = findMatchingOpp(allOpps, id);
    //         } else {
    //             console.log('is it random?')
    //             nextOpp = randomOpportunity(allOpps, playerStats);
    //         }
    //         console.log(id);
    //         setDataText(nextOpp, allOpps);
    //         break;
    //     case 'last':
    //         func();
    //         return;
    //         break;
    // }
};

const findMatchingOpp = (allOpps, id) => {
   return allOpps.find((data) => {
        return data.id === id;
    });
};

const findOpportunityIndex = (allOpps, value, param) => {
    let found;
    allOpps.filter((opportunity, i) => {
        if (opportunity[param] === value) {
            found = i;
            console.log(opportunity, found);
            return;
        }
    });
    return found;
};


export const randomOpportunity = (allOpps, stats = playerStats) => {
    console.log(stats, allOpps);
    // Return a psuedorandom opportunity id
    // As long as that opportunity is not a responseType of continue
    const filteredData = filterOpps(allOpps, stats);

    const random = filteredData[Math.floor(Math.random() * filteredData.length)];
    return random;
};

const filterOpps = (allOpps, stats) => {
    /* Only allow opportunities into the pool if:
        - they aren't continue messages
        - they have a status of 'future'
        - the player has reached any necessary threshold prerequisites (opportunity.threshold object)
        - the opportunity has reached its turns to wait (opportunity.reuse.turns)
        - the opportunity has uses left
    */
    const filteredOpps = allOpps.filter((opportunity) => {
        const reachedMoneyThreshold = stats.money >= opportunity.threshold.money;
        const reachedHealthThreshold = stats.health >= opportunity.threshold.health;
        // If have appropriate number of workload openings or workload threshold is null;
        const haveWorkloadOpenings = (MAX_WORKLOAD - stats.workload) >= opportunity.threshold.workload || opportunity.threshold.workload === null;
        const reachedReputationThreshold = stats.reputation >= opportunity.threshold.reputation;
        let reachedTurnsToWait = false;
        if (opportunity.reuse.used > 0) {
            reachedTurnsToWait = globalTurns - opportunity.reuse['last_used'] >= opportunity.reuse.turns;
        } else if (opportunity.reuse.used === 0) {
             reachedTurnsToWait = true;
        }
        const hasUsesLeft = opportunity.reuse.used < opportunity.reuse['max_reuse'];
        console.log(haveWorkloadOpenings, MAX_WORKLOAD - stats.workload);
        return opportunity['response_type'].type !== 'continue' && opportunity.status === 'future' &&
            reachedMoneyThreshold && reachedReputationThreshold && haveWorkloadOpenings && reachedHealthThreshold &&
            reachedTurnsToWait && hasUsesLeft;
    });
    console.log(filteredOpps);
    return filteredOpps;
}

const initGameUI = () => {
    createIcons(playerStats);
    getInstructionData()
        .then((instructions) => {
            setDataText(instructions[0], instructions);
        });
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceworker.js").then(function (registration) {
    console.log("Service Worker registered with scope:", registration.scope);
  }).catch(function (err) {
    console.log("Service worker registration failed:", err);
  });
}

const installButton = document.getElementById('installer')

window.addEventListener("beforeinstallprompt", function (install_event) {
  install_event.preventDefault(); // Prevents immediate prompt display
  installButton.addEventListener("click", function (e) {
    install_event.prompt();
  });
  installButton.hidden = false; // Make button operable
});

initGameUI();


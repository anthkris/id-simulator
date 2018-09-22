import {
  getLevelOneData
} from './states/LevelOne';

import {
  respondToAction
} from './main.js';

// Keyboard navigation
const yKeyDown = (e, responseType, opportunity, allOpps) => {
    e.preventDefault();
    if (e.keyCode === 89) {
        respondToAction(responseType, opportunity, allOpps, 'yes');
    }
};

const nKeyDown = (e, responseType, opportunity, allOpps) => {
    e.preventDefault();
    if (e.keyCode === 78) {
        respondToAction(responseType, opportunity, allOpps, 'no');
    }
};

const spaceKeyDown = (e, responseType, opportunity, allOpps) => {
    e.preventDefault();
    if (e.keyCode === 32) {
        if (responseType === 'continue') {
            respondToAction(responseType, opportunity, allOpps, '', null);
        } else if (responseType === 'last') {
            respondToAction(responseType, opportunity, allOpps, '', opportunity['response_type'].func);
        }
    }
};

let yesHandler;
let noHandler;
let continueHandler;

export const setEventListeners = (responseType, opportunity, allOpps, yesOrNo) => {
    console.log(responseType);
    removeEventListeners();

    yesHandler = (e) => { 
        console.log(responseType);
        yKeyDown(e, responseType, opportunity, allOpps);
    }
    noHandler = (e) => {
        console.log(responseType);
        nKeyDown(e, responseType, opportunity, allOpps);
    }
    continueHandler = (e) => {
        console.log(responseType);
        spaceKeyDown(e, responseType, opportunity, allOpps);
    }
    // Set Keyboard access
    if (responseType === 'y/n') {
        document.addEventListener('keydown', yesHandler, false);
        document.addEventListener('keydown', noHandler, false);
    }

    if (responseType === 'continue') {
        console.log('added space key event listener');
        document.addEventListener('keydown', continueHandler, false);
    }

    if (responseType === 'last') {
        document.addEventListener('keydown', continueHandler, false);
    }
}

const removeEventListeners = () => {
    console.log('event listeners removed');
    document.removeEventListener('keydown', yesHandler, false);
    document.removeEventListener('keydown', noHandler, false);
    document.removeEventListener('keydown', continueHandler, false);
};

export const setClickListeners = (responseType, opportunity, allOpps, yesOrNo) => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const continueButton = document.getElementById('continue-button');

    console.log(responseType);

    if (responseType === 'y/n') {
        yesButton.addEventListener('click', (e) => {
            console.log(allOpps);
            respondToAction(responseType, opportunity, allOpps , 'yes');
        });
        noButton.addEventListener('click', (e) => {
            respondToAction(responseType, opportunity, allOpps, 'no');
        });
    } else {
        continueButton.addEventListener('click', (e) => {
            if (responseType === 'last') {
                console.log('last click')
                respondToAction(responseType, opportunity, allOpps, '', opportunity['response_type'].func);
            } else if (responseType === 'continue'){
                respondToAction(responseType, opportunity, allOpps, '', null);
            }
        });
    }
};

const setPlusMoneyClasses = (yesRewards, moneyText) => {
    if(yesRewards.money <= 1000) {
        moneyText.classList.add('plus-one');
    } else if (yesRewards.money >= 1001) {
        moneyText.classList.add('plus-two');
    } else if (yesRewards.money >= 5000) {
        moneyText.classList.add('plus-three');
    }
};

const setPlusWorkloadlasses = (yesRewards, workloadText) => {
    if(yesRewards.workload <= 3) {
        workloadText.classList.add('plus-one');
    } else if (yesRewards.workload >= 4) {
        workloadText.classList.add('plus-two');
    } else if (yesRewards.workload >= 8) {
        workloadText.classList.add('plus-three');
    }
};

const setPlusReputationClasses = (yesRewards, reputationText) => {
    if(yesRewards.reputation <= 3) {
        reputationText.classList.add('plus-one');
    } else if (yesRewards.reputation >= 4) {
        reputationText.classList.add('plus-two');
    } else if (yesRewards.reputation >= 8) {
        reputationText.classList.add('plus-three');
    }
};

const setMinusHealthClasses = (yesRewards, healthText) => {
    if(yesRewards.health >= -3) {
        healthText.classList.add('minus-one');
    } else if (yesRewards.health <= -4) {
        healthText.classList.add('minus-two');
    } else if (yesRewards.health <= -8) {
        healthText.classList.add('minus-three');
    }
};

const removeAllPreviewClasses = (statText) => {
    statText.classList.remove('plus');
    statText.classList.remove('plus-one');
    statText.classList.remove('plus-two');
    statText.classList.remove('plus-three');
    statText.classList.remove('minus');
    statText.classList.remove('minus-one');
    statText.classList.remove('minus-two');
    statText.classList.remove('minus-three');
}

export const setMouseEnterListeners = (responseType, opportunity, allOpps, yesOrNo) => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const moneyText = document.getElementById('money-text');
    const healthText = document.getElementById('health-text');
    const workloadText = document.getElementById('workload-text');
    const reputationText = document.getElementById('reputation-text');


    if (responseType === 'y/n' && opportunity['response_yes'].rewards !== undefined) {
        const yesRewards = opportunity['response_yes'].rewards;
        yesButton.addEventListener('mouseenter', (e) => {
            if(yesRewards.money > 0) {
                moneyText.classList.add('plus');
                setPlusMoneyClasses(yesRewards, moneyText);
            }
            if(yesRewards.workload > 0) {
                workloadText.classList.add('plus');
                setPlusWorkloadClasses(yesRewards, workloadText);
            }
            if(yesRewards.reputation > 0) {
                reputationText.classList.add('plus');
                setPlusReputationClasses(yesRewards, reputationText);
            }
            if(yesRewards.health < 0) {
                healthText.classList.add('minus');
                setMinusHealthClasses(yesRewards, healthText);
            }
            
        });
        yesButton.addEventListener('mouseleave', (e) => {
            removeAllPreviewClasses(moneyText);
            removeAllPreviewClasses(healthText);
            removeAllPreviewClasses(workloadText);
            removeAllPreviewClasses(reputationText);
        });
        // noButton.addEventListener('mouseenter', (e) => {
        //     respondToAction(responseType, opportunity, allOpps, 'no');
        // });
    } 

};
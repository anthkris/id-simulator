import {
  getLevelOneData
} from './states/LevelOne';

import {
  respondToAction
} from './main.js';

// Keyboard navigation
const yKeyDown = (e, respondToAction, opportunity, allOpps) => {
    e.preventDefault();
    if (e.keyCode === 89) {
        respondToAction(opportunity, allOpps, 'yes');
    }
};

const nKeyDown = (e, respondToAction, opportunity, allOpps) => {
    e.preventDefault();
    if (e.keyCode === 78) {
        respondToAction(opportunity, allOpps, 'no');
    }
};

const spaceKeyDown = (e, respondToAction, opportunity, allOpps, yesOrNo) => {
    e.preventDefault();
    if (e.keyCode === 32) {
        if (opportunity['response_type'].type === 'continue') {
            respondToAction(opportunity, allOpps, 'continue');
        } else if (opportunity['response_type'].type === 'last') {
            respondToAction(opportunity, allOpps, 'last', getLevelOneData);
        } else if (opportunity['response_type'].type === 'y/n' || opportunity[`response_${yesOrNo}`].goto) {
            console.log(yesOrNo);
            respondToAction(opportunity, allOpps, 'continue', null, opportunity[`response_${yesOrNo}`].goto);
        } else {
            respondToAction(opportunity, allOpps, 'continue', null, -1);
        }
    }
};

let yesHandler;
let noHandler;
let continueHandler;

export const setEventListeners = (responseType, opportunity, allOpps, yesOrNo) => {
    removeEventListeners();

    yesHandler = (e) => { 
        yKeyDown(e, respondToAction, opportunity, allOpps);
    }
    noHandler = (e) => {
        nKeyDown(e, respondToAction, opportunity, allOpps);
    }
    continueHandler = (e) => {
        spaceKeyDown(e, respondToAction, opportunity, allOpps, yesOrNo);
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
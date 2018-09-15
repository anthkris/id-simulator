import {
  getBasicData
} from './states/LevelOne';

// Keyboard navigation
export const yKeyDown = (e, respondToAction, scenario, allData) => {
    e.preventDefault();
    if (e.keyCode === 89) {
        respondToAction(scenario, allData, 'yes');
        removeEventListeners();
    }
};

export const nKeyDown = (e, respondToAction, scenario, allData) => {
    e.preventDefault();
    if (e.keyCode === 78) {
        respondToAction(scenario, allData, 'no');
        removeEventListeners();
    }
};

export const spaceKeyDown = (e, respondToAction, scenario, allData) => {
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
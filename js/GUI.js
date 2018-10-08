const createMoneyIcon = (starterData) => {
	const moneyDiv = document.createElement('div');
	moneyDiv.setAttribute('id', 'money');
	moneyDiv.setAttribute('class', 'column is-half');
	const moneyInnerDiv = document.createElement('div');
	moneyInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const moneyIcon = document.createElement('img');
	moneyIcon.setAttribute('src', '/icons/money.svg');
	moneyIcon.setAttribute('alt', 'Your money');
	moneyIcon.setAttribute('class', 'heading-icon money-icon');
	const moneyText = document.createElement('span');
	moneyText.setAttribute('id', 'money-text');
	moneyText.innerHTML = `${starterData.money}`;
	moneyInnerDiv.append(moneyIcon);
	moneyInnerDiv.append('$');
	moneyInnerDiv.append(moneyText);
	moneyDiv.append(moneyInnerDiv);

	return moneyDiv;
};

const createHealthIcon = (starterData) => {
	const healthDiv = document.createElement('div');
	healthDiv.setAttribute('id', 'health');
	healthDiv.setAttribute('class', 'column is-half');
	const healthInnerDiv = document.createElement('div');
	healthInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const healthIcon = document.createElement('img');
	healthIcon.setAttribute('src', '/icons/health.svg');
	healthIcon.setAttribute('alt', 'Health');
	healthIcon.setAttribute('class', 'heading-icon health-icon');
	const healthText = document.createElement('span');
	healthText.setAttribute('id', 'health-text');
	healthText.innerHTML = `${starterData.health}`;
	healthInnerDiv.append(healthIcon);
	healthInnerDiv.append(healthText);
	healthDiv.append(healthInnerDiv);

	return healthDiv;
}

const createWorkloadIcon = (starterData) => {
	const workloadDiv = document.createElement('div');
	workloadDiv.setAttribute('id', 'workload');
	workloadDiv.setAttribute('class', 'column is-half');
	const workloadInnerDiv = document.createElement('div');
	workloadInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const workloadIcon = document.createElement('img');
	workloadIcon.setAttribute('src', '/icons/workload.svg');
	workloadIcon.setAttribute('alt', 'Workload');
	workloadIcon.setAttribute('class', 'heading-icon health-icon');
	const workloadText = document.createElement('span');
	workloadText.setAttribute('id', 'workload-text');
	workloadText.innerHTML = `${starterData.workload}`;
	workloadInnerDiv.append(workloadIcon);
	workloadInnerDiv.append(workloadText);
	workloadDiv.append(workloadInnerDiv);

	return workloadDiv;
}

const createReputationIcon = (starterData) => {
	const reputationDiv = document.createElement('div');
	reputationDiv.setAttribute('id', 'rep');
	reputationDiv.setAttribute('class', 'column is-half');
	const reputationInnerDiv = document.createElement('div');
	reputationInnerDiv.setAttribute('class', 'tag is-rounded is-large');
	const reputationIcon = document.createElement('img');
	reputationIcon.setAttribute('src', '/icons/ratings.svg');
	reputationIcon.setAttribute('alt', 'Reputation');
	reputationIcon.setAttribute('class', 'heading-icon reputation-icon');
	const reputationText = document.createElement('span');
	reputationText.setAttribute('id', 'reputation-text');
	reputationText.innerHTML = `${starterData.reputation}`;
	reputationInnerDiv.append(reputationIcon);
	reputationInnerDiv.append(reputationText);
	reputationDiv.append(reputationInnerDiv);

	return reputationDiv;
}

export const createIcons = (starterData) => {
	const cardHeader = document.getElementById('card-header');
	cardHeader.setAttribute('class', 'columns is-mobile is-multiline');

	cardHeader.append(createMoneyIcon(starterData));
	cardHeader.append(createHealthIcon(starterData));
	cardHeader.append(createWorkloadIcon(starterData));
	cardHeader.append(createReputationIcon(starterData));
};

export const setYesButton = (opportunity, allOpps) => {
    const leftColumn = document.createElement('div');
    leftColumn.setAttribute('class', 'column');
    const yesButton = document.createElement('button');
    yesButton.setAttribute('id', 'yes-button');
    yesButton.setAttribute('class', 'button green-button is-fullwidth');
    yesButton.innerHTML = 'Yes';
    leftColumn.append(yesButton);
    return leftColumn;
};

export const setNoButton = (opportunity, allOpps) => {
    const rightColumn = document.createElement('div');
    rightColumn.setAttribute('class', 'column');
    const noButton = document.createElement('button');
    noButton.setAttribute('id', 'no-button');
    noButton.setAttribute('class', 'button red-button is-fullwidth');
    noButton.innerHTML = 'No';
    rightColumn.append(noButton);
    return rightColumn;
};

export const setContinueButton = (opportunity, allOpps, goto) => {
    // TODO: Continue button needs to be more flexible
    // Should handle case of specific goto id and case of continuing from yes/no action
    const oneColumn = document.createElement('div');
    oneColumn.setAttribute('class', 'column');
    const continueButton = document.createElement('button');
    continueButton.setAttribute('id', 'continue-button');
    continueButton.setAttribute('class', 'button blue-button is-fullwidth');
    continueButton.innerHTML = 'Continue';
    oneColumn.append(continueButton);
    return oneColumn;
};

// TODO: Show Years in Business in UI; Every IN_GAME_YEAR(7) number of turns; increment up years in business

// TODO: Go from Numbers to progress bars?


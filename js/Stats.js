export const updateMoneyStats = (scenario) => {
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

export const updateHappinessStats = (scenario) => {
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('happy-text').innerHTML = parseInt(document.getElementById('happy-text').innerHTML) + parseInt(scenario.rewards.happiness);
    }
};

export const updateInfluenceStats = (scenario) => {
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('influence-text').innerHTML = parseInt(document.getElementById('influence-text').innerHTML) + parseInt(scenario.rewards.influence);
    }
};

export const updateSkillStats = (scenario) => {

    if (typeof scenario.rewards !== 'undefined') {
        document.getElementById('skill-text').innerHTML = parseInt(document.getElementById('skill-text').innerHTML) + parseInt(scenario.rewards.skill);
    }
};
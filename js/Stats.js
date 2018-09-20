const updateMoneyStats = (opportunity) => {
    console.log('opportunity for money stats', opportunity)
    const moneyText = document.getElementById('money-text');
    console.log(moneyText.innerHTML);
    if (typeof opportunity.rewards !== 'undefined') {
        const newMoney = parseInt(moneyText.innerHTML) + parseInt(opportunity.rewards.money);
        moneyText.innerHTML = newMoney;
        console.log(newMoney);
        return newMoney;
    }
};

//this method formats the money string as a cerrency
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

const updateHealthStats = (opportunity) => {
    const healthText = document.getElementById('health-text');
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof opportunity.rewards !== 'undefined') {
        const newHealth = parseInt(healthText.innerHTML) + parseInt(opportunity.rewards.health);
        healthText.innerHTML = newHealth;
        return newHealth;
    }
};

const updateWorkloadStats = (opportunity) => {
    const workloadText = document.getElementById('workload-text');
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof opportunity.rewards !== 'undefined') {
        const newWorkload = parseInt(workloadText.innerHTML) + parseInt(opportunity.rewards.workload);
        workloadText.innerHTML = newWorkload;
        return newWorkload;
    }
};

const updateReputationStats = (opportunity) => {
    const reputationText = document.getElementById('reputation-text');
    if (typeof opportunity.rewards !== 'undefined') {
        const newReputation = parseInt(reputationText.innerHTML) + parseInt(opportunity.rewards.reputation);
        reputationText.innerHTML = newReputation;
        return newReputation;
    }
};

// Update stats based on choice
export const updateStats = (opportunity) => {
    return {
        "money": updateMoneyStats(opportunity),
        "health": updateHealthStats(opportunity),
        "workload": updateWorkloadStats(opportunity),
        "reputation": updateReputationStats(opportunity)
    }

};
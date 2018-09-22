let consequences = [];

const updateMoneyStats = (opportunity) => {
    console.log('opportunity for money stats')
    const moneyText = document.getElementById('money-text');
    let newMoney = 0;
    console.log(moneyText.innerHTML);
    if (typeof opportunity.rewards !== 'undefined') {
        // Add (or subtract) money over turns
        const newMoney = parseInt(moneyText.innerHTML) + parseInt(opportunity.rewards.money);

        moneyText.innerHTML = newMoney;
        console.log(newMoney);
        return newMoney;
    }
    // cons.forEach((consequence) => {
    //     // Add (or subtract) money over turns
    //     newMoney = parseInt(moneyText.innerHTML) + parseInt(consequence.money)/parseInt(consequence.duration);
    //     moneyText.innerHTML = newMoney;
    //     // Replace money with what's left for the next turn
    //     consequence.money = parseInt(consequence.money)/parseInt(consequence.duration);
    //     console.log(newMoney, consequence);
    // });
    return newMoney;
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
    let newWorkload = 0;
    //checks to make sure there is an actual value to update with, leave alone if there is no value
    if (typeof opportunity.rewards !== 'undefined') {
        const newWorkload = parseInt(workloadText.innerHTML) + parseInt(opportunity.rewards.workload);
        workloadText.innerHTML = newWorkload;
        return newWorkload;
    }
    // cons.forEach((consquence) => {
    //     // Remove workload after duration is up
    //     newWorkload = parseInt(workloadText.innerHTML) + parseInt(consquence)/consquence.duration;
    //     workloadText.innerHTML = newWorkload;

    //     console.log(newMoney);
    // });

};

const updateReputationStats = (opportunity) => {
    const reputationText = document.getElementById('reputation-text');
    if (typeof opportunity.rewards !== 'undefined') {
        const newReputation = parseInt(reputationText.innerHTML) + parseInt(opportunity.rewards.reputation);
        reputationText.innerHTML = newReputation;
        return newReputation;
    }
};

const decrementDurationOfConsequences = (cons, stats) => {
    // If turns, spread out consequences over turns
    // Money should be spread out evenly over duration
    // Workload effect should end after duration
    cons.forEach((consequence, index) => {
       // Decrement the duration for the next turn
        consequence.duration--;
        // If duration for a consequence is now 0,
        if(consequence.duration <= 0) {
            // Adjust the playerStats down by the workload
            stats.workload -= consequence.workload;
            // Remove the consequence object
            cons.slice(index, 1);
        }
        
    });

    console.log(consequences);
};

// Update stats based on choice
export const updateStats = (choice, opportunity, playerStats) => {
    console.log(choice);

    consequences.push({
        duration: parseInt(opportunity.duration),
        money: parseInt(choice.rewards.money),
        workload: parseInt(choice.rewards.workload)
    });

    const newStats = {
        "money": updateMoneyStats(choice),
        "health": updateHealthStats(choice),
        "workload": updateWorkloadStats(choice),
        "reputation": updateReputationStats(choice)
    };

    decrementDurationOfConsequences(consequences, playerStats);

    return newStats;

};
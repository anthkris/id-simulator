export const getInstructionData = () => {
    return fetch('./data/instructionData.json')
        .then((response) => {
            return response.json();
        });
};


var UPDATE_TIME_TO_BART = 'UPDATE_TIME_TO_BART'; 

//need to make org and dst version
export const addToBartTime = (value, text, type) => ({
  type: type,
  timeBart: {
    value: value,
    text: text
  }
});


//need org and dst version
export const addBartDirectionDsts = (directions, type) => ({
  type: type,
  directions: directions
});

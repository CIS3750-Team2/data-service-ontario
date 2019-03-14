require('dotenv').config();

const startup = require('./startup');

const state = {};

const init = async () => {
    return startup(state);
};

init().then((data) => console.log(`
    Started data-service for ${'ontario'}.
    Startup data: ${JSON.stringify(data)}.
`), () => console.log(`
    Failed to start data-service for ${'ontario'}.
`));

module.exports = {
    state
};

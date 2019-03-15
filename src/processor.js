const retrieve = require('./retrieve');
const constants = require('./constants');

module.exports = (state) => async ({data: {province, years}}) => {
    if (constants.province === province) {
        const data = await Promise.all(years.map(
            (year) => {
                console.log(`Updating dataset '${province}-${year}'...`);
                return retrieve(state, year)
                    .catch((err) => {
                        console.log(err);
                        return [];
                    })
            }
        ));

        const updates = years.reduce((acc, year, idx) => {
            if (year && data[idx]) {
                acc[`${province}-${year}`] = data[idx];
            }
            return acc;
        }, {});

        state.updateQueue.add(updates, {
            removeOnComplete: true
        });
    } else {
        return Promise.reject(Error(
            `Job for ${province} sent to incorrect service for ${constants.province}!`
        ));
    }
};

const fetch = require('node-fetch');

module.exports = async (state, year) => {
    // TODO: Retrieve from provincial data provider here

    return [{
        name: 'Bob Bob',
        salary: 150000 + ((year - 2000) * 1000),
        occupation: 'Professor',
        industry: 'Education',
        year,
        province: 'ontario'
    }, {
        name: 'Jane Smith',
        salary: 175000 + ((year - 2000) * 1000),
        occupation: 'Professor',
        industry: 'Education',
        year,
        province: 'ontario'
    }, {
        name: 'Bob Vance',
        salary: 150000 + ((year - 2000) * 1000),
        occupation: 'Police Official',
        industry: 'Emergency Services',
        year,
        province: 'ontario'
    }];
};

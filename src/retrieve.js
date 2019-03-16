const fetch = require('node-fetch');
const parse = require('csv-parse/lib/sync');

const defaultParseOptions = {
    cast: true,                     // convert cells to native values (string -> number)
    columns: true,                  // parse as array of objects
    delimiter: ',',
    trim: true,                     // remove whitespace around delim
    skip_empty_lines: true,
    skip_lines_with_error: true,
};
const yearlyOptions = {
    2017: { uri: 'https://files.ontario.ca/en-2018-pssd-compendium.csv' },
    2016: { uri: 'https://files.ontario.ca/en-2016-pssd-compendium-20171128-utf8.csv' },
    2015: { uri: 'https://files.ontario.ca/pssd/en-2015-pssd-compendium-with-addendum-20161219.csv' },
    2014: { uri: 'https://files.ontario.ca/2014-pssd-full-compendium-utf8-en.csv' },
    2013: { uri: 'https://files.ontario.ca/pssd-en-2013.csv' },
    2012: { uri: 'https://files.ontario.ca/pssd-en-2012-fixed_0.csv' },
    2011: { uri: 'https://files.ontario.ca/en-2011-pssd.csv' },
    2010: { uri: 'https://files.ontario.ca/en-2010-pssd.csv' },
    2009: { uri: 'https://files.ontario.ca/en-2009-pssd.csv' },
    2008: { uri: 'https://files.ontario.ca/en-2008-pssd.csv' },
    2007: { uri: 'https://files.ontario.ca/en-2007-pssd.csv' },
    2006: { uri: 'https://files.ontario.ca/en-2006-pssd.csv' },
    2005: { uri: 'https://files.ontario.ca/en-2005-pssd.csv' },
    2004: { uri: 'https://files.ontario.ca/en-2004-pssd.csv' },
    2003: { uri: 'https://files.ontario.ca/en-2003-pssd.csv' },
    2002: { uri: 'https://files.ontario.ca/en-2002-pssd.csv' },
    2001: { uri: 'https://files.ontario.ca/en-2001-pssd.csv' },
    2000: { uri: 'https://files.ontario.ca/en-2000-pssd.csv' },
    1999: { uri: 'https://files.ontario.ca/en-1999-pssd.csv' },
    1998: { uri: 'https://files.ontario.ca/en-1998-pssd.csv' },
    1997: { uri: 'https://files.ontario.ca/en-1997-pssd.csv' },
    1996: { uri: 'https://files.ontario.ca/en-1996-pssd.csv' }
};

module.exports = async (state, year) => {
    const options = yearlyOptions[year];
    if (!options) return [];

    const csv = await fetch(options.uri)
        .then((res) => res.status === 200 ? res.text() : '');

    const entries = parse(csv, {
        ...defaultParseOptions,
        ...(options.parseOptions || {})
    });

    console.log(`Found ${entries.length} entries(s) in ontario for ${year}.`);

    for (let i = entries.length - 1; i >= 0; i--) {
        entries[i] = {
            firstName: entries[i]['First Name'],
            lastName: entries[i]['Last Name'],
            sector: entries[i]['Sector'],
            salary: entries[i]['Salary Paid'],
            taxableBenefits: entries[i]['Taxable Benefits'],
            employer: entries[i]['Employer'],
            title: entries[i]['Job Title'],
            province: 'ontario',
            year,
            original: entries[i]
        };
    }

    return entries;
};

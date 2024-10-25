const axios = require('axios');

// Fetch available countries
const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available countries', error: error.message });
  }
};

// Fetch country info including borders, population data, and flag
const getCountryInfo = async (req, res) => {
  const { countryCode } = req.params;
  try {
    // Fetch country borders
    const borderResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    
    // Fetch population data
    const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
      country: borderResponse.data.commonName
    });

    // Fetch flag URL
    const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
      country: borderResponse.data.commonName
    });

    // Combine data and send the response
    const countryData = {
      borders: borderResponse.data.borders,
      populationData: populationResponse.data.data.populationCounts,
      flagUrl: flagResponse.data.data.flag,
    };

    res.json(countryData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country information', error: error.message });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo
};

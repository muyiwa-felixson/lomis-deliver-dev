const BASE_URL = 'http://localhost:8090';

const config = {
  USER_URL: `${BASE_URL}/v1/users/me`,
  AUTH_URL: `${BASE_URL}/v1/auth`,
  LOCATION_URL: `${BASE_URL}/v1/locations`,
  LOCATION_AND_DATE_URL: `${BASE_URL}/v1/rounds/rounds-by-location-and-date`,
  ROUND_URL: `${BASE_URL}/v1/rounds`,
  ROUND_LOCATION_URL: `${BASE_URL}/v1/rounds/rounds-by-location`,
  ROUND_COUNT_URL: `${BASE_URL}/v1/rounds/round-status`,
  IMPORT_URL: `${BASE_URL}/v1/rounds/round/new`,
};

module.exports = config;

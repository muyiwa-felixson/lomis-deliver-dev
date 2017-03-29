const BASE_URL = process.env.HOST;

const config = {
  USER_URL: `${BASE_URL}/v1/users/me`,
  AUTH_URL: `${BASE_URL}/v1/auth`,
  ROUND_URL: `${BASE_URL}/v1/rounds`,
  ROUND_COUNT_URL: `${BASE_URL}/v1/rounds/round-status/`,
};

export default config;

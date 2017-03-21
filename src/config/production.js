const BASE_URL = process.env.HOST || 'http://localhost:8080';

const config = {
  USER_URL: `${BASE_URL}/v1/users/me`,
  AUTH_URL: `${BASE_URL}/v1/auth`,
  ROUND_URL: `${BASE_URL}/v1/rounds`,
};

export default config;
